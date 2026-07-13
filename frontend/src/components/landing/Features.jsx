import {
  BrainCircuit,
  ShieldAlert,
 GitCompareArrows,
  FileText,
  BarChart3,
  CloudCog,
} from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "AI Scenario Planning",
    description:
      "Generate multiple strategic plans using AI based on mission objectives and constraints.",
  },
  {
    icon: ShieldAlert,
    title: "Risk Assessment",
    description:
      "Evaluate operational risks and identify critical bottlenecks before execution.",
  },
  {
    icon: GitCompareArrows,
    title: "Strategy Comparison",
    description:
      "Compare AI-generated plans using measurable decision metrics and trade-offs.",
  },
  {
    icon: FileText,
    title: "Decision Reports",
    description:
      "Export structured AI-generated reports ready for presentation and analysis.",
  },
  {
    icon: BarChart3,
    title: "Decision Analytics",
    description:
      "Visualize confidence scores, performance metrics, and planning insights.",
  },
  {
    icon: CloudCog,
    title: "Cloud Native",
    description:
      "Designed for secure cloud deployment with FastAPI, Docker, AWS, and Gemini AI.",
  },
];

function Features() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-900">
            Platform Capabilities
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            Everything You Need for Intelligent Decision Support
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-600">
            SentinelAI combines AI-powered planning, risk evaluation,
            analytics, and reporting into a single decision intelligence platform.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-5 inline-flex rounded-xl bg-blue-100 p-3 text-blue-900">
                  <Icon size={28} />
                </div>

                <h3 className="text-xl font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;