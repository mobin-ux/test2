import { useEffect, useRef, useState } from "react";
import { useClickedOutside } from "../../hooks/useClickedOutside";
import { DropdownItem } from "../index";
import { Transition } from "@headlessui/react";

const Select = ({ placeholder, options = {}, onChange, className = "" }) => {
  const { open, ref, handleClose, handleOpen } = useClickedOutside();
  const [value, setValue] = useState("");
  const handleOnChange = (option) => () => {
    setValue(options[option]);
    handleClose();
  };
  const toggleMenu = () => (open ? handleClose() : handleOpen());
  const img = `/img/chevron-${open ? "up" : "down"}.svg`;
  return (
    <div ref={ref} className={`relative ${className}`}>
      <div
        className={`flex rounded-xl border py-4 px-4 cursor-pointer`}
        onClick={toggleMenu}
      >
        <input
          value={value}
          onClick={toggleMenu}
          placeholder={placeholder}
          onChange={onChange}
          readOnly
          className="outline-none flex-1 cursor-pointer"
        />
        <img onClick={toggleMenu} width={20} src={img} alt="arrow" />
      </div>

      <Transition
        show={open}
        enter="transition-gpu ease-in duration-150"
        enterFrom="transform opacity-0"
        enterTo="transform opacity-100"
        leave="transition ease-out duration-150"
        leaveFrom="transform opacity-100"
        leaveTo="transform opacity-0"
      >
        <div className={`absolute top-16 left-0`}>
          <div className="shadow-lg rounded-xl border overflow-hidden whitespace-nowrap max-w-max">
            {Object.keys(options).map((option, index) => (
              <div key={index}>
                <DropdownItem
                  title={options[option]}
                  onClick={handleOnChange(option)}
                />
                {index + 1 < Object.keys(options).length && (
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

export { Select };
