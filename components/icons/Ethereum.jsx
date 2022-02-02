import React from 'react';
const Ethereum = ({ size = 42 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_25_1334)">
        <path
          d="M20.4173 40.8649C31.7018 40.8649 40.8497 31.717 40.8497 20.4324C40.8497 9.14791 31.7018 0 20.4173 0C9.13278 0 -0.0151367 9.14791 -0.0151367 20.4324C-0.0151367 31.717 9.13278 40.8649 20.4173 40.8649Z"
          fill="#899EF0"
        />
        <path
          d="M21.0527 5.10811V16.4353L30.6266 20.7134L21.0527 5.10811Z"
          fill="white"
          fillOpacity="0.602"
        />
        <path
          d="M21.0527 5.10811L11.4775 20.7134L21.0527 16.4353V5.10811Z"
          fill="white"
        />
        <path
          d="M21.0527 28.0537V35.7504L30.633 22.4961L21.0527 28.0537Z"
          fill="white"
          fillOpacity="0.602"
        />
        <path
          d="M21.0527 35.7504V28.0525L11.4775 22.4961L21.0527 35.7504Z"
          fill="white"
        />
        <path
          d="M21.0527 26.2723L30.6266 20.7134L21.0527 16.4379V26.2723Z"
          fill="white"
          fillOpacity="0.2"
        />
        <path
          d="M11.4775 20.7134L21.0527 26.2723V16.4379L11.4775 20.7134Z"
          fill="white"
          fillOpacity="0.602"
        />
      </g>
      <defs>
        <clipPath id="clip0_25_1334">
          <rect width="42" height="42" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export { Ethereum };
