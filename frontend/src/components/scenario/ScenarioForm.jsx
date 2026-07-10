import { useForm } from "react-hook-form";

function ScenarioForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-10 space-y-6 rounded-3xl bg-white p-8 shadow-sm"
    >
      <div>
        <label className="mb-2 block font-medium">
          Scenario Name
        </label>

        <input
          {...register("scenario")}
          className="w-full rounded-xl border border-slate-300 p-3"
          placeholder="Operation Falcon"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Mission Objective
        </label>

        <textarea
          {...register("objective")}
          rows="4"
          className="w-full rounded-xl border border-slate-300 p-3"
          placeholder="Describe the objective..."
        />
      </div>

      <button
        className="rounded-xl bg-blue-900 px-8 py-3 font-semibold text-white hover:bg-blue-800"
      >
        Analyze Scenario
      </button>
    </form>
  );
}

export default ScenarioForm;