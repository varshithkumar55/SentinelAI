import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const loginUser = async (credentials) => {
  const response = await API.post(
    "/auth/login",
    credentials
  );

  return response.data;
};

export const registerUser = async (userData) => {
  const response = await API.post(
    "/auth/register",
    userData
  );

  return response.data;
};