import axios from "axios";
import toast from "react-hot-toast";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
let isRefreshing = false;
let failedQueue = [];
let sessionExpiredShown = false;
function processQueue(error, token = null) {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  failedQueue = [];
}

API.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

API.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {

      originalRequest._retry = true;

      if (isRefreshing) {

        return new Promise((resolve, reject) => {

          failedQueue.push({
            resolve,
            reject,
          });

        }).then((token) => {

          originalRequest.headers.Authorization =
            `Bearer ${token}`;

          return API(originalRequest);

        });

      }

      isRefreshing = true;

      try {

        const refreshToken =
          localStorage.getItem("refresh_token") ||
          sessionStorage.getItem("refresh_token");

        if (!refreshToken) {
          throw new Error("No refresh token");
        }

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          {
            refresh_token: refreshToken,
          }
        );

        const newAccessToken =
          response.data.access_token;

        if (localStorage.getItem("token")) {
          localStorage.setItem(
            "token",
            newAccessToken
          );
        } else {
          sessionStorage.setItem(
            "token",
            newAccessToken
          );
        }

        API.defaults.headers.common.Authorization =
          `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return API(originalRequest);

      } catch (refreshError) {

        processQueue(refreshError, null);

        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");

        sessionStorage.removeItem("token");
        sessionStorage.removeItem("refresh_token");
        sessionStorage.removeItem("user");

        if (!sessionExpiredShown) {

          sessionExpiredShown = true;

          toast.error(
            "Session expired. Please login again."
          );

          setTimeout(() => {

            sessionExpiredShown = false;

            window.location.href = "/login";

          }, 1200);

        }

        return Promise.reject(refreshError);

      } finally {

        isRefreshing = false;

      }

    }

    return Promise.reject(error);

  }

);

export default API;