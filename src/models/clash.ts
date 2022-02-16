export type ProxyModeType = "global" | "rule" | "direct";

export interface IClashConfig {
  port: number;
  mode: ProxyModeType;
  "socks-port": number;
  "redir-port": number;
  "tproxy-port": number;
  "mixed-port": number;
  "log-level": "slient" | "error" | "warning" | "info" | "debug" | "verbose"
}

