import {LocalStorage} from "@raycast/api";
import {PreferencesNames} from "../constants";
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
    const host = await LocalStorage.getItem<string>(PreferencesNames.CLASH_CONTROLLER_HOST);
    const port = await LocalStorage.getItem<string>(PreferencesNames.CLASH_CONTROLLER_PORT);
    await this.axios({
      url: `http://${host ?? "127.0.0.1"}:${port ?? "9090"}/configs`,
      method: "PATCH",
      data: {
        mode
      }
    })
  }
}
