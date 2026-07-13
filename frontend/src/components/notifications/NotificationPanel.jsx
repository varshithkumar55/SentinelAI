import { getMissions } from "../../services/storage/missionStorage";
import { formatDateTime } from "../../utils/dateFormatter";
function NotificationPanel() {

  const missions = getMissions().slice(0,4);

  return (

    <div className="absolute right-0 mt-3 w-96 rounded-2xl border border-app bg-surface shadow-2xl">

      <div className="border-b border-app p-5">

        <h2 className="text-lg font-bold">

          🔔 Notifications

        </h2>

      </div>

      <div className="max-h-96 overflow-y-auto">

        {missions.map((mission)=>(

          <div
            key={mission.id}
            className="border-b border-app p-4"
          >

            <p className="font-semibold">

              🚨 High Risk Mission

            </p>

            <p className="mt-1 text-sm text-secondary">

              {mission.scenario}

            </p>

            <p className="mt-2 text-xs text-secondary">

              {formatDateTime(mission.submittedAt)}

            </p>

          </div>

        ))}

      </div>

    </div>

  );

}

export default NotificationPanel;