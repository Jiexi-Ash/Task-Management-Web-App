import { useState, useEffect } from "react";
import Image from "next/image";
import { PlusIcon, EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import NavModal from "./NavModal";

function Navbar({ handleAddBoard, handleNavModal, isNavOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedBoard = useSelector((state) => state.board.selectedBoard);
  const boards = useSelector((state) => state.board.board);

  return (
    <header className="relative block bg-white px-4 py-5 shadow-sm border border-gray-50  md:hidden">
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
          <div className="">
            <button
              className="flex space-x-2 items-center font-bold text-[12px] font-PlusJakartaSans"
              onClick={() => handleNavModal()}
            >
              <span className="font-bold text-[18px]">
                {selectedBoard ? selectedBoard.boardName : ""}
              </span>
              <>
                {isNavOpen ? (
                  <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
                    <path
                      stroke="#635FC7"
                      strokeWidth="2"
                      fill="none"
                      d="M9 6 5 2 1 6"
                    />
                  </svg>
                ) : (
                  <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
                    <path
                      stroke="#635FC7"
                      strokeWidth="2"
                      fill="none"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                )}
              </>
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="btn bg-lightPurple/50 px-[10px] py-[4px]">
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
