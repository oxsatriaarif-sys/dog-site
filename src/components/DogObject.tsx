import type { DogObject } from "@/lib/objects";
import { DogRiskBadge } from "./DogStatus";

function truncateAddr(a: string) {
  if (a.length <= 12) return a;
  return `${a.slice(0, 6)}…${a.slice(-4)}`;
}

const KIND_LABEL: Record<DogObject["kind"], string> = {
  wallet: "WALLET",
  token: "TOKEN",
  position: "POSITION",
  pool: "POOL",
  approval: "APPROVAL",
  transaction: "TX",
  task: "TASK",
  alert: "ALERT",
  rule: "RULE",
  execution: "EXEC",
  "risk-event": "RISK",
};

export function DogObject({ object, compact }: { object: DogObject; compact?: boolean }) {
  const risk =
    "risk" in object ? (object as { risk: string }).risk as DogObject extends { risk: infer R } ? R : never : undefined;

  return (
    <div className={["border border-[#242626] bg-[#121414] flex flex-col", compact ? "p-3 gap-2" : "p-4 gap-3"].join(" ")}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#989A95] border border-[#242626] px-1.5 py-0.5 bg-[#0C0D0D]">
            {KIND_LABEL[object.kind]}
          </span>
          <span className="font-mono text-[11px] tracking-[0.04em] text-[#ECEBE5] truncate">
            {getTitle(object)}
          </span>
        </div>
        {"risk" in object && object.risk ? <DogRiskBadge level={object.risk as never} /> : null}
      </div>

      <div className="grid grid-cols-2 gap-3 border-t border-[#242626] pt-3">
        {fieldsFor(object).map(([k, v]) => (
          <div key={k} className="min-w-0 flex flex-col gap-1">
            <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#989A95]">{k}</span>
            <span className="font-mono text-[12px] text-[#ECEBE5] truncate">{v}</span>
          </div>
        ))}
      </div>

      {"id" in object ? (
        <div className="flex items-center gap-2 border-t border-[#242626] pt-2">
          <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#989A95]">ID</span>
          <span className="font-mono text-[10px] text-[#989A95] truncate">{String((object as { id: string }).id)}</span>
        </div>
      ) : null}
    </div>
  );
}

function getTitle(o: DogObject): string {
  switch (o.kind) {
    case "wallet": return o.ens ?? truncateAddr(o.address);
    case "token": return `${o.symbol} · ${o.name}`;
    case "position": return `${o.protocol} — ${o.type} · $${o.valueUsd.toLocaleString()}`;
    case "pool": return `${o.protocol} ${o.pair}`;
    case "approval": return `${o.tokenSymbol} → ${o.spenderLabel ?? truncateAddr(o.spender)}`;
    case "transaction": return o.method ? `${o.method} · ${truncateAddr(o.hash)}` : truncateAddr(o.hash);
    case "task": return o.name;
    case "alert": return o.title;
    case "rule": return o.name;
    case "execution": return `${o.ruleId} · ${o.status}`;
    case "risk-event": return `${o.type} · ${o.risk}`;
    default: return (o as { id: string }).id;
  }
}

function fieldsFor(o: DogObject): [string, string][] {
  switch (o.kind) {
    case "wallet": return [["address", truncateAddr(o.address)], ["chain", String(o.chainId)], ["balance", `$${o.balanceUsd.toLocaleString()}`], ["watched", String(o.watched)]];
    case "token": return [["address", truncateAddr(o.address)], ["balance", o.balanceFormatted], ["price", o.priceUsd != null ? `$${o.priceUsd}` : "—"], ["value", o.valueUsd != null ? `$${o.valueUsd.toLocaleString()}` : "—"]];
    case "position": return [["protocol", o.protocol], ["type", o.type], ["value", `$${o.valueUsd.toLocaleString()}`], ["pnl", `${o.pnlUsd >= 0 ? "+" : ""}$${o.pnlUsd.toLocaleString()}`]];
    case "pool": return [["pair", o.pair], ["tvl", `$${o.tvlUsd.toLocaleString()}`], ["apr", o.apr != null ? `${(o.apr * 100).toFixed(2)}%` : "—"], ["protocol", o.protocol]];
    case "approval": return [["spender", o.spenderLabel ?? truncateAddr(o.spender)], ["allowance", o.allowanceFormatted], ["status", o.status], ["granted", new Date(o.grantedAt).toLocaleDateString()]];
    case "transaction": return [["from", truncateAddr(o.from)], ["to", o.to ? truncateAddr(o.to) : "—"], ["status", o.status], ["value", o.value]];
    case "task": return [["command", o.command], ["status", o.status], ["created", new Date(o.createdAt).toLocaleDateString()], ["next", o.nextRunAt ? new Date(o.nextRunAt).toLocaleString() : "—"]];
    case "alert": return [["level", o.level], ["acked", String(o.acked)], ["ref", o.objectRef ?? "—"], ["at", new Date(o.createdAt).toLocaleString()]];
    case "rule": return [["condition", o.condition], ["action", o.action], ["enabled", String(o.enabled)], ["risk", o.risk]];
    case "execution": return [["rule", o.ruleId], ["status", o.status], ["tx", o.txHash ? truncateAddr(o.txHash) : "—"], ["reason", o.reason.slice(0, 32)]];
    case "risk-event": return [["type", o.type], ["wallet", truncateAddr(o.wallet)], ["at", new Date(o.timestamp).toLocaleString()], ["tx", o.txHash ? truncateAddr(o.txHash) : "—"]];
    default: return [];
  }
}

export function DogObjectGrid({ objects }: { objects: DogObject[] }) {
  if (objects.length === 0) {
    return <div className="border border-dashed border-[#242626] p-8 text-center font-mono text-[11px] tracking-[0.08em] text-[#989A95] uppercase">No objects</div>;
  }
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {objects.map((o) => (
        <DogObject key={`${o.kind}:${(o as { id: string }).id}`} object={o} />
      ))}
    </div>
  );
}
