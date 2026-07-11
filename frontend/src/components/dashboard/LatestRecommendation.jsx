import { getMissions } from "../../services/storage/missionStorage";

function LatestRecommendation() {

  const missions = getMissions();

  const latest = missions[0];

  return (

    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="text-xl font-bold">

        Latest AI Recommendation

      </h2>

      {latest ? (

        <>

          <p className="mt-5 text-slate-700 leading-7">

            {latest.recommended_strategy}

          </p>

          <p className="mt-6 text-sm text-slate-400">

            {latest.submittedAt}

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