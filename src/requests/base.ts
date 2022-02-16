import { showToast, Toast } from "@raycast/api";
import ax, { AxiosError, AxiosInstance } from "axios";

export class BaseRequest {
  axios: AxiosInstance;

  constructor() {
    this.axios = ax.create();
    this.axios.interceptors.response.use(undefined, (error: AxiosError) => {
      if (error.response?.status !== 200) {
        showToast({
          title: "Request Failed",
          style: Toast.Style.Failure,
          message: `${error.config.method} ${error.config.url}: ${error.response?.status ?? ""} ${
            error.response?.statusText ?? ""
          }\n${error.message}`,
        });
      }
    });
  }
}
