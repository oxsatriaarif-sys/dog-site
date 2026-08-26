import type { RiskLevel, TaskStatus } from "@/lib/objects";

type DogStatusProps = {
  risk?: RiskLevel;
  status?: TaskStatus | "live" | "idle" | "armed" | "muted";
  pulse?: boolean;
  label?: string;
};

const RISK_MAP: Record<RiskLevel, { dot: string; text: string; border: string }> = {
  low: { dot: "bg-[#989A95]", text: "text-[#989A95]", border: "border-[#242626]" },
  medium: { dot: "bg-[#FF6B22]", text: "text-[#FF6B22]", border: "border-[#FF6B22]/30" },
  high: { dot: "bg-[#FF6B22]", text: "text-[#FF6B22]", border: "border-[#FF6B22]/30" },
  critical: { dot: "bg-[#8B2A1A]", text: "text-[#8B2A1A]", border: "border-[#8B2A1A]/40" },
};

export function DogStatus({ risk, status, pulse, label }: DogStatusProps) {
  const r = risk ? RISK_MAP[risk] : null;
  const display = label ?? status ?? risk ?? "—";

  return (
    <span
      className={[
        "inline-flex items-center gap-2 border px-2 py-1 font-mono text-[10px] tracking-[0.12em] uppercase leading-none",
        r ? `${r.border} ${r.text} bg-[#121414]` : "border-[#242626] text-[#989A95] bg-[#121414]",
      ].join(" ")}
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className={["absolute inline-flex h-2 w-2 rounded-full", r?.dot ?? "bg-[#989A95]", pulse ? "animate-ping opacity-30" : "hidden"].join(" ")} />
        <span className={["relative inline-flex h-2 w-2 rounded-full", r?.dot ?? "bg-[#989A95]"].join(" ")} />
      </span>
      {String(display).toUpperCase()}
    </span>
  );
}

export function DogRiskBadge({ level }: { level: RiskLevel }) {
  const m = RISK_MAP[level];
  return (
    <span className={`inline-flex items-center gap-1.5 border ${m.border} bg-[#0C0D0D] px-2 py-1 font-mono text-[10px] tracking-[0.14em] uppercase ${m.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${m.dot}`} />
      {level}
    </span>
  );
}

export function DogLiveDot({ active = true }: { active?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.12em] uppercase text-[#989A95]">
      <span className="relative flex h-2 w-2">
        {active && <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-[#2E7D5B] opacity-40" />}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${active ? "bg-[#2E7D5B]" : "bg-[#242626]"}`} />
      </span>
      {active ? "LIVE" : "IDLE"}
    </span>
  );
}
