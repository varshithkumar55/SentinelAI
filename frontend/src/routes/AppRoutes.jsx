import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/Landing/LandingPage";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import ScenarioBuilder from "../pages/ScenarioBuilder/ScenarioBuilder";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route
      path="/scenario"
      element={<ScenarioBuilder />}
      />
    </Routes>
  );
}

export default AppRoutes;