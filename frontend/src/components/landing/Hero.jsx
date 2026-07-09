import { ArrowRight, Sparkles } from "lucide-react";
import { Button, Card } from "../ui";

function Hero() {
  return (
    <section className="relative overflow-hidden">

        {/* Background Effects */}

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
            Generate AI-powered strategic plans, evaluate operational
            risks, compare multiple scenarios, and produce decision-ready
            reports—all from a single intelligent platform.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">

          <Button>

            Start Planning

            <ArrowRight size={18} />

          </Button>

          <Button variant="secondary">

            Explore Features

          </Button>

        </div>

      </div>
      <div className="mt-14 flex flex-wrap gap-10">

  <div>
    <h3 className="text-3xl font-bold text-slate-900">
      50+
    </h3>

    <p className="text-slate-500">
      Planning Variables
    </p>
  </div>

  <div>
    <h3 className="text-3xl font-bold text-slate-900">
      95%
    </h3>

    <p className="text-slate-500">
      AI Confidence
    </p>
  </div>

  <div>
    <h3 className="text-3xl font-bold text-slate-900">
      {"<"}10s
    </h3>

    <p className="text-slate-500">
      Analysis Time
    </p>
  </div>

</div>

      {/* Right */}

      <Card className="w-full max-w-lg p-8">

        <h2 className="mb-6 text-2xl font-bold">

          Live Mission Preview

        </h2>

        <div className="space-y-5">

            <div className="rounded-xl bg-slate-100 p-4">
                <div className="text-sm text-slate-500">
                Active Scenario
                </div>

                <div className="mt-1 font-semibold">
                Operation Falcon
                </div>
            </div>

            <div>
                <div className="mb-2 flex justify-between text-sm">
                <span>AI Analysis</span>
                <span>82%</span>
                </div>

                <div className="h-2 rounded-full bg-slate-200">
                <div className="h-2 w-4/5 rounded-full bg-blue-900"></div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">

                <div className="rounded-xl bg-red-50 p-4">
                <div className="text-sm text-red-600">
                    Risk
                </div>

                <div className="mt-2 text-2xl font-bold">
                    Medium
                </div>
                </div>

                <div className="rounded-xl bg-green-50 p-4">
                <div className="text-sm text-green-700">
                Confidence
                </div>

                <div className="mt-2 text-2xl font-bold">
                91%
                </div>
            </div>

            </div>

  <div className="rounded-xl bg-blue-50 p-4">

    <div className="text-sm text-blue-800">
      Recommended Strategy
    </div>

    <div className="mt-2 font-semibold">
      Adaptive Resource Deployment
    </div>

  </div>

</div>

      </Card>
        </div>
    </section>
  );
}

export default Hero;