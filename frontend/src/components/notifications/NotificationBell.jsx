import { useState } from "react";
import { Bell } from "lucide-react";

import NotificationPanel from "./NotificationPanel";
import useMissions from "../../hooks/useMissions";

function NotificationBell() {

  const [open, setOpen] = useState(false);

  const { missions, loading } = useMissions();

  const notificationCount = loading
    ? 0
    : Math.min(missions.length, 99);

  return (

    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="relative rounded-xl border border-app bg-surface p-2 hover:bg-slate-100"
      >

        <Bell size={22} />

        {notificationCount > 0 && (

          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">

            {notificationCount}

          </span>

        )}

      </button>

      {open && <NotificationPanel />}

    </div>

  );

}

export default NotificationBell;