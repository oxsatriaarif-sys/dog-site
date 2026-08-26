import { DogConsole } from "@/components/DogConsole";

const NAV = [
  { label:"HOME", href:"#top" },
  { label:"COMMAND", href:"#command" },
  { label:"WATCH", href:"#watch" },
  { label:"GUARD", href:"#guard" },
  { label:"TASKS", href:"#stay" },
  { label:"HISTORY", href:"#history" },
  { label:"DOCS", href:"#constitution" },
];

function Mark({ size=40 }: { size?: number }){
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/dog.svg" alt="DOG — watchdog" width={size} height={size} className="h-full w-full object-contain" />
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }){
  return <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#FF6B22]">{children}</div>;
}

function Rule(){ return <hr className="border-t border-[#242626]" />; }

export default function Home(){
  return (
    <div className="min-h-screen bg-[#0C0D0D] text-[#ECEBE5]">
      {/* top status */}
      <div className="sticky top-0 z-50 border-b border-[#242626] bg-[#121414]/95 backdrop-blur">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6 h-7 flex items-center justify-between font-mono text-[10px] tracking-[0.08em] text-[#989A95]">
          <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#2E7D5B] animate-pulse" /> NETWORK: ALIVE · EXECUTORS 128 · P50 1.2s · BLOCK 312,441,882</span>
          <span className="hidden sm:inline">DOG / INDUSTRIAL SURVEILLANCE — SESSION 00218</span>
        </div>
      </div>

      {/* masthead */}
      <header className="border-b border-[#242626] bg-[#0C0D0D]">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6 h-[64px] flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Mark />
            <div className="leading-none">
              <div className="font-mono text-[13px] font-bold tracking-[0.12em]">DOG</div>
              <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#989A95]">Onchain Watchdog</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-5 font-mono text-[11px] tracking-[0.12em] uppercase">
            {NAV.map(n=> <a key={n.label} href={n.href} className="text-[#989A95] hover:text-[#ECEBE5]">{n.label}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <a href="#command" className="font-mono text-[11px] tracking-[0.12em] uppercase border border-[#FF6B22] bg-[#FF6B22] text-[#0C0D0D] px-4 py-2 font-bold hover:bg-[#ff7a3a]">OPEN DOG</a>
            <a href="#docs" className="hidden sm:inline font-mono text-[11px] tracking-[0.12em] uppercase border border-[#242626] bg-[#121414] px-4 py-2 text-[#ECEBE5] hover:border-[#FF6B22]/40">MANUAL</a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="mx-auto max-w-[1280px] px-4 md:px-6 pt-10 pb-6">
        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          <div>
            <Eyebrow>● Onchain watchdog — disciplined, not cute</Eyebrow>
            <h1 className="mt-3 font-sans text-[38px] md:text-[52px] leading-[0.95] font-[700] tracking-[-0.03em]">
              Watch the chain.<br />
              <span className="text-[#989A95]">Guard what matters.</span><br />
              Act only when you say so.
            </h1>
            <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-[#989A95]">
              <span className="text-[#ECEBE5]">DOG watches the chain so you don’t have to.</span> Track wallets, tokens and approvals as typed objects. Compose small commands into powerful workflows. DOG barks, then bites — only on your leash.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href="#command" className="font-mono text-[12px] tracking-[0.12em] uppercase bg-[#ECEBE5] text-[#0C0D0D] px-5 py-3 font-bold">OPEN DOG — TRY LIVE</a>
              <a href="#signal" className="font-mono text-[12px] tracking-[0.12em] uppercase border border-[#242626] bg-[#121414] px-5 py-3">HOW IT FLOWS →</a>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 max-w-[520px]">
              {[
                ["SNIFF → FIND", "Discover unknown objects"],
                ["TRACK → WATCH", "Passive condition monitors"],
                ["GUARD → BITE", "Bounded execution on trigger"],
              ].map(([k,v])=> (
                <div key={k} className="border border-[#242626] bg-[#121414] p-3">
                  <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#FF6B22]">{k}</div>
                  <div className="font-mono text-[11px] text-[#989A95] mt-1">{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div id="command" className="md:sticky md:top-[88px]">
            <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#989A95] mb-2">LIVE CONSOLE — REAL TIME</div>
            <DogConsole autoFocus />
            <div className="mt-2 font-mono text-[11px] text-[#989A95]">Try: <span className="text-[#ECEBE5]">sniff 0x7a3e...09a</span> → <span className="text-[#ECEBE5]">guard wallet</span> → <span className="text-[#ECEBE5]">watch WETH --below 2800</span></div>
          </div>
        </div>
      </section>

      <Rule />

      {/* 02 OBJECTS */}
      <section className="mx-auto max-w-[1280px] px-4 md:px-6 py-10">
        <Eyebrow>02 — DOG SEES OBJECTS</Eyebrow>
        <div className="mt-3 grid md:grid-cols-[0.9fr_1.1fr] gap-8">
          <h2 className="font-sans text-[28px] leading-none font-bold tracking-[-0.02em]">Everything is a typed object.<br /><span className="text-[#989A95]">Read, filter, inspect, act.</span></h2>
          <p className="text-[14px] leading-relaxed text-[#989A95]">wallet · token · position · pool · approval · transaction · holder · transfer · price · liquidity · task · alert · rule · execution · risk-event — DOG makes them visible, then composable.</p>
        </div>
        <div className="mt-6 border border-[#242626] bg-[#121414] overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y divide-[#242626]">
            {[
              ["wallet","0x7a3e…09a","$48,291","high"],
              ["token","WETH · 12.45","$42,580","low"],
              ["position","Aave v3 lending","$18,420","low"],
              ["approval","WETH → 1inch","unlimited","high"],
              ["pool","WETH/USDC 0.3%","TVL $12.4M","med"],
              ["transaction","approve","confirmed","med"],
              ["task","watch-wallet","running","—"],
              ["risk-event","phishing probe","critical","crit"],
            ].map(([k,v,amt,r])=> (
              <div key={k} className="p-4 bg-[#121414]">
                <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#989A95]">{k}</div>
                <div className="font-mono text-[12px] text-[#ECEBE5] mt-1 truncate">{v}</div>
                <div className="font-mono text-[11px] text-[#989A95]">{amt} · <span className={r==="high"||r==="crit"?"text-[#FF6B22]": r==="crit" ? "text-[#8B2A1A]" : "text-[#989A95]"}>{r}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Rule />

      {/* 03 FLOW */}
      <section id="signal" className="mx-auto max-w-[1280px] px-4 md:px-6 py-10">
        <Eyebrow>03 — FROM SIGNAL TO ACTION</Eyebrow>
        <h2 className="mt-2 font-sans text-[28px] font-bold tracking-[-0.02em]">SNIFF → TRACK → WATCH → GUARD → BITE</h2>
        <div className="mt-6 border border-[#242626] bg-[#121414] p-4 md:p-6 overflow-x-auto">
          <div className="min-w-[720px] flex items-center gap-0 font-mono text-[11px]">
            {[
              ["SNIFF","discover","#ECEBE5"],
              ["TRACK","follow","#ECEBE5"],
              ["WATCH","monitor","#FF6B22"],
              ["GUARD","protect","#FF6B22"],
              ["BITE","execute","#ECEBE5"],
            ].map(([label, sub], i)=> (
              <div key={label} className="flex items-center gap-0">
                <div className="border border-[#242626] bg-[#0C0D0D] px-4 py-3 min-w-[130px] text-center">
                  <div className="tracking-[0.14em] uppercase" style={{color: sub.includes("monitor")||sub.includes("protect") ? "#FF6B22" : "#ECEBE5"}}>{label}</div>
                  <div className="text-[#989A95] text-[10px] uppercase tracking-[0.08em]">{sub}</div>
                </div>
                {i<4 ? <div className="w-8 h-px bg-[#242626] relative"><span className="absolute -right-1 -top-[3px] h-1.5 w-1.5 rotate-45 border-r border-t border-[#242626]" /></div> : null}
              </div>
            ))}
          </div>
          <div className="mt-4 font-mono text-[11px] text-[#989A95]">SMALL PRIMITIVES + COMPOSITION = POWERFUL WORKFLOWS — <span className="text-[#ECEBE5]">sniff wallet 0x… | filter approvals | guard</span></div>
        </div>
      </section>

      <Rule />

      {/* 04 WATCH */}
      <section id="watch" className="mx-auto max-w-[1280px] px-4 md:px-6 py-10">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Eyebrow>04 — WATCH</Eyebrow>
            <h2 className="mt-2 font-sans text-[26px] font-bold">Passive monitoring.<br /><span className="text-[#989A95]">WATCH does not execute.</span></h2>
            <div className="mt-4 border border-[#242626] bg-[#0C0D0D] p-4 font-mono text-[12px] leading-relaxed">
              <div className="text-[#989A95]">track WETH</div>
              <div className="text-[#ECEBE5]">watch --below 2800</div>
              <div className="text-[#FF6B22]">bark</div>
              <div className="mt-3 text-[#989A95]">— WATCH is a condition, not a transaction. DOG quietly evaluates. When matched, it barks. It never bites unless you said so.</div>
            </div>
          </div>
          <div className="border border-[#242626] bg-[#121414] p-4">
            <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#FF6B22]">WATCH PREVIEW — WETH</div>
            <div className="mt-3 grid grid-cols-2 gap-3 font-mono text-[11px]">
              <div className="border border-[#242626] bg-[#0C0D0D] p-3"><div className="text-[#989A95] uppercase tracking-[0.08em]">Asset</div><div className="text-[#ECEBE5]">WETH</div></div>
              <div className="border border-[#242626] bg-[#0C0D0D] p-3"><div className="text-[#989A95] uppercase tracking-[0.08em]">Condition</div><div className="text-[#ECEBE5]">price ≤ $2800</div></div>
              <div className="border border-[#242626] bg-[#0C0D0D] p-3"><div className="text-[#989A95] uppercase tracking-[0.08em]">Action</div><div className="text-[#ECEBE5]">notify only</div></div>
              <div className="border border-[#242626] bg-[#0C0D0D] p-3"><div className="text-[#989A95] uppercase tracking-[0.08em]">Duration</div><div className="text-[#ECEBE5]">24h</div></div>
            </div>
            <div className="mt-3 flex items-center gap-2 font-mono text-[11px]"><span className="h-2 w-2 rounded-full bg-[#FF6B22] animate-pulse" /><span className="text-[#ECEBE5]">WATCHING — breathing pulse</span><span className="text-[#989A95]">evaluating every block</span></div>
          </div>
        </div>
      </section>

      <Rule />

      {/* 05 BITE */}
      <section id="bite" className="mx-auto max-w-[1280px] px-4 md:px-6 py-10">
        <Eyebrow>05 — BITE — BOUNDED EXECUTION</Eyebrow>
        <div className="mt-3 grid lg:grid-cols-2 gap-6">
          <div className="border border-[#FF6B22]/30 bg-[#121414] overflow-hidden">
            <div className="h-8 flex items-center px-3 border-b border-[#FF6B22]/20 bg-[#0C0D0D] font-mono text-[10px] tracking-[0.14em] uppercase text-[#FF6B22]">PERMISSION MANIFEST — HUMAN READABLE</div>
            <div className="p-4 font-mono text-[12px] leading-relaxed">
              <div className="text-[#ECEBE5] font-bold">DOG MAY:</div>
              <div className="mt-2 grid gap-1 text-[#ECEBE5]">
                <div><span className="text-[#989A95]">SELL</span> Token: WETH — Maximum: 2 WETH</div>
                <div><span className="text-[#989A95]">Trigger:</span> WETH ≤ $2800</div>
                <div><span className="text-[#989A95]">Max slippage:</span> 0.8% · <span className="text-[#989A95]">Executions:</span> 1 · <span className="text-[#989A95]">Expires:</span> 24h</div>
                <div><span className="text-[#989A95]">Destination:</span> Owner wallet</div>
              </div>
              <div className="mt-4 text-[#8B2A1A] font-bold">DOG MAY NOT:</div>
              <ul className="mt-2 list-disc pl-5 text-[#989A95] space-y-1">
                <li>transfer funds elsewhere</li>
                <li>trade another token</li>
                <li>increase amount</li>
                <li>renew or extend</li>
                <li>change recipient</li>
                <li>execute after expiry</li>
              </ul>
              <div className="mt-4 border border-[#242626] bg-[#0C0D0D] p-3">
                <div className="text-[10px] tracking-[0.12em] uppercase text-[#989A95]">Authorization includes — chain · wallet · asset · contracts · max amount · min received · slippage · trigger · recipient · executions · expiry · nonce · revocation</div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-sans text-[20px] font-bold">Bite is explicit, bounded, previewable.</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-[#989A95]">Never implicit. Every bite is a <span className="text-[#ECEBE5]">bounded execution intent</span> you sign. Show trigger, planned action, estimated output, gas, slippage, contract, wallet impact, risk warnings — then <span className="text-[#ECEBE5]">--dry-run</span>.</p>
            <div className="mt-4 border border-[#242626] bg-[#0C0D0D] p-3 font-mono text-[12px]">
              <div className="text-[#989A95]">$ bite swap WETH USDC --amount 2 --dry-run</div>
              <div className="mt-2 text-[#ECEBE5]">SIMULATING → SIMULATION COMPLETE → EXPECTED RESULT → AUTHORIZE</div>
              <div className="mt-2 text-[#989A95]">Never make a dangerous action look like a normal button.</div>
            </div>
            <div className="mt-3 font-mono text-[11px] text-[#2E7D5B]">✔ Simulation passed — authorize to sign</div>
          </div>
        </div>
      </section>

      <Rule />

      {/* 06 GUARD */}
      <section id="guard" className="mx-auto max-w-[1280px] px-4 md:px-6 py-10">
        <Eyebrow>06 — GUARD — SECURITY POSTURE</Eyebrow>
        <div className="mt-3 grid md:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="border border-[#242626] bg-[#121414] p-4">
            <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#ECEBE5]">$ guard wallet</div>
            <div className="mt-3 grid grid-cols-2 gap-3 font-mono text-[12px]">
              <div className="border border-[#242626] bg-[#0C0D0D] p-3"><div className="text-[#989A95]">approvals</div><div className="text-[18px] text-[#ECEBE5]">3</div><div className="text-[#FF6B22] text-[11px]">1 unlimited</div></div>
              <div className="border border-[#242626] bg-[#0C0D0D] p-3"><div className="text-[#989A95]">suspicious</div><div className="text-[18px] text-[#2E7D5B]">0</div><div className="text-[#989A95] text-[11px]">recipients clean</div></div>
              <div className="border border-[#242626] bg-[#0C0D0D] p-3"><div className="text-[#989A95]">active tasks</div><div className="text-[18px] text-[#ECEBE5]">1</div></div>
              <div className="border border-[#242626] bg-[#0C0D0D] p-3"><div className="text-[#989A95]">expiring auth</div><div className="text-[18px] text-[#FF6B22]">1</div></div>
            </div>
            <div className="mt-3 font-mono text-[11px] text-[#989A95]">ATTENTION REQUIRED — <span className="text-[#FF6B22]">inspect approval appr_01</span></div>
          </div>
          <div>
            <h3 className="font-sans text-[18px] font-bold">Guard evaluates risk, not price predictions.</h3>
            <ul className="mt-3 space-y-2 font-mono text-[12px] text-[#989A95]">
              <li>• <span className="text-[#ECEBE5]">Approval guard</span> — unlimited, lingering, phishing spender</li>
              <li>• <span className="text-[#ECEBE5]">Wallet guard</span> — large outflow, drain pattern</li>
              <li>• <span className="text-[#ECEBE5]">Liquidity guard</span> — -30% in 7m on pool 0x…</li>
              <li>• <span className="text-[#ECEBE5]">Contract guard</span> — suspicious interaction</li>
            </ul>
            <div className="mt-4 border border-[#242626] bg-[#0C0D0D] p-3 font-mono text-[11px] text-[#ECEBE5]">WHAT · WHY · SOURCE · TIME · CONFIDENCE — DOG describes evidence, not advice.</div>
          </div>
        </div>
      </section>

      <Rule />

      {/* 07 STAY */}
      <section id="stay" className="mx-auto max-w-[1280px] px-4 md:px-6 py-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Eyebrow>07 — STAY — PERSISTENT</Eyebrow>
            <h2 className="mt-2 font-sans text-[26px] font-bold">Close the laptop. DOG stays awake.</h2>
            <p className="mt-3 text-[13px] leading-relaxed text-[#989A95]">Stay keeps a job running. The remote executor holds only the signed intent — nothing broader. You can <span className="text-[#ECEBE5]">heel</span> to pause, <span className="text-[#ECEBE5]">recall</span> to revoke.</p>
            <div className="mt-4 font-mono text-[11px] border border-[#242626] bg-[#121414] p-3">
              <div><span className="text-[#989A95]">$</span> stay watch WETH --below 2800</div>
              <div className="text-[#2E7D5B]">✔ persistent — continues after close</div>
              <div className="text-[#989A95]">remote executor: holds bounded intent only</div>
            </div>
          </div>
          <div className="border border-[#242626] bg-[#121414] p-6 text-center">
            <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#FF6B22]">OPERATIONAL STATES</div>
            <div className="mt-4 flex flex-wrap justify-center gap-1.5 font-mono text-[10px] tracking-[0.08em] uppercase">
              {["SLEEPING","SNIFFING","TRACKING","WATCHING","GUARDING","BARKING","READY","BITING","RETURNING","FAILED","RECALLED"].map(s=> (
                <span key={s} className={`border px-2 py-1 ${s==="WATCHING"||s==="GUARDING" ? "border-[#FF6B22] text-[#FF6B22] bg-[#FF6B22]/10" : s==="BITING" ? "border-[#ECEBE5] text-[#ECEBE5]" : "border-[#242626] text-[#989A95]"}`}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Rule />

      {/* 08 HISTORY */}
      <section id="history" className="mx-auto max-w-[1280px] px-4 md:px-6 py-10">
        <Eyebrow>08 — HISTORY — AUDIT TRAIL</Eyebrow>
        <h2 className="mt-2 font-sans text-[26px] font-bold">Everything traceable.</h2>
        <div className="mt-4 border border-[#242626] bg-[#121414] overflow-hidden">
          <div className="divide-y divide-[#242626] font-mono text-[12px]">
            {[
              ["RULE CREATED","watch WETH --below 2800","14:31:02 UTC","#242626"],
              ["AUTHORIZATION SIGNED","max 2 WETH · slippage 0.8%","14:31:18 UTC","#242626"],
              ["CONDITION MATCHED","WETH $2780 ≤ $2800","14:32:17 UTC","#FF6B22"],
              ["SIMULATION PASSED","expected 238 USDC · gas 0.00041","14:32:17 UTC","#2E7D5B"],
              ["EXECUTION SENT","0x9f1e…e1f2","14:32:18 UTC","#ECEBE5"],
              ["CONFIRMED","block 312,441,903","14:32:19 UTC","#2E7D5B"],
            ].map(([k,v,t,c])=> (
              <div key={k} className="grid grid-cols-[160px_1fr_140px] gap-3 px-4 py-2.5 items-center">
                <span className="tracking-[0.08em] uppercase" style={{color: c as string}}>{k}</span>
                <span className="text-[#ECEBE5] truncate">{v}</span>
                <span className="text-[#989A95] text-right">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Rule />

      {/* 09 CONSTITUTION */}
      <section id="constitution" className="mx-auto max-w-[1280px] px-4 md:px-6 py-10">
        <Eyebrow>09 — PRODUCT CONSTITUTION</Eyebrow>
        <div className="mt-4 grid md:grid-cols-2 gap-6">
          <div className="space-y-3 font-mono text-[13px] leading-relaxed">
            {[
              "DOG DOES NOT HOLD KEYS.",
              "DOG DOES NOT HIDE PERMISSIONS.",
              "DOG DOES NOT EXECUTE OUTSIDE ITS LEASH.",
              "DOG DOES NOT PREDICT THE FUTURE.",
              "DOG DOES NOT MAKE DECISIONS YOU DID NOT AUTHORIZE.",
            ].map(s=> (
              <div key={s} className="border-l-2 border-[#FF6B22] bg-[#121414] px-4 py-3 text-[#ECEBE5]">{s}</div>
            ))}
          </div>
          <div className="border border-[#242626] bg-[#121414] p-4">
            <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#ECEBE5]">TRUST MODEL</div>
            <ul className="mt-3 space-y-2 font-mono text-[12px] text-[#989A95]">
              <li>• No private keys stored — signing stays on your machine</li>
              <li>• Bounded intents with expiry, nonce, replay protection</li>
              <li>• Human-readable manifest before every authorization</li>
              <li>• Revocable via recall — onchain revocation</li>
              <li>• DOG never presents AI output as guaranteed fact</li>
            </ul>
          </div>
        </div>
      </section>

      <Rule />

      {/* 10 CTA */}
      <section className="mx-auto max-w-[1280px] px-4 md:px-6 py-12 text-center">
        <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#FF6B22]">DOG IS WATCHING</div>
        <h2 className="mt-3 font-sans text-[34px] md:text-[42px] font-bold tracking-[-0.03em]">Nothing moves unnoticed.</h2>
        <p className="mt-3 text-[#989A95] max-w-[60ch] mx-auto">Track what matters. Guard the wallet. Act when conditions are real.</p>
        <div className="mt-6 flex justify-center gap-3">
          <a href="#command" className="font-mono text-[12px] tracking-[0.12em] uppercase bg-[#FF6B22] text-[#0C0D0D] px-6 py-3 font-bold">OPEN DOG</a>
          <a href="#docs" className="font-mono text-[12px] tracking-[0.12em] uppercase border border-[#242626] bg-[#121414] px-6 py-3">READ THE MANUAL</a>
        </div>
        <div className="mt-6 font-mono text-[11px] text-[#989A95]">DOG &gt; — your onchain watchdog. Industrial surveillance, not a meme.</div>
      </section>

      <Rule />

      {/* FOOTER */}
      <footer id="docs" className="mx-auto max-w-[1280px] px-4 md:px-6 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3">
              <Mark />
              <span className="font-mono text-[12px] font-bold tracking-[0.12em]">DOG</span>
            </div>
            <p className="mt-3 font-mono text-[12px] leading-relaxed text-[#989A95]">Surveillance industrial · Command layer · Execution engine.</p>
          </div>
          <div className="font-mono text-[11px] leading-relaxed">
            <div className="tracking-[0.12em] uppercase text-[#ECEBE5]">Docs</div>
            <div className="mt-2 space-y-1 text-[#989A95]">
              <div>COMMANDS — sniff, track, watch, guard, bark, bite…</div>
              <div>OBJECTS — wallet, token, approval, position…</div>
              <div>SECURITY — bounded intents, simulation, revocation</div>
              <div>ARCHITECTURE — client → parser → engine → auth → chain</div>
            </div>
          </div>
          <div className="font-mono text-[11px] text-[#989A95]">
            <div className="tracking-[0.12em] uppercase text-[#ECEBE5]">Links</div>
            <div className="mt-2 flex gap-3">
              <a href="https://x.com/" target="_blank" className="hover:text-[#ECEBE5]">X / Twitter</a>
            </div>
            <div className="mt-4 text-[10px] leading-relaxed">DOG is not a website with a dog theme. DOG is a product whose behavior feels like a watchdog. If a visual or feature does not reinforce that, it was removed.</div>
          </div>
        </div>
        <div className="mt-8 border-t border-[#242626] pt-4 flex justify-between font-mono text-[10px] text-[#989A95]">
          <span>© 2026 DOG — INDUSTRIAL SURVEILLANCE</span>
          <span>DOG / GUARD · SESSION 00218 · CHAIN ETH</span>
        </div>
      </footer>
    </div>
  );
}
