function About() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12 text-center">

          <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">
            About SentinelAI
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            AI-Powered Mission Planning Platform
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600">
            SentinelAI is an intelligent decision support platform designed to
            assist defense, disaster response, and security organizations in
            planning complex missions. By combining artificial intelligence with
            structured operational planning, SentinelAI helps decision-makers
            evaluate risks, optimize resources, and generate actionable mission
            strategies in real time.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 p-8 shadow-sm">

            <h3 className="mb-3 text-xl font-semibold">
              AI Decision Support
            </h3>

            <p className="text-slate-600">
              Uses Google Gemini AI to generate strategic mission plans,
              evaluate risks, allocate resources, and recommend alternative
              operational approaches.
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 p-8 shadow-sm">

            <h3 className="mb-3 text-xl font-semibold">
              Operational Intelligence
            </h3>

            <p className="text-slate-600">
              Provides mission timelines, confidence analysis, resource
              planning, and comprehensive operational reports for informed
              decision-making.
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 p-8 shadow-sm">

            <h3 className="mb-3 text-xl font-semibold">
              Modern Technology
            </h3>

            <p className="text-slate-600">
              Built using React, FastAPI, Google Gemini AI, Tailwind CSS,
              Recharts, and Docker-ready architecture for scalable deployment.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}

export default About;