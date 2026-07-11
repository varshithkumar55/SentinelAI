import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const analyzeScenario = async (scenarioData) => {
  const response = await API.post("/analyze", scenarioData);
  return response.data;
};