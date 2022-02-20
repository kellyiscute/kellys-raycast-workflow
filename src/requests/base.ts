import ax, { AxiosInstance, AxiosRequestConfig } from "axios";

export class BaseRequest {
  axios: AxiosInstance;

  constructor(config?: AxiosRequestConfig) {
    this.axios = ax.create(config);
  }
}
