// DOG — Object model
// Industrial surveillance domain: every onchain entity is an object.

export type ChainId = number;
export type Address = `0x${string}`;
export type ObjectKind = "wallet" | "token" | "position" | "pool" | "approval" | "transaction" | "task" | "alert" | "rule" | "execution" | "risk-event";

export type RiskLevel = "low" | "medium" | "high" | "critical";
export type TaskStatus = "idle" | "running" | "paused" | "error" | "done";
export type ApprovalStatus = "active" | "revoked" | "expired";
export type TxStatus = "pending" | "confirmed" | "failed" | "reverted";

export type Wallet = {
  kind: "wallet";
  id: Address;
  address: Address;
  chainId: ChainId;
  label?: string;
  ens?: string;
  balanceUsd: number;
  risk: RiskLevel;
  watched: boolean;
  lastActiveAt: string; // ISO
};

export type Token = {
  kind: "token";
  id: string; // chainId:address
  address: Address;
  chainId: ChainId;
  symbol: string;
  name: string;
  decimals: number;
  balance: string; // raw
  balanceFormatted: string;
  priceUsd: number | null;
  valueUsd: number | null;
  risk: RiskLevel;
};

export type Position = {
  kind: "position";
  id: string;
  wallet: Address;
  protocol: string;
  chainId: ChainId;
  type: "lending" | "staking" | "lp" | "perp" | "other";
  valueUsd: number;
  pnlUsd: number;
  risk: RiskLevel;
  healthFactor?: number | null;
};

export type Pool = {
  kind: "pool";
  id: string;
  chainId: ChainId;
  protocol: string;
  pair: string;
  address: Address;
  tvlUsd: number;
  apr: number | null;
  risk: RiskLevel;
};

export type Approval = {
  kind: "approval";
  id: string;
  wallet: Address;
  spender: Address;
  spenderLabel?: string;
  token: Address;
  tokenSymbol: string;
  allowance: string;
  allowanceFormatted: string;
  status: ApprovalStatus;
  risk: RiskLevel;
  grantedAt: string;
};

export type Transaction = {
  kind: "transaction";
  id: string; // tx hash
  hash: Address;
  chainId: ChainId;
  from: Address;
  to: Address | null;
  value: string;
  status: TxStatus;
  method?: string;
  risk: RiskLevel;
  timestamp: string;
  gasUsed?: string;
};

export type Task = {
  kind: "task";
  id: string;
  name: string;
  command: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
  nextRunAt?: string | null;
};

export type Alert = {
  kind: "alert";
  id: string;
  level: RiskLevel;
  title: string;
  body: string;
  objectRef?: string;
  createdAt: string;
  acked: boolean;
};

export type Rule = {
  kind: "rule";
  id: string;
  name: string;
  condition: string;
  action: string;
  enabled: boolean;
  risk: RiskLevel;
};

export type Execution = {
  kind: "execution";
  id: string;
  ruleId: string;
  status: "queued" | "executing" | "success" | "failed" | "cancelled";
  txHash?: Address | null;
  createdAt: string;
  reason: string;
};

export type RiskEvent = {
  kind: "risk-event";
  id: string;
  wallet: Address;
  type: "drain" | "approval" | "bridge" | "mixer" | "phishing" | "anomaly";
  risk: RiskLevel;
  detail: string;
  timestamp: string;
  txHash?: Address;
};

export type DogObject =
  | Wallet
  | Token
  | Position
  | Pool
  | Approval
  | Transaction
  | Task
  | Alert
  | Rule
  | Execution
  | RiskEvent;

export type DemoWalletBundle = {
  wallet: Wallet;
  tokens: Token[];
  positions: Position[];
  approvals: Approval[];
  transactions: Transaction[];
  tasks: Task[];
  alerts: Alert[];
  rules: Rule[];
  executions: Execution[];
  riskEvents: RiskEvent[];
};

// ——— mock ———

const DEMO_ADDR: Address = "0x7a3e65d9f3a11d3b42e77b8c9a04f1e22d55c09a";

