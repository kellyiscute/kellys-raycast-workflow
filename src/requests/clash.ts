import { IClashConfig, ProxyModeType } from "../models/clash";
import { BaseRequest } from "./base";

export class ClashRequest extends BaseRequest {
  async getConfig(): Promise<IClashConfig> {
    const res = await this.axios({
      baseURL: `http://${globalThis.prefs.clash.host}:${globalThis.prefs.clash.port}/configs`,
      method: "GET",
    });

    return res.data;
  }

  async changeMode(mode: ProxyModeType) {
    return this.axios({
      baseURL: `http://${globalThis.prefs.clash.host}:${globalThis.prefs.clash.port}/configs`,
      method: "PATCH",
      data: {
        mode
      }
    })
  }
}
