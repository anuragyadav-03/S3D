import "./stepper.css";
import { CheckIcon } from "@heroicons/react/24/outline";

interface StepperProps {
  steps: string[];
  currentStep: number;
  complete: boolean;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep, complete }) => {
  return (
    <>
      <div className="flex justify-between my-6">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i && "active"} ${
              (i < currentStep || complete) && "complete"
            } `}
          >
            <div className="step">
              {i < currentStep || complete ? (
                <CheckIcon className="h-4 w-4" />
              ) : (
                i + 1
              )}
            </div>
            <p className="text-gray-500 text-xs mt-[2px]">{step}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Stepper;
