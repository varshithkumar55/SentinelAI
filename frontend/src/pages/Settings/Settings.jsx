import DashboardLayout from "../../layouts/DashboardLayout";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import toast from "react-hot-toast";
function Settings() {

  const { theme, setTheme } = useTheme();

  const [notifications, setNotifications] = useState(true);

  function clearHistory() {

    toast.error(
      "This feature will be enabled after backend delete support is added."
    );

  }

  return (

    <DashboardLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold">

            Settings

          </h1>

          <p className="mt-2 text-secondary">

            Customize your SentinelAI experience.

          </p>

        </div>

        {/* Appearance */}

        <div className="rounded-2xl border border-slate-200 bg-surface p-6 shadow-sm">

          <h2 className="text-2xl font-bold">

            🎨 Appearance

          </h2>

          <div className="mt-5">

            <label className="block font-medium">

              Theme

            </label>

            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="mt-2 rounded-xl border border-app bg-surface p-3 text-primary"
              >
              <option value="light">☀️ Light</option>

              <option value="dark">🌙 Dark</option>

              <option value="system">💻 System</option>
            </select>

          </div>

        </div>

        {/* AI */}

        <div className="rounded-2xl border border-slate-200 bg-surface p-6 shadow-sm">

          <h2 className="text-2xl font-bold">

            🤖 AI Configuration

          </h2>

          <div className="mt-5">

            <p>

              Model

            </p>

            <div className="mt-2 rounded-xl bg-slate-100 p-3">

              Gemini 2.5 Flash

            </div>

          </div>

        </div>

        {/* Notifications */}

        <div className="rounded-2xl border border-slate-200 bg-surface p-6 shadow-sm">

          <h2 className="text-2xl font-bold">

            🔔 Notifications

          </h2>

          <label className="mt-5 flex items-center gap-3">

            <input
              type="checkbox"
              checked={notifications}
              onChange={() =>
                setNotifications(
                  !notifications
                )
              }
            />

            Enable AI Notifications

          </label>

        </div>

        {/* Storage */}

        <div className="rounded-2xl border border-slate-200 bg-surface p-6 shadow-sm">

          <h2 className="text-2xl font-bold">

            🗄 Storage

          </h2>

          <button
            onClick={clearHistory}
            className="mt-5 rounded-xl bg-red-600 px-5 py-3 text-white hover:bg-red-700"
          >

            Clear Mission History

          </button>

        </div>

        {/* About */}

        <div className="rounded-2xl border border-slate-200 bg-surface p-6 shadow-sm">

          <h2 className="text-2xl font-bold">

            ℹ About

          </h2>

          <p className="mt-4 text-slate-600">

            SentinelAI v1.0

          </p>

          <p className="text-slate-500">

            React • FastAPI • Gemini AI

          </p>

        </div>

      </div>

    </DashboardLayout>

  );

}

export default Settings;