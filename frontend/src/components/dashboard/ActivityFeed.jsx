import useMissions from "../../hooks/useMissions";
import { formatDateTime } from "../../utils/dateFormatter";
import EmptyState from "../../components/common/EmptyState";
import Skeleton from "../common/Skeleton";
function ActivityFeed() {

  const { missions, loading } = useMissions();

  <Skeleton className="mb-6 h-8 w-40" />

  {[1,2,3,4].map(i=>(
  <div key={i} className="mb-3 flex gap-3">
    <Skeleton className="h-10 w-10 rounded-full"/>
    <div className="flex-1">
      <Skeleton className="h-4 w-48"/>
      <Skeleton className="mt-2 h-3 w-28"/>
    </div>
  </div>
  ))}

  const activities = missions
  .slice(0, 5)
  .flatMap((mission) => [
    {
      id: `${mission.id}-analysis`,
      icon: "🟢",
      title: `${mission.title} analyzed`,
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
  activities.sort(
  (a, b) => new Date(b.time) - new Date(a.time)
  );
  return (

    <div className="rounded-2xl border border-slate-200 bg-surface p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold">

        AI Activity Feed

      </h2>

      <div className="space-y-4">

        {activities.length === 0 ? (

          <EmptyState
            icon="🤖"
            title="No Activity"
            description="Mission activity will appear here after analysis."
          />

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