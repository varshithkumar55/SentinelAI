import { useState } from "react";

import StepIndicator from "./StepIndicator";

function ScenarioWizard({ children }) {

  const [step, setStep] = useState(0);

  const pages = Array.isArray(children)
    ? children
    : [children];

  return (

    <div>

      <StepIndicator currentStep={step} />

      <div className="rounded-3xl bg-white p-8 shadow-sm">

        {pages[step]}

      </div>

      <div className="mt-8 flex justify-between">

        <button
          disabled={step === 0}
          onClick={() => setStep(step - 1)}
          className="rounded-xl border px-6 py-3 disabled:opacity-40"
        >
          Previous
        </button>

        {step !== pages.length - 1 ? (

          <button
            onClick={() => setStep(step + 1)}
            className="rounded-xl bg-blue-900 px-6 py-3 font-semibold text-white"
          >
            Next
          </button>

        ) : (

          <button
            className="rounded-xl bg-green-700 px-6 py-3 font-semibold text-white"
          >
            Analyze Scenario
          </button>

        )}

      </div>

    </div>

  );
}

export default ScenarioWizard;