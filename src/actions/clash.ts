import { showToast } from "@raycast/api";
import { ProxyModeType } from "../models/clash";
import { ClashRequest } from "../requests/clash";

const proxyModeMap = {
  global: "Global",
  rule: "Rule",
  direct: "Direct",
};

const req = new ClashRequest();

export async function getProxyMode() {
  const res = await req.getConfig();
  return proxyModeMap[res.mode];
}

export async function switchMode(mode: ProxyModeType): Promise<boolean> {
  try {
    await req.changeMode(mode);
    return true;
  } catch (err) {
    showToast({ title: "Error switching proxy mode", message: `${err}` });
    return false;
  }
}
