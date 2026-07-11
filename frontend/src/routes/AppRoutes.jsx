import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/Landing/LandingPage";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import ScenarioBuilder from "../pages/ScenarioBuilder/ScenarioBuilder";
import Results from "../pages/Results/Results";
import Reports from "../pages/Reports/Reports";
import History from "../pages/History/History";
import Settings from "../pages/Settings/Settings";

function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/scenario" element={<ScenarioBuilder />} />

      <Route path="/results" element={<Results />} />

      <Route path="/reports" element={<Reports />} />

      <Route path="/history" element={<History />} />

      <Route path="/settings" element={<Settings />} />

    </Routes>
  );
}

export default AppRoutes;