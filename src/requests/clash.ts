import { IClashConfig, ProxyModeType } from "../models/clash";
import { BaseRequest } from "./base";

export class ClashRequest extends BaseRequest {
  async getConfig(): Promise<IClashConfig> {
    const res = await this.axios({
      url: "http://localhost:9090/configs",
      method: "GET",
    });

    return res.data;
  }

  async changeMode(mode: ProxyModeType) {
    await this.axios({
      url: "http://localhost:9090/configs",
      method: "PATCH",
      data: {
        mode
      }
    })
  }
}
