function MissionStep({ formData, setFormData }) {
  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-8">

      <div>
        <h2 className="text-3xl font-bold text-slate-900">
          Mission Information
        </h2>

        <p className="mt-2 text-slate-500">
          Define the mission details.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            Scenario Name
          </label>

          <input
            value={formData.scenario}
            onChange={(e)=>updateField("scenario",e.target.value)}
            className="w-full rounded-xl border p-3"
            placeholder="Operation Falcon"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Mission Name
          </label>

          <input
            value={formData.mission}
            onChange={(e)=>updateField("mission",e.target.value)}
            className="w-full rounded-xl border p-3"
            placeholder="Border Surveillance"
          />
        </div>

      </div>

      <div>

        <label className="mb-2 block font-medium">
          Mission Objective
        </label>

        <textarea
          rows={5}
          value={formData.objective}
          onChange={(e)=>updateField("objective",e.target.value)}
          className="w-full rounded-xl border p-3"
        />

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <Select
          label="Mission Type"
          value={formData.missionType}
          onChange={(v)=>updateField("missionType",v)}
          options={[
            "Defense",
            "Disaster Response",
            "Medical",
            "Logistics",
            "Cyber"
          ]}
        />

        <Select
          label="Environment"
          value={formData.environment}
          onChange={(v)=>updateField("environment",v)}
          options={[
            "Urban",
            "Rural",
            "Forest",
            "Mountain",
            "Coastal",
            "Desert"
          ]}
        />

        <Select
          label="Priority"
          value={formData.priority}
          onChange={(v)=>updateField("priority",v)}
          options={[
            "Low",
            "Medium",
            "High",
            "Critical"
          ]}
        />

        <Select
          label="Risk Tolerance"
          value={formData.riskTolerance}
          onChange={(v)=>updateField("riskTolerance",v)}
          options={[
            "Low",
            "Medium",
            "High"
          ]}
        />

      </div>

    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div>

      <label className="mb-2 block font-medium">
        {label}
      </label>

      <select
        value={value}
        onChange={(e)=>onChange(e.target.value)}
        className="w-full rounded-xl border p-3"
      >
        {options.map(option=>(
          <option key={option}>
            {option}
          </option>
        ))}
      </select>

    </div>
  );
}

export default MissionStep;