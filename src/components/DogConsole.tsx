"use client";

import { useEffect, useRef, useState, useMemo, KeyboardEvent } from "react";
import { DOG_GRAMMAR, parseCommand } from "@/lib/dog-grammar";
import { MOCK_OBJECTS } from "@/lib/objects";

type Line = { id: string; prompt: string; output: string[]; kind?: "ok" | "warn" | "err" | "info" };

const SUGGEST = ["sniff 0x7a3e...09a", "guard wallet", "track WETH", "watch WETH --below 2800", "bite revoke --dry-run"];

function handleCommand(input: string): string[] {
  const p = parseCommand(input);
  const cmd = (p.normalized || p.command || "").toLowerCase();
  if (!cmd) return ["— empty. try: sniff 0x7a3e...09a"];
  if (!p.known) {
    const maybe = DOG_GRAMMAR.filter(g => g.name.startsWith(cmd.slice(0,2)) || cmd.includes(g.name.slice(0,2))).slice(0,3).map(g=>g.name).join(", ");
    return [`Unknown command: “${p.command}”`, maybe ? `Did you mean: ${maybe}` : `Try: help`, `Run: help ${cmd} for detail`];
  }
  switch (cmd) {
    case "sniff": {
      const t = p.positional[0] || p.args[0] || "0x7a3e...09a";
      if (t.startsWith("0x") || t.includes("...") || t.length > 10) {
        const m = MOCK_OBJECTS;
        return [
          "WALLET FOUND",
          `address  ${m.wallet.address}`,
          `ens      ${m.wallet.ens}`,
          `balance  $${m.wallet.balanceUsd.toLocaleString()}  risk:${m.wallet.risk}`,
          "—",
          `${m.tokens.length} tokens  ·  ${m.positions.length} positions  ·  ${m.approvals.length} approvals  ·  ${m.tasks.length} tasks`,
          "Suggested: guard wallet"
        ];
      }
      return [`sniff ${t} — scanning…`, "No risk signals. Try: sniff 0x7a3e...09a"];
    }
    case "guard": {
      const m = MOCK_OBJECTS;
      return [
        "WATCHDOG REPORT",
        `Unlimited approvals   ${m.approvals.filter(a=>a.allowanceFormatted==="unlimited").length}`,
        `Suspicious approvals  0`,
        `Active tasks          ${m.tasks.filter(t=>t.status==="running").length}`,
        `Expiring permissions  1`,
        "— ATTENTION REQUIRED —",
        `→ inspect approval ${m.approvals[0].id}`,
      ];
    }
    case "track": {
      const sym = p.positional[0] || "WETH";
      return [`TRACKING ${sym}`, "following object · streaming deltas", "state: TRACKING", "use: watch --below 2800  to arm trigger"];
    }
    case "watch": {
      const raw = input;
      const below = raw.match(/--below\s+(\d+(\.\d+)?)/)?.[1];
      const above = raw.match(/--above\s+(\d+(\.\d+)?)/)?.[1];
      if (below) return [`WATCH ARMED`, `Asset  WETH`, `Condition  price <= $${below}`, `Action  bark (notify)`, `Duration  24h`, `Status  WATCHING — DOG is watching`];
      if (above) return [`WATCH ARMED`, `Condition  price >= $${above}`, `Status  WATCHING`];
      return ["watch — create condition monitor", "example: watch WETH --below 2800", "WATCH DOES NOT EXECUTE. use bite to act."];
    }
    case "bark":
      return ["BARK — alert emitted", "destination: in-app · level: warn", "DOG will bark when condition matches."];
    case "bite": {
      if (input.includes("--dry-run")) {
        return [
          "SIMULATING",
          "↓",
          "SIMULATION COMPLETE",
          "Expected output: revoke WETH unlimited approval",
          "Gas: ~0.00042 ETH · Slippage: —",
          "Risk: none",
          "↓ AUTHORIZE to submit. DOG does not auto-submit.",
        ];
      }
      return [
        "BITE — guarded execution",
        "This is a BOUNDED EXECUTION INTENT.",
        "Preview with --dry-run before signing.",
        "Example: bite revoke 0x1111 --dry-run",
      ];
    }
    case "inspect": {
      const id = p.positional[0] || "appr_01";
      return [`INSPECT ${id}`, "risk: high — unlimited allowance", "why: spender can move any amount", "source: onchain approval log", "time: 2026-08-10T14:02Z"];
    }
    case "filter":
      return ["filter — refine current object stream", "usage: sniff wallet 0x… | filter approvals | guard"];
    case "help": {
      const q = p.positional[0];
      if (q) {
        const f = DOG_GRAMMAR.find(g=>g.name===q);
        if (f) return [`${f.name.toUpperCase()} — ${f.desc}`, `example: ${f.example}`, `args: ${f.args.map(a=>a.name).join(", ")||"—"}`];
        return [`No help for ${q}`];
      }
      return ["DOG COMMANDS", ...DOG_GRAMMAR.map(g=>`${g.name.padEnd(10)} ${g.desc}`), "—", "Try: sniff 0x7a3e...09a"];
    }
    case "history":
      return ["history — execution trail", "exec_01  queued  rule_no_unlimited  approval appr_01"];
    case "fetch":
      return ["fetch — retrieve public recipe", "usage: fetch @author/workflow — then inspect before authorize"];
    case "heel": return ["HEEL — pausing active watches", "status: SLEEPING"];
    case "stay": return ["STAY — persistent job armed", "DOG continues after you close the interface (remote executor)"];
    case "recall": return ["RECALL — revoking authorization", "status: RECALLED"];
    default: return [`${cmd} — ok`, `Try: ${SUGGEST[0]}`];
  }
}

