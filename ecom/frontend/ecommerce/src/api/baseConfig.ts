import axios from "axios";
import Cookies from "js-cookie";

export const client = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let refreshSubscribers: any = [];

const subscribeTokenRefresh = (cb: any) => refreshSubscribers.push(cb);

const onTokenRefreshed = (token: any) => {
  refreshSubscribers.forEach((cb: any) => cb(token));
  refreshSubscribers = [];
};

const refreshTokenAndRetry = async (error: any) => {
  try {
    const refreshToken = Cookies.get("refreshToken");
    const { data } = await axios.post("http://127.0.0.1:8000/token/refresh/", {
      refresh: refreshToken,
    });
    Cookies.set("accessToken", data.access, { path: "/" });
    Cookies.set("refreshToken", data.refresh, { path: "/" });
    client.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
    onTokenRefreshed(data.access);
    return data.access;
  } catch (refreshError) {
    throw refreshError;
  }
};

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((token: any) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(client(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshTokenAndRetry(error);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return client(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);

        if (typeof window !== "undefined") {
          localStorage.clear();
          window.location.href = `/en/accounts/login`;
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);
