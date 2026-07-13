import { getMissions } from "../../services/storage/missionStorage";
import { formatDateTime } from "../../utils/dateFormatter";
function ActivityFeed() {

  const missions = getMissions();

  const activities = missions.flatMap((mission) => [
    {
      id: `${mission.id}-analysis`,
      icon: "🟢",
      title: `${mission.scenario} analyzed`,
      time: mission.createdAt,
    },
    {
      id: `${mission.id}-report`,
      icon: "📄",
      title: `Report generated`,
      time: mission.createdAt,
    },
    {
      id: `${mission.id}-strategy`,
      icon: "🤖",
      title: `AI strategy generated`,
      time: mission.createdAt,
    },
  ]);

  return (

    <div className="rounded-2xl border border-slate-200 bg-surface p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold">

        AI Activity Feed

      </h2>

      <div className="space-y-4">

        {activities.length === 0 ? (

          <p className="text-slate-500">

            No activity yet.

          </p>

        ) : (

          activities.slice(0, 8).map((activity) => (

            <div
              key={activity.id}
              className="flex items-start gap-3 rounded-xl bg-slate-50 p-3"
            >

              <div className="text-xl">

                {activity.icon}

              </div>

              <div>

                <p className="font-medium">

                  {activity.title}

                </p>

                <p className="text-sm text-slate-500">

                  {formatDateTime(activity.time)}

                </p>

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default ActivityFeed;