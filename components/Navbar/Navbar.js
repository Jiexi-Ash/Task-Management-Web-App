import { useState, useEffect } from "react";
import Image from "next/image";
import { PlusIcon, EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";

function Navbar({ handleOpen }) {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const boards = useSelector((state) => state.board.boards);

  useEffect(() => {
    console.log(boards);
  }, [boards]);
  return (
    <header className="block bg-white px-4 py-5 shadow-sm border border-gray-50  md:hidden">
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
            <button className="font-bold text-[12px] font-PlusJakartaSans">
              Platform Launch
            </button>
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
          <button
            className="btn bg-lightPurple/50 px-[18px] py-[10px]"
            onClick={() => handleOpen(true)}
          >
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
