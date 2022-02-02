import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

const Button = ({
  bordered,
  rounded,
  color = "primary",
  loading,
  fill,
  className,
  children,
  ...rest
}) => {
  const classes = classNames(
    {
      border: bordered,
      "border-payrue-blue": bordered && color === "primary",
      "rounded-xl": rounded,
      "rounded-sm": !rounded,
      "bg-payrue-blue": fill && color === "primary",
      "text-white": fill && color === "primary",
      "bg-blue-100": !fill && color === "primary",
      "text-payrue-blue": !fill && color === "primary",
      "text-payrue-blue": color === "primary" && loading && fill,
      [`text-${color}`]: color !== "primary",
      [`bg-${color}`]: color !== "primary",
      transition: true,
      "duration-200": true,
      "py-3": true,
      "px-4": true,
      "h-12": true,
      relative: true,
      "overflow-hidden": true,
    },
    className
  );

  return (
    <button disabled={loading} className={classes} {...rest}>
      {children}
      {loading && (
        <div className="inset-0 z-10 absolute flex justify-center items-center bg-blue-200">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-10"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
    </button>
  );
};

export { Button };
