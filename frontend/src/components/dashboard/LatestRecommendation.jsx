import useMissions from "../../hooks/useMissions";
import { formatDateTime } from "../../utils/dateFormatter";
import EmptyState from "../../components/common/EmptyState";
function LatestRecommendation() {
  const { missions, loading } = useMissions();

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-surface p-6 shadow-sm">
        <h2 className="text-xl font-bold">
          🧠 Latest Executive Summary
        </h2>

        <p>Loading...</p>
      </div>
    );
  }

  const latest = missions[0];

  let summary = "No executive summary available.";

  if (latest) {
    if (latest.analysis_json?.summary) {
      summary = latest.analysis_json.summary;
    } else if (latest.summary) {
      summary = latest.summary;
    } else if (latest.ai_response) {
      summary = latest.ai_response;
    } else if (latest.recommended_strategy) {
      summary = latest.recommended_strategy;
    }
  }

  // Show the first two complete sentences instead of cutting mid-sentence
  let shortSummary = summary;

  const firstPeriod = summary.indexOf(".");
  const secondPeriod = summary.indexOf(".", firstPeriod + 1);

  if (secondPeriod !== -1) {
    shortSummary = summary.substring(0, secondPeriod + 1);
  } else if (firstPeriod !== -1) {
    shortSummary = summary.substring(0, firstPeriod + 1);
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-surface p-6 shadow-sm">
      <h2 className="text-xl font-bold">
        🧠 Latest Executive Summary
      </h2>

      {latest ? (
        <>
          <p className="mt-5 leading-7 text-slate-700">
            {shortSummary}
          </p>

          <p className="mt-6 text-sm text-slate-400">
            {formatDateTime(latest.createdAt)}
          </p>
        </>
      ) : (
        <EmptyState
          icon="🧠"
          title="No Executive Summary"
          description="Run your first mission analysis to generate AI insights."
        />
      )}
    </div>
  );
}

export default LatestRecommendation;