import API from "./api";

export async function getProfile() {

  const response = await API.get("/profile/me");

  return response.data;

}

export async function updateProfile(profile) {

  const response = await API.put(
    "/profile/me",
    profile
  );

  return response.data;

}

export async function changePassword(passwordData) {

  const response = await API.put(
    "/profile/change-password",
    passwordData
  );

  return response.data;

}
export async function uploadAvatar(file) {

  const formData = new FormData();

  formData.append("file", file);

  const response = await API.post(
    "/profile/avatar",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;

}