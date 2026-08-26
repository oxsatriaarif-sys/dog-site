// DOG — Onchain Watchdog
// Grammar: canonical command list + parser
// Used by terminal input, autocomplete, and help.

export type DogArg = {
  name: string;
  required?: boolean;
  variadic?: boolean;
  desc?: string;
};

export type DogCommand = {
  name: string;
  desc: string;
  args: DogArg[];
  example: string;
  alias?: string[];
};

export const DOG_GRAMMAR: DogCommand[] = [
  { name: "sniff", desc: "Scan address / tx / token for risk signals", args: [{ name: "target", required: true, desc: "address, tx hash, or token" }], example: "sniff 0x1234…abcd" },
  { name: "track", desc: "Follow wallet activity in real time", args: [{ name: "address", required: true }, { name: "--interval", required: false, desc: "poll interval e.g. 30s" }], example: "track 0xabc --interval 15s" },
  { name: "watch", desc: "Create a persistent watch on an object", args: [{ name: "object", required: true, desc: "wallet | token | pool" }, { name: "address", required: true }], example: "watch wallet 0xabc" },
  { name: "guard", desc: "Deploy guard rules against an object", args: [{ name: "object", required: true }, { name: "--rule", required: true, desc: "rule id or inline condition" }], example: "guard wallet --rule no-drain" },
  { name: "bark", desc: "Emit alert now if conditions met", args: [{ name: "level", required: false, desc: "info | warn | critical" }], example: "bark --level critical" },
  { name: "bite", desc: "Execute defensive transaction (revoke, block)", args: [{ name: "action", required: true, desc: "revoke | block | freeze" }, { name: "target", required: true }], example: "bite revoke 0xspender" },
  { name: "fetch", desc: "Pull latest onchain data for object", args: [{ name: "object", required: true }, { name: "id", required: true }], example: "fetch token 0xabc" },
  { name: "heel", desc: "Return to safe state / pause active watches", args: [], example: "heel" },
  { name: "stay", desc: "Hold position — suppress alerts for duration", args: [{ name: "duration", required: true, desc: "e.g. 30m, 2h, 1d" }], example: "stay 2h" },
  { name: "recall", desc: "Rewind and replay object history", args: [{ name: "object", required: true }, { name: "--blocks", required: false }], example: "recall wallet 0xabc --blocks 5000" },
  { name: "inspect", desc: "Detailed view of object with risk breakdown", args: [{ name: "object", required: true }, { name: "id", required: true }], example: "inspect approval 0xabc" },
  { name: "filter", desc: "Filter current object list", args: [{ name: "field", required: true }, { name: "operator", required: true, desc: "= | != | > | < | ~" }, { name: "value", required: true, variadic: true }], example: "filter risk > high" },
  { name: "sort", desc: "Sort objects by field", args: [{ name: "field", required: true }, { name: "order", required: false, desc: "asc | desc" }], example: "sort value desc" },
  { name: "diff", desc: "Diff two objects or two states", args: [{ name: "a", required: true }, { name: "b", required: true }], example: "diff wallet:0x1 wallet:0x2" },
  { name: "run", desc: "Execute a saved task / rule", args: [{ name: "taskId", required: true }], example: "run task_01" },
  { name: "cancel", desc: "Cancel pending execution or task", args: [{ name: "id", required: true, desc: "execution or task id" }], example: "cancel exec_01" },
  { name: "history", desc: "Show command history", args: [{ name: "--limit", required: false }], example: "history --limit 20" },
  { name: "help", desc: "Show available commands", args: [{ name: "command", required: false, desc: "command name for detail" }], example: "help sniff", alias: ["?", "h"] },
];

const ALIAS_MAP = new Map<string, string>(
  DOG_GRAMMAR.flatMap((c) => (c.alias ?? []).map((a) => [a, c.name] as const))
);

export type ParsedCommand = {
  raw: string;
  command: string | null;
  normalized: string | null;
  args: string[];
  flags: Record<string, string | boolean>;
  positional: string[];
  error: string | null;
  known: boolean;
};

function tokenize(input: string): string[] {
  const tokens: string[] = [];
  let cur = "";
  let inQuote: string | null = null;
  let escaped = false;
  for (const ch of input.trim()) {
    if (escaped) { cur += ch; escaped = false; continue; }
    if (ch === "\\") { escaped = true; continue; }
    if (inQuote) {
      if (ch === inQuote) { inQuote = null; }
      else cur += ch;
      continue;
    }
    if (ch === '"' || ch === "'") { inQuote = ch; continue; }
    if (ch === " " || ch === "\t") {
      if (cur) { tokens.push(cur); cur = ""; }
      continue;
    }
    cur += ch;
  }
  if (cur) tokens.push(cur);
  return tokens;
}

export function parseCommand(input: string): ParsedCommand {
  const raw = input;
  const trimmed = input.trim();
  if (!trimmed) {
    return { raw, command: null, normalized: null, args: [], flags: {}, positional: [], error: null, known: false };
  }
  const tokens = tokenize(trimmed);
  if (tokens.length === 0) {
    return { raw, command: null, normalized: null, args: [], flags: {}, positional: [], error: "empty input", known: false };
  }
  const first = tokens[0].toLowerCase();
  const normalized = ALIAS_MAP.get(first) ?? first;
  const def = DOG_GRAMMAR.find((c) => c.name === normalized);
  const known = !!def;

  const args = tokens.slice(1);
  const flags: Record<string, string | boolean> = {};
  const positional: string[] = [];
  let i = 0;
  while (i < args.length) {
    const tok = args[i];
    if (tok.startsWith("--")) {
      const key = tok.slice(2);
      const next = args[i + 1];
      if (next && !next.startsWith("-")) { flags[key] = next; i += 2; }
      else { flags[key] = true; i += 1; }
    } else if (tok.startsWith("-") && tok.length > 1) {
      const key = tok.slice(1);
      const next = args[i + 1];
      if (next && !next.startsWith("-")) { flags[key] = next; i += 2; }
      else { flags[key] = true; i += 1; }
    } else {
      positional.push(tok);
      i += 1;
    }
  }

  let error: string | null = null;
  if (!known) error = `unknown command: ${first} — try 'help'`;
  else if (def) {
    const requiredCount = def.args.filter((a) => a.required && !a.name.startsWith("--") && !a.name.startsWith("-")).length;
    if (positional.length < requiredCount) error = `missing required argument for '${def.name}'`;
  }

  return { raw, command: first, normalized, args, flags, positional, error, known };
}

export function suggestCommands(prefix: string): DogCommand[] {
  const p = prefix.toLowerCase().trim();
  if (!p) return DOG_GRAMMAR;
  return DOG_GRAMMAR.filter((c) => c.name.startsWith(p) || (c.alias ?? []).some((a) => a.startsWith(p)));
}
