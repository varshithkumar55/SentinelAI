import { useEffect, useState } from "react";
import { getMissions } from "../services/missionService";

export default function useMissions() {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getMissions();
        setMissions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return {
    missions,
    loading,
    refresh: async () => {
      const data = await getMissions();
      setMissions(data);
    },
  };
}