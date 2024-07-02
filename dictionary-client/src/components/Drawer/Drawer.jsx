import React, { memo } from "react";
import Button from "../Button/Button";
import { twMerge } from "tailwind-merge";

const Drawer = ({ children, title, style, onClose }) => {
  return (
    <div className="fixed inset-0 z-40 overflow-y-auto bg-white">
      <div className="flex items-center px-6 py-4 border-b border-solid border-[#0505050f]">
        <Button
          handleOnclick={() => onClose()}
          style="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 border-none flex items-center justify-center"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </Button>
        <span className="ml-2 text-[18px] font-bold">{title}</span>
      </div>
      <div className={twMerge(`px-8 py-4 ${style ? style : ""}`)}>
        {children}
      </div>
    </div>
  );
};

export default memo(Drawer);
