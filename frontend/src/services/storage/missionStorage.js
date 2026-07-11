const STORAGE_KEY = "sentinelai_missions";

export function getMissions() {
  const data = localStorage.getItem(STORAGE_KEY);

  return data ? JSON.parse(data) : [];
}

export function saveMission(result) {
  const missions = getMissions();

  const mission = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    ...result,
  };

  missions.unshift(mission);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(missions)
  );

  return mission;
}

export function clearMissions() {
  localStorage.removeItem(STORAGE_KEY);
}