import { showToast } from "@raycast/api";
import { ProxyModeType } from "../models/clash";
import { ClashRequest } from "../requests/clash";

const proxyModeMap = {
  global: "Global",
  rule: "Rule",
  direct: "Direct",
};

let req: ClashRequest | undefined = undefined;

export async function getProxyMode() {
  if (!req) {
    req = new ClashRequest();
  }
  const res = await req.getConfig();
  return proxyModeMap[res.mode];
}

export async function switchMode(mode: ProxyModeType): Promise<void> {
  if (!req) {
    req = new ClashRequest();
  }
  try {
    await req.changeMode(mode);
  } catch (e) {
    showToast({ title: `${e}` });
  }
}
