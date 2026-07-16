import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useMissions from "../../hooks/useMissions";
import { Button } from "../ui";
import DashboardPreview from "../dashboard/DashboardPreview";

function Hero() {

  const navigate = useNavigate();
  const { missions, loading } = useMissions();
  if (loading) {
    return <p>Loading...</p>;
  }

const latestMission = missions[0];

const totalMissions = missions.length;

const averageConfidence =
  totalMissions === 0
    ? 0
    : Math.round(
        missions.reduce((sum, mission) => {
          let confidence = Number(mission.confidence) || 0;

          if (confidence <= 1) {
            confidence *= 100;
          }

          return sum + confidence;
        }, 0) / totalMissions
      );
  const scrollToFeatures = () => {

  const section = document.getElementById("features");

  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
    });
  }
};

  return (
    <section className="relative overflow-hidden">

      {/* Background */}

      <div className="absolute inset-0 -z-10">

        <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />

        <div className="absolute right-10 bottom-10 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-100/30 blur-3xl" />

      </div>

      <div className="mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-between gap-16 px-6 py-20 lg:flex-row">

        {/* Left */}

        <div className="max-w-2xl">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900">

            <Sparkles size={16} />

            AI-Powered Decision Intelligence Platform

          </div>

          <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-slate-900 lg:text-7xl">

            AI-Powered

            <br />

            Scenario Planning

            <br />

            <span className="text-blue-900">

              & Decision Intelligence

            </span>

          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600">

            Generate AI-powered strategic plans,

            evaluate operational risks,

            compare multiple scenarios,

            and produce decision-ready reports—

            all from a single intelligent platform.

          </p>

          <div className="mt-10 flex flex-wrap gap-4">

  <Button
  onClick={() => {
    navigate("/login");
  }}
>
  Start Planning
  <ArrowRight size={18} />
</Button>

  <Button
    variant="secondary"
    onClick={scrollToFeatures}
  >
    Explore Features
  </Button>

</div>

          {/* Metrics */}

          <div className="mt-14 grid grid-cols-3 gap-6">

            <Metric
  value={totalMissions}
  label="Missions Analysed"
/>

<Metric
  value={`${averageConfidence}%`}
  label="Average AI Confidence"
/>

<Metric
  value={totalMissions}
  label="Reports Generated"
/>

          </div>

        </div>

        <DashboardPreview />

      </div>

    </section>
  );

}

function Metric({ value, label }) {

  return (

    <div className="rounded-2xl border border-slate-200 bg-surface p-5 shadow-sm">

      <h3 className="text-3xl font-bold text-slate-900">

        {value}

      </h3>

      <p className="mt-2 text-slate-500">

        {label}

      </p>

    </div>

  );

}

export default Hero;