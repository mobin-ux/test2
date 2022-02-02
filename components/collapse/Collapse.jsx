import React from "react";
import { Collapse } from "react-collapse";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import { Transition } from "@headlessui/react";
const Collpase = ({ title, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
      <div className="flex justify-center items-center gap-2" onClick={toggle}>
        <span>{title}</span>
        {!isOpen ? (
          <ChevronDownIcon className="h-5 w-5" />
        ) : (
          <ChevronUpIcon className="h-5 w-5" />
        )}
      </div>
      <Collapse isOpened={isOpen} className={`${isOpen ? "open" : ""}`}>
        <Transition
          show={isOpen}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="flex flex-col">{children}</div>
        </Transition>
      </Collapse>
    </>
  );
};

export { Collpase };
