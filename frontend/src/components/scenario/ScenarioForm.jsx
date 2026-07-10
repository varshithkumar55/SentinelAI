import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { analyzeScenario } from "../../services/api/scenarioApi";
function ScenarioForm() {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

const onSubmit = async (data) => {
  try {
    const result = await analyzeScenario(data);

    console.log(result);

    navigate("/results", {
      state: result,
    });

  } catch (error) {
    console.error(error);
    alert("Analysis failed.");
  }
};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-10 rounded-3xl bg-white p-8 shadow-sm space-y-8"
    >
      {/* Basic Information */}

      <section>
        <h2 className="mb-6 text-2xl font-bold">
          Basic Information
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <label className="mb-2 block font-medium">
              Scenario Name
            </label>

            <input
              {...register("scenario")}
              className="w-full rounded-xl border p-3"
              placeholder="Operation Falcon"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Mission Name
            </label>

            <input
              {...register("mission")}
              className="w-full rounded-xl border p-3"
              placeholder="Border Surveillance"
            />
          </div>

        </div>

        <div className="mt-6">
          <label className="mb-2 block font-medium">
            Mission Objective
          </label>

          <textarea
            {...register("objective")}
            rows={5}
            className="w-full rounded-xl border p-3"
            placeholder="Describe the objective..."
          />
        </div>
      </section>

      {/* Mission Settings */}

      <section>

        <h2 className="mb-6 text-2xl font-bold">
          Mission Settings
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <Select
            label="Mission Type"
            register={register}
            name="missionType"
            options={[
              "Defense",
              "Disaster Response",
              "Medical",
              "Logistics",
              "Cyber",
            ]}
          />

          <Select
            label="Environment"
            register={register}
            name="environment"
            options={[
              "Urban",
              "Rural",
              "Forest",
              "Mountain",
              "Coastal",
              "Desert",
            ]}
          />

          <Select
            label="Priority"
            register={register}
            name="priority"
            options={[
              "Low",
              "Medium",
              "High",
              "Critical",
            ]}
          />

          <Select
            label="Risk Tolerance"
            register={register}
            name="riskTolerance"
            options={[
              "Low",
              "Medium",
              "High",
            ]}
          />

        </div>

      </section>

      {/* Resources */}

      <section>

        <h2 className="mb-6 text-2xl font-bold">
          Available Resources
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <Input
            label="Personnel"
            register={register}
            name="personnel"
          />

          <Input
            label="Vehicles"
            register={register}
            name="vehicles"
          />

          <Input
            label="Equipment"
            register={register}
            name="equipment"
          />

          <Input
            label="Budget"
            register={register}
            name="budget"
          />

        </div>

      </section>

      {/* Constraints */}

      <section>

        <h2 className="mb-6 text-2xl font-bold">
          Operational Constraints
        </h2>

        <textarea
          {...register("constraints")}
          rows={4}
          className="w-full rounded-xl border p-3"
          placeholder="Describe constraints..."
        />

      </section>

      {/* Timeline */}

      <section>

        <h2 className="mb-6 text-2xl font-bold">
          Timeline
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block font-medium">
              Start Date
            </label>

            <input
              type="date"
              {...register("startDate")}
              className="w-full rounded-xl border p-3"
            />

          </div>

          <Input
            label="Expected Duration"
            register={register}
            name="duration"
          />

        </div>

      </section>

      {/* Notes */}

      <section>

        <h2 className="mb-6 text-2xl font-bold">
          Additional Notes
        </h2>

        <textarea
          {...register("notes")}
          rows={4}
          className="w-full rounded-xl border p-3"
        />

      </section>

      <button
        className="w-full rounded-xl bg-blue-900 py-4 text-lg font-semibold text-white transition hover:bg-blue-800"
      >
        Analyze Scenario with AI
      </button>

    </form>
  );
}

function Input({ label, register, name }) {
  return (
    <div>
      <label className="mb-2 block font-medium">
        {label}
      </label>

      <input
        {...register(name)}
        className="w-full rounded-xl border p-3"
      />
    </div>
  );
}

function Select({ label, register, name, options }) {
  return (
    <div>
      <label className="mb-2 block font-medium">
        {label}
      </label>

      <select
        {...register(name)}
        className="w-full rounded-xl border p-3"
      >
        {options.map((option) => (
          <option key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ScenarioForm;