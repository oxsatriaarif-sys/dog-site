import type { ReactNode } from "react";

type DogShellProps = {
  children: ReactNode;
  commandBar?: ReactNode;
  sidebar?: ReactNode;
};

export function DogShell({ children, commandBar, sidebar }: DogShellProps) {
  return (
    <div className="min-h-screen bg-[#0C0D0D] text-[#ECEBE5] flex flex-col">
      {/* top bar — industrial masthead */}
      <header className="sticky top-0 z-40 border-b border-[#242626] bg-[#0C0D0D]/90 backdrop-blur">
        <div className="mx-auto max-w-[1440px] flex items-center gap-6 px-4 md:px-6 h-[48px]">
          <div className="flex items-center gap-3 shrink-0">
            <div className="h-7 w-7 border border-[#FF6B22] flex items-center justify-center">
              <span className="font-mono text-[11px] font-bold tracking-[0.14em] text-[#FF6B22]">DOG</span>
            </div>
            <div className="hidden sm:block h-7 w-px bg-[#242626]" />
            <div className="hidden sm:flex flex-col leading-none gap-[2px]">
              <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#989A95]">Onchain Watchdog</span>
              <span className="font-mono text-[10px] tracking-[0.08em] text-[#ECEBE5]/70">watches chain so you dont have to</span>
            </div>
          </div>

          <div className="flex-1 min-w-0">{commandBar}</div>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#989A95]">OPS</span>
            <span className="h-2 w-2 rounded-full bg-[#2E7D5B] shadow-[0_0_8px_rgba(46,125,91,0.6)]" aria-hidden />
            <span className="font-mono text-[11px] text-[#ECEBE5]">LIVE</span>
            <span className="font-mono text-[10px] text-[#989A95]">ETH · BASE</span>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1440px] flex-1 flex min-h-0">
        {sidebar ? (
          <aside className="hidden md:flex w-[280px] shrink-0 border-r border-[#242626] bg-[#121414] flex-col">
            {sidebar}
          </aside>
        ) : null}
        <main className="flex-1 min-w-0 bg-[#0C0D0D]">{children}</main>
      </div>

      <footer className="border-t border-[#242626] bg-[#0C0D0D]">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 h-[28px] flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#989A95]">DOG / INDUSTRIAL SURVEILLANCE — THIN BORDERS · MONO DATA</span>
          <span className="font-mono text-[10px] text-[#989A95] hidden sm:inline">© 2026 DOG</span>
        </div>
      </footer>
    </div>
  );
}

export function DogSidebarSection({ label, children, action }: { label: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div className="border-b border-[#242626] last:border-b-0">
      <div className="px-4 py-3 flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#989A95]">{label}</span>
        {action}
      </div>
      <div className="px-4 pb-4">{children}</div>
    </div>
  );
}
