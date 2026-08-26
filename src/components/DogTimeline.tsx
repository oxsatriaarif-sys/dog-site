import type { RiskLevel } from "@/lib/objects";

export type TimelineEvent = {
  id: string;
  at: string; // ISO
  kind: string;
  title: string;
  detail?: string;
  risk?: RiskLevel;
  hash?: string;
};

const RISK_DOT: Record<RiskLevel, string> = {
  low: "bg-[#989A95]",
  medium: "bg-[#FF6B22]",
  high: "bg-[#FF6B22]",
  critical: "bg-[#8B2A1A]",
};

export function DogTimeline({ events }: { events: TimelineEvent[] }) {
  if (events.length === 0) {
    return <div className="border border-dashed border-[#242626] p-6 font-mono text-[11px] tracking-[0.08em] uppercase text-[#989A95]">No events</div>;
  }

  const sorted = [...events].sort((a, b) => +new Date(b.at) - +new Date(a.at));

  return (
    <div className="border border-[#242626] bg-[#0C0D0D]">
      <div className="border-b border-[#242626] px-4 py-2 flex items-center justify-between bg-[#121414]">
        <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#989A95]">TIMELINE</span>
        <span className="font-mono text-[10px] tracking-[0.08em] text-[#989A95]">{events.length} EVENTS</span>
      </div>

      <ol className="divide-y divide-[#242626]">
        {sorted.map((e) => (
          <li key={e.id} className="grid grid-cols-[88px_1fr] gap-0 md:grid-cols-[120px_1fr_auto]">
            {/* time column — asymmetric editorial */}
            <div className="border-r border-[#242626] bg-[#121414] px-3 py-3 flex flex-col gap-1">
              <span className="font-mono text-[11px] tracking-[0.04em] text-[#ECEBE5]">
                {new Date(e.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
              <span className="font-mono text-[10px] tracking-[0.06em] text-[#989A95]">
                {new Date(e.at).toLocaleDateString()}
              </span>
            </div>

            <div className="px-4 py-3 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#989A95] border border-[#242626] px-1.5 py-0.5 bg-[#0C0D0D]">
                  {e.kind}
                </span>
                {e.risk ? <span className={`h-2 w-2 rounded-full ${RISK_DOT[e.risk]}`} aria-hidden /> : null}
                <span className="font-mono text-[11px] tracking-[0.04em] text-[#ECEBE5] truncate">{e.title}</span>
              </div>
              {e.detail ? <p className="mt-1 font-mono text-[11px] leading-5 text-[#989A95] line-clamp-2">{e.detail}</p> : null}
              {e.hash ? <p className="mt-1 font-mono text-[10px] text-[#989A95] truncate">{e.hash}</p> : null}
            </div>

            <div className="hidden md:flex items-start px-3 py-3 border-l border-[#242626] bg-[#121414]/50">
              <span className="font-mono text-[10px] tracking-[0.10em] uppercase text-[#989A95]">{e.id.slice(0, 8)}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function DogTimelineCompact({ events }: { events: TimelineEvent[] }) {
  return (
    <ol className="flex flex-col gap-2">
      {events.map((e) => (
        <li key={e.id} className="flex gap-3 items-start border-l-2 pl-3 py-1" style={{ borderColor: e.risk ? (e.risk === "critical" ? "#8B2A1A" : e.risk === "low" ? "#242626" : "#FF6B22") : "#242626" }}>
          <span className="font-mono text-[10px] text-[#989A95] shrink-0 pt-0.5">{new Date(e.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
          <span className="font-mono text-[11px] text-[#ECEBE5]">{e.title}</span>
        </li>
      ))}
    </ol>
  );
}
