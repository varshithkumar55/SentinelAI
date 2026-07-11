function ConstraintStep({ formData, setFormData }) {

  const updateField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (

    <div className="space-y-8">

      <div>

        <h2 className="text-3xl font-bold">
          Operational Constraints
        </h2>

        <p className="mt-2 text-slate-500">
          Define operational limitations and mission timeline.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div>

          <label className="mb-2 block font-medium">
            Start Date
          </label>

          <input
            type="date"
            value={formData.startDate}
            onChange={(e)=>updateField("startDate",e.target.value)}
            className="w-full rounded-xl border p-3"
          />

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Expected Duration
          </label>

          <input
            value={formData.duration}
            onChange={(e)=>updateField("duration",e.target.value)}
            placeholder="14 Days"
            className="w-full rounded-xl border p-3"
          />

        </div>

      </div>

      <div>

        <label className="mb-2 block font-medium">
          Operational Constraints
        </label>

        <textarea
          rows={5}
          value={formData.constraints}
          onChange={(e)=>updateField("constraints",e.target.value)}
          className="w-full rounded-xl border p-3"
        />

      </div>

      <div>

        <label className="mb-2 block font-medium">
          Additional Notes
        </label>

        <textarea
          rows={5}
          value={formData.notes}
          onChange={(e)=>updateField("notes",e.target.value)}
          className="w-full rounded-xl border p-3"
        />

      </div>

    </div>

  );

}

export default ConstraintStep;