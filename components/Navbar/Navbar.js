import React from "react";
import Image from "next/image";
import { PlusIcon, EllipsisVerticalIcon } from "@heroicons/react/24/solid";
function Navbar() {
  return (
    <header className="block bg-white px-4 py-5 shadow-sm md:hidden">
      <nav className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="w-6 min-h-[25px] relative cursor-pointer">
            <Image
              src="/images/logo-mobile.svg"
              layout="fill"
              alt="Kanban Logo"
              objectFit="contain"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-bold text-[12px] font-PlusJakartaSans">
              Platform Launch
            </span>
            <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
              <path
                stroke="#635FC7"
                strokeWidth="2"
                fill="none"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-lightPurple/50 px-[18px] py-[10px] rounded-full">
            <PlusIcon className="w-6 h-6 text-white" />
          </button>
          <div className="w-6 h-6 relative cursor-pointer">
            <EllipsisVerticalIcon />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
