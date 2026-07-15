import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ScenarioWizard from "./ScenarioWizard";

import MissionStep from "./MissionStep";
import ResourceStep from "./ResourceStep";
import ConstraintStep from "./ConstraintStep";
import ReviewStep from "./ReviewStep";

import { analyzeScenario } from "../../services/api/scenarioApi";
import { createMission } from "../../services/missionService";
function ScenarioForm() {

  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({

    scenario: "",
    mission: "",
    objective: "",

    missionType: "Defense",
    environment: "Urban",
    priority: "Medium",
    riskTolerance: "Medium",

    personnel: "",
    vehicles: "",
    equipment: "",
    budget: "",

    constraints: "",
    startDate: "",
    duration: "",
    notes: ""

  });

  const totalSteps = 4;

  function validateStep() {

    switch (currentStep) {

      case 0:

        return (
          formData.scenario.trim() &&
          formData.mission.trim() &&
          formData.objective.trim()
        );

      case 1:

        return (
          formData.personnel &&
          formData.vehicles &&
          formData.equipment &&
          formData.budget
        );

      case 2:

        return (
          formData.constraints &&
          formData.duration
        );

      default:

        return true;

    }

  }

  function nextStep() {

    if (!validateStep()) {
      toast("Please complete all required fields.");
      

      return;

    }

    setCurrentStep((prev) =>

      Math.min(prev + 1, totalSteps - 1)

    );

  }

  function previousStep() {

    setCurrentStep((prev) =>

      Math.max(prev - 1, 0)

    );

  }

  async function submitScenario() {

    try {

      setLoading(true);

      const result = await analyzeScenario(formData);

      await createMission({

      title: formData.mission,

      mission_type: formData.missionType,

      scenario: formData.scenario,

      ai_response:
        result.summary ||
        result.executive_summary ||
        "AI Analysis Completed",

      recommendation:
        result.recommended_strategy || "",

      confidence:
        Number(result.confidence) || 0,

      risk_level:
        result.risk_level || "Low",

      status: "Completed",

    });

      navigate("/results", {
        state: result,
      });

    } catch (error) {

      console.error(error);

      toast.error("AI analysis failed.");

    } finally {

      setLoading(false);

    }

  }

  function renderStep() {

    switch (currentStep) {

      case 0:

        return (

          <MissionStep

            formData={formData}
            setFormData={setFormData}

          />

        );

      case 1:

        return (

          <ResourceStep

            formData={formData}
            setFormData={setFormData}

          />

        );

      case 2:

        return (

          <ConstraintStep

            formData={formData}
            setFormData={setFormData}

          />

        );

      case 3:

        return (

          <ReviewStep

            formData={formData}

          />

        );

      default:

        return null;

    }

  }

  return (

    <ScenarioWizard

      currentStep={currentStep}
      totalSteps={totalSteps}

      onNext={nextStep}

      onPrevious={previousStep}

      onSubmit={submitScenario}

      loading={loading}

    >

      {renderStep()}
          </ScenarioWizard>

  );

}

export default ScenarioForm;