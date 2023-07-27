import React from "react";
import { Dialog, Transition } from "@headlessui/react";

type Props = {
  onClose: () => void;
};

const WelcomeMsg: React.FC<Props> = ({ onClose }) => {
  return (
    <Transition show={true} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center"
        onClose={onClose}
      >
        <div className="px-4 text-center relative">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />
          <div className="inline-block max-w-md p-6 my-8 overflow-hidden text-center align-middle transition-all transform bg-white shadow-xl rounded-xl">
            <h3 className="text-xl font-semibold text-black mb-2">
             Use the &ldquo;Add Workout&rdquo; button above to get started.

            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              More features coming soon!🌞
            </p>

            <button
              onClick={onClose}
              className="mt-4 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
            >
              OK
            </button>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default WelcomeMsg;
