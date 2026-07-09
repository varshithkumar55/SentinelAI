import {
  FileText,
  BrainCircuit,
  ShieldAlert,
  GitCompareArrows,
  FileCheck2,
  ArrowDown,
} from "lucide-react";

const workflowSteps = [
  {
    icon: FileText,
    title: "Create Scenario",
    description:
      "Define objectives, constraints, available resources and mission requirements.",
    color: "bg-blue-100 text-blue-900",
  },
  {
    icon: BrainCircuit,
    title: "AI Analysis",
    description:
      "Gemini AI analyzes the scenario and generates multiple strategic options.",
    color: "bg-violet-100 text-violet-700",
  },
  {
    icon: ShieldAlert,
    title: "Risk Assessment",
    description:
      "Evaluate operational risks, constraints and potential bottlenecks.",
    color: "bg-red-100 text-red-600",
  },
  {
    icon: GitCompareArrows,
    title: "Strategy Comparison",
    description:
      "Compare alternative plans using measurable decision metrics.",
    color: "bg-amber-100 text-amber-700",
  },
  {
    icon: FileCheck2,
    title: "Decision Report",
    description:
      "Export structured recommendations and AI-generated reports.",
    color: "bg-green-100 text-green-700",
  },
];

function Workflow() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-900">
            AI Workflow
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            From Scenario to Decision
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-600">
            SentinelAI transforms complex scenarios into actionable
            decisions through a structured AI-powered workflow.
          </p>
        </div>

        <div className="mt-20 flex flex-col items-center">

          {workflowSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="flex w-full max-w-3xl flex-col items-center"
              >
                <div className="flex w-full items-center gap-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">

                  <div className={`rounded-xl p-4 ${step.color}`}>
                    <Icon size={28} />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </div>

                {index < workflowSteps.length - 1 && (
                  <ArrowDown className="my-5 text-slate-400" size={28} />
                )}
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}

export default Workflow;