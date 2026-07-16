import { useEffect, useState } from "react";
import { getMissions } from "../services/missionService";

function normalizeMission(mission) {
  return {
    ...mission,

    createdAt: mission.created_at,
    missionType: mission.mission_type,
    aiResponse: mission.ai_response,
    riskLevel: mission.risk_level,
    recommended_strategy:
      mission.recommendation ?? mission.recommended_strategy,
  };
}

export default function useMissions() {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const data = await getMissions();

      setMissions(data.map(normalizeMission));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return {
    missions,
    loading,
    refresh: load,
  };
}