import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import React from "react";

function HeaderHome() {
  return (
    <div className="hidden justify-between items-center py-5 px-7 bg-white md:flex">
      <div>
        <p className="text-[20px] font-bold">Platform Launch</p>
      </div>
      <div className="flex items-center space-x-4">
        <button className="btn bg-lightPurple/50">+add new task</button>
        <div className="w-6 h-6 relative cursor-pointer">
          <EllipsisVerticalIcon />
        </div>
      </div>
    </div>
  );
}

export default HeaderHome;
