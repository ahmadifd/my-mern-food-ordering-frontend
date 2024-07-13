import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { authApiSlice } from "../../features/auth/authApiSlice";
import { store } from "../store";

const BASE_URL = "http://localhost:3800";

export default axios.create({ baseURL: BASE_URL });

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export class GetAxiosAutoRefresh {
  private api: AxiosInstance;
  private requestIntercept: number;
  private responseIntercept: number;
  constructor(token: string | null, contentType: string) {
    this.api = axios.create({
      baseURL: BASE_URL,
      headers: { "Content-Type": contentType },
    });
    this.requestIntercept = this.api.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    this.responseIntercept = this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const result = await store.dispatch(
            authApiSlice.endpoints.refresh.initiate(null)
          );
          prevRequest.headers["Authorization"] = `Bearer ${result?.data?.data?.accessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );
  }

  eject() {
    this.api.interceptors.request.eject(this.requestIntercept);
    this.api.interceptors.response.eject(this.responseIntercept);
  }

  post(url: string, { data }: AxiosRequestConfig) {
    return this.api.post(url, data);
  }

  get(url: string) {
    return this.api.get(url);
  }

  put(url: string, { data }: AxiosRequestConfig) {
    return this.api.put(url, data);
  }

  delete(url: string) {
    return this.api.delete(url);
  }
}
