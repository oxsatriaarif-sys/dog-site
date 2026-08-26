"use client";

import { useEffect, useState } from "react";

type SignalLevel = "info" | "warn" | "critical";

export function DogSignal({
  level = "info",
  title,
  message,
  timestamp,
  dismissible,
  onDismiss,
}: {
  level?: SignalLevel;
  title: string;
  message?: string;
  timestamp?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  const bar =
    level === "critical" ? "bg-[#8B2A1A]" : level === "warn" ? "bg-[#FF6B22]" : "bg-[#242626]";
  const titleColor =
    level === "critical" ? "text-[#8B2A1A]" : level === "warn" ? "text-[#FF6B22]" : "text-[#ECEBE5]";

  return (
    <div className="border border-[#242626] bg-[#121414] flex">
      <div className={`w-1 shrink-0 ${bar}`} aria-hidden />
      <div className="flex-1 min-w-0 px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#989A95] border border-[#242626] px-1.5 py-0.5 bg-[#0C0D0D]">
                SIGNAL
              </span>
              <span className={`font-mono text-[11px] tracking-[0.06em] uppercase ${titleColor}`}>{title}</span>
              <span
                className={[
                  "font-mono text-[10px] tracking-[0.12em] uppercase border px-1.5 py-0.5",
                  level === "critical"
                    ? "border-[#8B2A1A]/40 text-[#8B2A1A] bg-[#8B2A1A]/10"
                    : level === "warn"
                      ? "border-[#FF6B22]/30 text-[#FF6B22] bg-[#FF6B22]/10"
                      : "border-[#242626] text-[#989A95]",
                ].join(" ")}
              >
                {level}
              </span>
            </div>
            {message ? <p className="mt-1.5 font-mono text-[11px] leading-5 text-[#989A95]">{message}</p> : null}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {timestamp ? <span className="font-mono text-[10px] text-[#989A95] hidden sm:inline">{new Date(timestamp).toLocaleTimeString()}</span> : null}
            {dismissible ? (
              <button
                onClick={() => {
                  setVisible(false);
                  onDismiss?.();
                }}
                className="border border-[#242626] px-2 py-1 font-mono text-[10px] tracking-[0.12em] uppercase text-[#989A95] hover:text-[#ECEBE5] hover:border-[#2E3232] transition-colors"
                aria-label="Dismiss"
              >
                ✕
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export function DogSignalStack({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-2">{children}</div>;
}

// ephemeral toast-like signal that auto-dismisses — client only
export function DogEphemeralSignal(props: Parameters<typeof DogSignal>[0] & { ttlMs?: number }) {
  const { ttlMs = 6000, ...rest } = props;
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGone(true), ttlMs);
    return () => clearTimeout(t);
  }, [ttlMs]);
  if (gone) return null;
  return <DogSignal {...rest} dismissible onDismiss={() => setGone(true)} />;
}
