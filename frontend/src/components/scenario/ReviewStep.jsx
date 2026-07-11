function Card({ title, value }) {

  return (

    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </h3>

      <p className="mt-3 whitespace-pre-wrap text-slate-800">
        {value || "-"}
      </p>

    </div>

  );

}

function ReviewStep({ formData }) {

  return (

    <div className="space-y-8">

      <div>

        <h2 className="text-3xl font-bold">
          Review Scenario
        </h2>

        <p className="mt-2 text-slate-500">
          Verify all information before AI analysis.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <Card title="Scenario" value={formData.scenario} />
        <Card title="Mission" value={formData.mission} />
        <Card title="Objective" value={formData.objective} />
        <Card title="Mission Type" value={formData.missionType} />
        <Card title="Environment" value={formData.environment} />
        <Card title="Priority" value={formData.priority} />
        <Card title="Risk Tolerance" value={formData.riskTolerance} />
        <Card title="Personnel" value={formData.personnel} />
        <Card title="Vehicles" value={formData.vehicles} />
        <Card title="Equipment" value={formData.equipment} />
        <Card title="Budget" value={formData.budget} />
        <Card title="Constraints" value={formData.constraints} />
        <Card title="Start Date" value={formData.startDate} />
        <Card title="Duration" value={formData.duration} />
        <Card title="Notes" value={formData.notes} />

      </div>

      <div className="rounded-2xl border border-green-300 bg-green-50 p-6">

        <h3 className="text-xl font-bold text-green-700">
          ✅ Ready for AI Analysis
        </h3>

        <p className="mt-2 text-green-700">
          All required information has been collected.
          Click <strong>Analyze Scenario</strong> to generate the AI report.
        </p>

      </div>

    </div>

  );

}

export default ReviewStep;