import API from "./api";

export async function getMissions() {
  const response = await API.get("/missions");
  return response.data;
}

export async function createMission(mission) {
  const response = await API.post("/missions", mission);
  return response.data;
}

export async function deleteMission(id) {
  const response = await API.delete(`/missions/${id}`);
  return response.data;
}
export async function getMission(id) {
  const response = await API.get(`/missions/${id}`);
  return response.data;
}