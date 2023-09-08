import React, { ReactNode, useRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowSmallLeftIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Stepper from "../stepper/stepper";
import "./stepperDialog.css";

interface StepperDialogProps {
  prevIcon?: boolean;
  open: boolean;
  onClose: () => void;
  stepTitle: string;
  currentStep: number;
  // onNext: (e: React.MouseEvent<HTMLElement>) => void;
  onPrev: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
  // onFinish: (e: React.MouseEvent<HTMLElement>) => void;
  steps: string[];
  stepContent: ReactNode; // Content for the current step
}

const StepperDialog: React.FC<StepperDialogProps> = ({
  open,
  onClose,
  currentStep,
  // onNext,
  onPrev,
  // onFinish,
  stepTitle,
  stepContent,
  steps,
}) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as="div"
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="">
                <div className="bg-white relative transform overflow-hidden rounded-lg px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 md:min-w-[40vw]">
                  {/* Prev Icon Button */}
                  {currentStep > 0 && (
                    <div className="mx-auto flex h-12 w-12 items-center justify-center  absolute left-0 top-0">
                      <ArrowSmallLeftIcon
                        onClick={onPrev}
                        className="h-6 w-6 text-primary"
                        aria-hidden="true"
                      />
                    </div>
                  )}

                  {/* Close Icon For Ref */}
                  <div className="mx-auto flex h-12 w-12 items-center justify-center  absolute right-0 top-0">
                    <XCircleIcon
                      onClick={onClose}
                      className="h-6 w-6 text-primary"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="mt-3 text-center sm:mt-2">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-semibold leading-6 text-gray-900"
                    >
                      {stepTitle}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{stepContent}</p>
                    </div>
                  </div>

                  {/* Buttons for prev and next */}
                  {/* <div className="mt-5 sm:mt-6 flex gap-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    onClick={onPrev}
                  >
                    Prev
                  </button>
                  {currentStep < steps.length - 1 ? (
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                      onClick={onNext}
                      ref={cancelButtonRef}
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                      onClick={onFinish}
                      ref={cancelButtonRef}
                    >
                      Finish
                    </button>
                  )}
                </div> */}
                </div>

                <div className="stepItem absolute bottom-10 left-[50%] translate-x-[-50%]">
                  {steps.map((_, index: number) => {
                    console.log(currentStep, index, "test");
                    return (
                      <div
                        key={index}
                        className={`singleStep ${
                          currentStep === index && "activeStep"
                        } ${index < currentStep && "completeStep"}`}
                      ></div>
                    );
                  })}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default StepperDialog;
