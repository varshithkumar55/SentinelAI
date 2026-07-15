let isRedirecting = false;
import axios from "axios";
import toast from "react-hot-toast";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

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

  (error) => {

    if (
        error.response?.status === 401 &&
        !isRedirecting
        ) {

        isRedirecting = true;

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");

        toast.error(
            "Your session has expired. Please log in again."
        );

        setTimeout(() => {

            window.location.href = "/login";

        }, 1200);

        }

    return Promise.reject(error);

  }

);

export default API;