import React from "react";

const ClockIcon = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <g fill="none" stroke="#3e3939" strokeWidth="2">
          <circle cx="12" cy="12" r="7" />
          <path
            strokeLinecap="round"
            d="M5.965 3.136a4 4 0 0 0-2.829 2.829m14.899-2.829a4 4 0 0 1 2.829 2.829M12 8v3.75c0 .138.112.25.25.25H15"
          />
        </g>
      </svg>
    </div>
  );
};

export default ClockIcon;
