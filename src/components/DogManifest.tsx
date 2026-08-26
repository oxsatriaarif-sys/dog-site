type ManifestRow = {
  key: string;
  value: string;
  mono?: boolean;
  danger?: boolean;
};

export function DogManifest({
  title,
  subtitle,
  rows,
  meta,
}: {
  title: string;
  subtitle?: string;
  rows: ManifestRow[];
  meta?: string;
}) {
  return (
    <section className="border border-[#242626] bg-[#121414]">
      <div className="flex items-start justify-between gap-4 border-b border-[#242626] px-4 py-3">
        <div className="min-w-0">
          <h2 className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#ECEBE5]">{title}</h2>
          {subtitle ? <p className="mt-1 font-mono text-[11px] leading-4 text-[#989A95] line-clamp-2">{subtitle}</p> : null}
        </div>
        {meta ? (
          <span className="shrink-0 border border-[#242626] bg-[#0C0D0D] px-2 py-1 font-mono text-[10px] tracking-[0.12em] uppercase text-[#989A95]">
            {meta}
          </span>
        ) : null}
      </div>

      <dl className="divide-y divide-[#242626]">
        {rows.map((r) => (
          <div key={r.key} className="grid grid-cols-[140px_1fr] gap-4 px-4 py-2.5 items-start">
            <dt className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#989A95] pt-0.5">{r.key}</dt>
            <dd
              className={[
                "min-w-0 text-[12px] leading-5 break-all",
                r.mono ? "font-mono" : "font-sans",
                r.danger ? "text-[#8B2A1A]" : "text-[#ECEBE5]",
              ].join(" ")}
            >
              {r.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function DogManifestSplit({
  left,
  right,
}: {
  left: { title: string; rows: ManifestRow[] };
  right: { title: string; rows: ManifestRow[] };
}) {
  return (
    <div className="grid gap-0 md:grid-cols-2 border border-[#242626] bg-[#121414] divide-y md:divide-y-0 md:divide-x divide-[#242626]">
      <DogManifest title={left.title} rows={left.rows} />
      <DogManifest title={right.title} rows={right.rows} />
    </div>
  );
}
