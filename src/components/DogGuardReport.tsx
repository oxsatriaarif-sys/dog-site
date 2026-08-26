import { DogRiskBadge } from "./DogStatus";
import type { RiskLevel } from "@/lib/objects";

export type GuardFinding = {
  id: string;
  rule: string;
  level: RiskLevel;
  detail: string;
  objectRef?: string;
};

export type GuardReport = {
  verdict: "pass" | "warn" | "fail";
  score: number; // 0-100, lower = riskier
  findings: GuardFinding[];
  scannedAt: string;
  target: string;
};

const VERDICT_STYLE: Record<GuardReport["verdict"], string> = {
  pass: "border-[#2E7D5B] text-[#2E7D5B] bg-[#2E7D5B]/10",
  warn: "border-[#FF6B22] text-[#FF6B22] bg-[#FF6B22]/10",
  fail: "border-[#8B2A1A] text-[#8B2A1A] bg-[#8B2A1A]/10",
};

export function DogGuardReport({ report }: { report: GuardReport }) {
  return (
    <section className="border border-[#242626] bg-[#121414]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#242626] px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#989A95]">GUARD REPORT</span>
          <span className={`border px-2 py-1 font-mono text-[10px] tracking-[0.14em] uppercase ${VERDICT_STYLE[report.verdict]}`}>
            {report.verdict}
          </span>
          <span className="font-mono text-[11px] text-[#ECEBE5]">SCORE {report.score}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.08em] text-[#989A95]">{new Date(report.scannedAt).toLocaleString()}</span>
          <span className="font-mono text-[10px] text-[#989A95] truncate max-w-[180px]">{report.target}</span>
        </div>
      </div>

      {/* score bar */}
      <div className="px-4 py-3 border-b border-[#242626]">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#989A95]">RISK SCORE</span>
          <span className="font-mono text-[11px] text-[#ECEBE5]">{report.score}/100</span>
        </div>
        <div className="h-1.5 w-full bg-[#0C0D0D] border border-[#242626] overflow-hidden">
          <div
            className={`h-full transition-all ${report.verdict === "pass" ? "bg-[#2E7D5B]" : report.verdict === "warn" ? "bg-[#FF6B22]" : "bg-[#8B2A1A]"}`}
            style={{ width: `${report.score}%` }}
          />
        </div>
      </div>

      <div className="divide-y divide-[#242626]">
        {report.findings.length === 0 ? (
          <div className="px-4 py-6 font-mono text-[11px] tracking-[0.08em] uppercase text-[#989A95]">No findings — clean.</div>
        ) : (
          report.findings.map((f) => (
            <div key={f.id} className="grid grid-cols-[1fr_auto] gap-4 px-4 py-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] tracking-[0.06em] text-[#ECEBE5]">{f.rule}</span>
                  <DogRiskBadge level={f.level} />
                </div>
                <p className="mt-1 font-mono text-[11px] leading-4 text-[#989A95]">{f.detail}</p>
                {f.objectRef ? <p className="mt-1 font-mono text-[10px] text-[#989A95] truncate">{f.objectRef}</p> : null}
              </div>
              <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#989A95] self-start pt-1">{f.id}</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
