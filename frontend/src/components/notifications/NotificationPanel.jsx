import useMissions from "../../hooks/useMissions";
import { formatDateTime } from "../../utils/dateFormatter";

function NotificationPanel() {

  const { missions, loading } = useMissions();

  if (loading) {
    return (
      <div className="absolute right-0 mt-3 w-96 rounded-2xl border border-app bg-surface shadow-2xl p-5">
        Loading...
      </div>
    );
  }

  const notifications = missions.slice(0, 4);

  return (

    <div className="absolute right-0 mt-3 w-96 rounded-2xl border border-app bg-surface shadow-2xl">

      <div className="border-b border-app p-5">

        <h2 className="text-lg font-bold">
          🔔 Notifications
        </h2>

      </div>

      <div className="max-h-96 overflow-y-auto">

        {notifications.length === 0 ? (

          <div className="p-5 text-secondary">
            No notifications.
          </div>

        ) : (

          notifications.map((mission) => (

            <div
              key={mission.id}
              className="border-b border-app p-4"
            >

              <p className="font-semibold">
                🚨 {mission.risk_level} Risk Mission
              </p>

              <p className="mt-1 text-sm text-secondary">
                {mission.title}
              </p>

              <p className="mt-2 text-xs text-secondary">
                {formatDateTime(mission.createdAt)}
              </p>

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default NotificationPanel;