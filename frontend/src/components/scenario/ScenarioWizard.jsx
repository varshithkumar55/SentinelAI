import StepIndicator from "./StepIndicator";

function ScenarioWizard({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  onSubmit,
  loading,
  children,
}) {
  return (
    <div className="space-y-8">

      <StepIndicator
        currentStep={currentStep}
      />

      <div className="rounded-3xl bg-surface p-8 shadow-sm">

        {children}

      </div>

      <div className="flex items-center justify-between border-t pt-6">

        <button
          type="button"
          onClick={onPrevious}
          disabled={currentStep === 0 || loading}
          className="rounded-xl border border-slate-300 px-6 py-3 font-semibold transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          ← Previous
        </button>

        <div className="text-sm font-medium text-slate-500">
          Step {currentStep + 1} of {totalSteps}
        </div>

        {currentStep === totalSteps - 1 ? (
          <button
            type="button"
            onClick={onSubmit}
            disabled={loading}
            className="rounded-xl bg-blue-900 px-8 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:opacity-60"
          >
            {loading
              ? "Generating AI Strategy..."
              : "Generate AI Strategy"}
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            className="rounded-xl bg-blue-900 px-8 py-3 font-semibold text-white transition hover:bg-blue-800"
          >
            Next →
          </button>
        )}

      </div>

    </div>
  );
}

export default ScenarioWizard;