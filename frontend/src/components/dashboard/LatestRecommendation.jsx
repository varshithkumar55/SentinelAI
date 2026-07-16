import useMissions from "../../hooks/useMissions";
import { formatDateTime } from "../../utils/dateFormatter";
function LatestRecommendation() {

  const { missions, loading } = useMissions();

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-surface p-6 shadow-sm">
        <h2 className="text-xl font-bold">
          Latest AI Recommendation
        </h2>
        <p>Loading...</p>
      </div>
    );
  }

  const latest = missions[0];

  return (

    <div className="rounded-2xl border border-slate-200 bg-surface p-6 shadow-sm">

      <h2 className="text-xl font-bold">

        Latest AI Recommendation

      </h2>

      {latest ? (

        <>

          <p className="mt-5 text-slate-700 leading-7">

            {latest.recommended_strategy}

          </p>

          <p className="mt-6 text-sm text-slate-400">

            {formatDateTime(latest.createdAt)}

          </p>

        </>

      ) : (

        <p className="mt-5 text-slate-500">

          No analyses available.

        </p>

      )}

    </div>

  );

}

export default LatestRecommendation;