export const MOCK_OBJECTS: DemoWalletBundle = {
  wallet: {
    kind: "wallet",
    id: DEMO_ADDR,
    address: DEMO_ADDR,
    chainId: 1,
    label: "demo-wallet",
    ens: "watchdog-demo.eth",
    balanceUsd: 48291.4,
    risk: "high",
    watched: true,
    lastActiveAt: "2026-08-26T09:14:00.000Z",
  },
  tokens: [
    { kind: "token", id: "1:0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", chainId: 1, symbol: "WETH", name: "Wrapped Ether", decimals: 18, balance: "12450000000000000000", balanceFormatted: "12.45", priceUsd: 3420.11, valueUsd: 42580.37, risk: "low" },
    { kind: "token", id: "1:0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", chainId: 1, symbol: "USDC", name: "USD Coin", decimals: 6, balance: "4200000000", balanceFormatted: "4,200", priceUsd: 1, valueUsd: 4200, risk: "low" },
    { kind: "token", id: "1:0x9a3bCa2c7d6e8F00c1a2b3c4d5e6f708091a2b3c4", address: "0x9a3bCa2c7d6e8F00c1a2b3c4d5e6f708091a2b3c4", chainId: 1, symbol: "PEPE", name: "Pepe", decimals: 18, balance: "890000000000000000000000000", balanceFormatted: "890,000,000", priceUsd: 0.0000071, valueUsd: 6319, risk: "medium" },
  ],
  positions: [
    { kind: "position", id: "pos_aave_weth", wallet: DEMO_ADDR, protocol: "Aave v3", chainId: 1, type: "lending", valueUsd: 18420, pnlUsd: 412.5, risk: "low", healthFactor: 1.84 },
    { kind: "position", id: "pos_uni_weth-usdc", wallet: DEMO_ADDR, protocol: "Uniswap v3", chainId: 1, type: "lp", valueUsd: 9210, pnlUsd: -88.2, risk: "medium", healthFactor: null },
  ],
  approvals: [
    { kind: "approval", id: "appr_01", wallet: DEMO_ADDR, spender: "0x1111111254fb6c44bAC0beD2854e76F90643097", spenderLabel: "1inch Router", token: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", tokenSymbol: "WETH", allowance: "115792089237316195423570985008687907853269984665640564039457584007913129639935", allowanceFormatted: "unlimited", status: "active", risk: "high", grantedAt: "2026-08-10T14:02:00.000Z" },
    { kind: "approval", id: "appr_02", wallet: DEMO_ADDR, spender: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", spenderLabel: "Uniswap Router", token: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", tokenSymbol: "USDC", allowance: "1000000000000", allowanceFormatted: "1,000,000", status: "active", risk: "medium", grantedAt: "2026-08-18T08:30:00.000Z" },
    { kind: "approval", id: "appr_03", wallet: DEMO_ADDR, spender: "0x000000000000000000000000000000000000dEaD", token: "0x9a3bCa2c7d6e8F00c1a2b3c4d5e6f708091a2b3c4", tokenSymbol: "PEPE", allowance: "0", allowanceFormatted: "0", status: "revoked", risk: "low", grantedAt: "2026-07-01T10:00:00.000Z" },
  ],
  transactions: [
    { kind: "transaction", id: "0x9f1e2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2", hash: "0x9f1e2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2", chainId: 1, from: DEMO_ADDR, to: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", value: "0", status: "confirmed", method: "approve", risk: "medium", timestamp: "2026-08-25T22:11:00.000Z", gasUsed: "46231" },
    { kind: "transaction", id: "0xab12cd34ef56ab12cd34ef56ab12cd34ef56ab12cd34ef56ab12cd34ef56ab12", hash: "0xab12cd34ef56ab12cd34ef56ab12cd34ef56ab12cd34ef56ab12cd34ef56ab12", chainId: 1, from: DEMO_ADDR, to: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", value: "500000000000000000", status: "confirmed", method: "deposit", risk: "low", timestamp: "2026-08-24T11:04:00.000Z", gasUsed: "55102" },
    { kind: "transaction", id: "0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef", hash: "0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef", chainId: 1, from: "0x0000000000000000000000000000000000000000", to: DEMO_ADDR, value: "0", status: "pending", method: "unknown", risk: "critical", timestamp: "2026-08-26T09:12:00.000Z" },
  ],
  tasks: [
    { kind: "task", id: "task_01", name: "watch-demo-wallet", command: "watch wallet 0x7a3e…09a", status: "running", createdAt: "2026-08-20T10:00:00.000Z", updatedAt: "2026-08-26T09:00:00.000Z", nextRunAt: "2026-08-26T09:15:00.000Z" },
    { kind: "task", id: "task_02", name: "guard-unlimited-approvals", command: "guard wallet --rule no-unlimited", status: "idle", createdAt: "2026-08-21T12:00:00.000Z", updatedAt: "2026-08-25T18:00:00.000Z", nextRunAt: null },
  ],
  alerts: [
    { kind: "alert", id: "alert_01", level: "high", title: "Unlimited approval active", body: "WETH unlimited approval to 1inch Router — revoke recommended.", objectRef: "appr_01", createdAt: "2026-08-26T08:00:00.000Z", acked: false },
    { kind: "alert", id: "alert_02", level: "critical", title: "Phishing interaction suspected", body: "Inbound 0-value tx from flagged broadcaster.", objectRef: "0xdeadbeef…beef", createdAt: "2026-08-26T09:12:00.000Z", acked: false },
  ],
  rules: [
    { kind: "rule", id: "rule_no_drain", name: "no-drain", condition: "outflow > 50% balance in 1 block", action: "bark --level critical + bite block", enabled: true, risk: "critical" },
    { kind: "rule", id: "rule_no_unlimited", name: "no-unlimited", condition: "approval.allowance == unlimited", action: "alert + suggest revoke", enabled: true, risk: "high" },
  ],
  executions: [
    { kind: "execution", id: "exec_01", ruleId: "rule_no_unlimited", status: "queued", createdAt: "2026-08-26T08:05:00.000Z", reason: "approval appr_01 matched no-unlimited", txHash: null },
  ],
  riskEvents: [
    { kind: "risk-event", id: "risk_01", wallet: DEMO_ADDR, type: "approval", risk: "high", detail: "Unlimited WETH approval granted to 0x1111…3097", timestamp: "2026-08-10T14:02:00.000Z", txHash: "0x9f1e2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2" },
    { kind: "risk-event", id: "risk_02", wallet: DEMO_ADDR, type: "phishing", risk: "critical", detail: "Zero-value probe from known phishing broadcaster", timestamp: "2026-08-26T09:12:00.000Z", txHash: "0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef" },
  ],
};

export function getObjectLabel(o: DogObject): string {
  switch (o.kind) {
    case "wallet": return o.ens ?? `${o.address.slice(0, 6)}…${o.address.slice(-4)}`;
    case "token": return o.symbol;
    case "position": return `${o.protocol} · ${o.type}`;
    case "pool": return o.pair;
    case "approval": return `${o.tokenSymbol} → ${o.spenderLabel ?? o.spender.slice(0, 6)}`;
    case "transaction": return o.method ?? o.hash.slice(0, 10);
    case "task": return o.name;
    case "alert": return o.title;
    case "rule": return o.name;
    case "execution": return o.id;
    case "risk-event": return o.type;
    default: return (o as { id: string }).id;
  }
}

export function riskColor(level: RiskLevel): string {
  switch (level) {
    case "low": return "text-[#989A95]";
    case "medium": return "text-[#FF6B22]";
    case "high": return "text-[#FF6B22]";
    case "critical": return "text-[#8B2A1A]";
  }
}

export function riskBg(level: RiskLevel): string {
  switch (level) {
    case "low": return "bg-[#242626]";
    case "medium": return "bg-[#FF6B22]/15";
    case "high": return "bg-[#FF6B22]/20";
    case "critical": return "bg-[#8B2A1A]/20";
  }
}
