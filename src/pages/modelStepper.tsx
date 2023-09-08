import React, { useState } from "react";
import StepperDialog from "../components/ui/dialog/stepperDialog";

interface ModalStepperProps {}

const ModalStepper: React.FC<ModalStepperProps> = () => {
  const [open, setOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["Select Printer", "Add a new printer", "Upload file"]; // You can merge steps and stepContents together using js object rather than using two different vars

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const addNewPrinterUI = () => (
    <div key={steps[0]}>
      <div className="text-left">
        <label
          htmlFor="name"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Name
        </label>
        <div className="mt-2">
          <input
            id="name"
            name="name"
            type="name"
            autoComplete="name"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  p-2"
          />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => alert("Added")}
          type="button"
          className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Add
        </button>
        <button
          onClick={() => setOpen(false)}
          type="button"
          className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold  text-primary shadow-sm ring-1 ring-inset ring-primary-300 hover:bg-gray-50 border-primary outline-primary"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const selectPrinterUI = () => {
    return (
      <div className="mt-6">
        <fieldset className="text-left">
          <div className="bg-gray-100 px-4 py-2">
            <div className="relative flex items-start">
              <div className="flex h-6 items-center">
                <input
                  id="comments"
                  aria-describedby="comments-description"
                  name="comments"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
              </div>
              <div className="ml-3 text-sm leading-6">
                <label htmlFor="comments" className="font-medium text-gray-900">
                  Comments
                </label>
                <p id="comments-description" className="text-gray-500">
                  Get notified when someones posts a comment on a posting.
                </p>
              </div>
            </div>
            <div className="w-full h-[1px] bg-gray-200 my-2" />
            <div className="relative flex items-start">
              <div className="flex h-6 items-center">
                <input
                  id="candidates"
                  aria-describedby="candidates-description"
                  name="candidates"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
              </div>
              <div className="ml-3 text-sm leading-6">
                <label
                  htmlFor="candidates"
                  className="font-medium text-gray-900"
                >
                  Candidates
                </label>
                <p id="candidates-description" className="text-gray-500">
                  Get notified when a candidate applies for a job.
                </p>
              </div>
            </div>
            <div className="w-full h-[1px] bg-gray-200 my-2" />
            <div className="relative flex items-start">
              <div className="flex h-6 items-center">
                <input
                  id="offers"
                  aria-describedby="offers-description"
                  name="offers"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
              </div>
              <div className="ml-3 text-sm leading-6">
                <label htmlFor="offers" className="font-medium text-gray-900">
                  Offers
                </label>
                <p id="offers-description" className="text-gray-500">
                  Get notified when a candidate accepts or rejects an offer.
                </p>
              </div>
            </div>
          </div>
        </fieldset>
        <button
          onClick={() => alert("Added")}
          type="button"
          className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 mt-8"
        >
          Get Started
        </button>
        <p className="my-2" onClick={nextStep}>
          Can't find?{" "}
          <span className="text-blue-600 cursor-pointer">add new one</span>
        </p>
      </div>
    );
  };

  const stepContents = [
    selectPrinterUI(),
    addNewPrinterUI(),
    <div>Step 3 Content</div>,
  ];

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  //   const handleFinish = () => {
  //     setOpen(false);
  //     console.log("Modal Stepper finished");
  //   };

  return (
    <>
      <StepperDialog
        prevIcon={true}
        open={open}
        onClose={() => setOpen(false)}
        currentStep={currentStep}
        stepTitle={steps[currentStep]}
        //   onNext={nextStep}
        onPrev={prevStep}
        //   onFinish={handleFinish}
        steps={steps}
        stepContent={stepContents[currentStep]}
      />
    </>
  );
};

export default ModalStepper;
