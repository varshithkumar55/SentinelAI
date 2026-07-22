import API from "./api";

export async function forgotPassword(email) {
  const response = await API.post("/auth/forgot-password", {
    email,
  });

  return response.data;
}