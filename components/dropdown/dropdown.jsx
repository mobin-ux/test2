import { createElement, useEffect, useRef, useState } from "react";
import { Transition, Menu } from "@headlessui/react";
import { DropdownItem } from "../index";
import { useClickedOutside } from "../../hooks/useClickedOutside";

const Dropdown = ({ children, options = [], isOpen = false }) => {
  const { open, ref, handleOpen, handleClose } = useClickedOutside();
  const child = createElement(
    "div",
    {
      onClick: open ? handleClose : handleOpen,
    },
    children
  );

  return (
    <div className="relative z-10" ref={ref}>
      {child}
      <Transition
        show={open || isOpen}
        enter="transition ease-out duration-150"
        enterFrom="transform opacity-0 scale-0"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-150 scale-100"
        leaveTo="transform opacity-0 scale-0"
      >
        <div className={`absolute right-0`}>
          <div className="shadow-lg rounded-xl overflow-hidden whitespace-nowrap max-w-max">
            {options.map((option, index) => (
              <div key={index}>
                <DropdownItem
                  key={option.title}
                  {...option}
                  onClick={() => {
                    option.onClick();
                    handleClose();
                  }}
                />
                {index + 1 < options.length && (
                  <div className="w-full h-px bg-gray-100" />
                )}
              </div>
            ))}
          </div>
        </div>
      </Transition>
    </div>
  );
};

export { Dropdown };
