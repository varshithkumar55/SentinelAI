import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const analyzeScenario = async (scenarioData) => {
  const response = await API.post("/analyze", scenarioData);
  return response.data;
};