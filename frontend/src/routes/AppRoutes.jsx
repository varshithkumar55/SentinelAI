import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/Landing/LandingPage";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import ScenarioBuilder from "../pages/ScenarioBuilder/ScenarioBuilder";
import Results from "../pages/Results/Results";
import Reports from "../pages/Reports/Reports";
import History from "../pages/History/History";
import Settings from "../pages/Settings/Settings";
import ProtectedRoute from "./ProtectedRoute";
import Analytics from "../pages/Analytics/Analytics";
import Profile from "../pages/Profile/Profile";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/scenario"
        element={
          <ProtectedRoute>
            <ScenarioBuilder />
          </ProtectedRoute>
        }
      />

      <Route
        path="/results"
        element={
          <ProtectedRoute>
            <Results />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/analytics"
        element={
            <ProtectedRoute>
                <Analytics />
        </ProtectedRoute>
        }
      />

      <Route
      path="/profile"
      element={
        <ProtectedRoute>
            <Profile />
        </ProtectedRoute>
        }
      />
      <Route
    path="/change-password"
    element={
        <ProtectedRoute>
            <ChangePassword />
        </ProtectedRoute>
    }
      />
    </Routes>
  );
}

export default AppRoutes;