export function DogConsole({ autoFocus=false }: { autoFocus?: boolean }){
  const [lines, setLines] = useState<Line[]>([
    { id:"l0", prompt:"", output:["DOG — Onchain Watchdog","Type ‘help’ or try: sniff 0x7a3e...09a","— live utility, connect wallet to act"]},
  ]);
  const [input, setInput] = useState("");
  const [hist, setHist] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState<number>(-1);
  const [suggestIdx, setSuggestIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const completions = useMemo(()=>{
    const q = input.trim().toLowerCase();
    if (!q) return [];
    return DOG_GRAMMAR.filter(g=> g.name.startsWith(q) || (g.alias||[]).some(a=>a===q)).slice(0,6);
  },[input]);

  useEffect(()=>{
    if (autoFocus) inputRef.current?.focus();
    const id = setInterval(()=> setSuggestIdx(i=> (i+1)%SUGGEST.length), 3000);
    return ()=> clearInterval(id);
  },[autoFocus]);

  useEffect(()=>{
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior:"smooth"});
  },[lines]);

  function submit(val: string){
    const v = val.trim();
    if (!v) return;
    const out = handleCommand(v);
    setLines(prev=> [...prev, { id: `l${prev.length}`, prompt: v, output: out }]);
    setHist(h=>[v, ...h].slice(0,50));
    setHIdx(-1);
    setInput("");
  }

  function onKey(e: KeyboardEvent<HTMLInputElement>){
    if (e.key==="Enter") { e.preventDefault(); if (completions.length===1 && input.trim().toLowerCase()!==completions[0].name) { setInput(completions[0].name+" "); } else submit(input); }
    else if (e.key==="ArrowUp") { e.preventDefault(); if (hist.length){ const n = Math.min(hIdx+1, hist.length-1); setHIdx(n); setInput(hist[n]); } }
    else if (e.key==="ArrowDown") { e.preventDefault(); if (hIdx>0){ const n=hIdx-1; setHIdx(n); setInput(hist[n]); } else if(hIdx===0){ setHIdx(-1); setInput(""); } }
    else if (e.key==="Tab" && completions.length) { e.preventDefault(); setInput(completions[0].name+" "); }
    else if (e.key==="Escape") { setInput(""); }
  }

  return (
    <div className="border border-[#242626] bg-[#121414] overflow-hidden">
      <div className="h-[36px] flex items-center justify-between border-b border-[#242626] px-3 bg-[#0C0D0D]">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#FF6B22] animate-pulse" />
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#ECEBE5]">DOG &gt;</span>
          <span className="font-mono text-[10px] text-[#989A95] hidden sm:inline">SNIFF · TRACK · WATCH · GUARD · BITE</span>
        </div>
        <span className="font-mono text-[10px] text-[#989A95]">SESSION 00218 · CHAIN ETH · LIVE</span>
      </div>
      <div ref={bodyRef} className="h-[360px] sm:h-[400px] overflow-auto p-3 font-mono text-[12.5px] leading-[1.6]">
        {lines.map(l=> (
          <div key={l.id} className="mb-3">
            {l.prompt ? <div className="flex gap-2"><span className="text-[#FF6B22]">❯</span><span className="text-[#ECEBE5] break-all">{l.prompt}</span></div> : null}
            <div className="pl-4 text-[#ECEBE5]/90 whitespace-pre-wrap break-words">
              {l.output.map((o,i)=> <div key={i} className={o.startsWith("—")||o.startsWith("WATCH")||o.startsWith("WALLET")||o.startsWith("BARK")||o.startsWith("BITE")||o.startsWith("SIMUL") ? "text-[#ECEBE5] mt-1" : o.startsWith("Unknown") ? "text-[#8B2A1A]" : "text-[#989A95]"}>{o}</div>)}
            </div>
          </div>
        ))}
        <div className="mt-2 text-[#989A95]">suggest: <button onClick={()=> setInput(SUGGEST[suggestIdx])} className="text-[#FF6B22] hover:underline">{SUGGEST[suggestIdx]}</button> — tab to autocomplete</div>
      </div>
      <div className="border-t border-[#242626] bg-[#0C0D0D] p-2 flex gap-2">
        <span className="font-mono text-[#FF6B22] px-2 py-2">❯</span>
        <input
          ref={inputRef}
          value={input}
          onChange={e=> setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder="sniff 0x7a3e...09a"
          className="flex-1 bg-transparent outline-none font-mono text-[13px] text-[#ECEBE5] placeholder:text-[#989A95]/60"
          aria-label="DOG command input"
          autoComplete="off"
          spellCheck={false}
        />
        <button onClick={()=> submit(input)} className="font-mono text-[11px] tracking-[0.12em] uppercase border border-[#242626] bg-[#191B1B] px-3 py-2 text-[#ECEBE5] hover:border-[#FF6B22]/50">run</button>
      </div>
      {completions.length ? (
        <div className="border-t border-[#242626] bg-[#121414] p-2">
          <div className="flex flex-wrap gap-1.5">
            {completions.map(c=> (
              <button key={c.name} onClick={()=> setInput(c.name+" ")} className="font-mono text-[11px] border border-[#242626] bg-[#0C0D0D] px-2 py-1 text-[#989A95] hover:text-[#ECEBE5] hover:border-[#FF6B22]/40">
                <span className="text-[#ECEBE5]">{c.name}</span> — {c.desc}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
