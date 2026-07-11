const steps = [
  "Mission",
  "Resources",
  "Constraints",
  "AI Ready",
];

function StepIndicator({ currentStep }) {
  return (
    <div className="flex items-center justify-between">

      {steps.map((step, index) => {

        const completed = index < currentStep;
        const active = index === currentStep;

        return (

          <div
            key={step}
            className="flex flex-1 items-center"
          >

            <div className="flex flex-col items-center">

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full border-2 text-sm font-bold transition

                ${
                  completed
                    ? "border-green-600 bg-green-600 text-white"
                    : active
                    ? "border-blue-900 bg-blue-900 text-white"
                    : "border-slate-300 bg-white text-slate-500"
                }`}
              >

                {completed ? "✓" : index + 1}

              </div>

              <span
                className={`mt-3 text-sm font-medium

                ${
                  active
                    ? "text-blue-900"
                    : completed
                    ? "text-green-700"
                    : "text-slate-500"
                }`}
              >

                {step}

              </span>

            </div>

            {index !== steps.length - 1 && (

              <div
                className={`mx-4 h-1 flex-1 rounded-full

                ${
                  completed
                    ? "bg-green-600"
                    : "bg-slate-200"
                }`}
              />

            )}

          </div>

        );

      })}

    </div>
  );
}

export default StepIndicator;