import { useState } from "react";
import Image from "next/image";
import NavItem from "./NavItem";
import BoardsData from "data";

function SideNav() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelect = (index) => {
    setSelectedIndex(index);
  };
  return (
    <div className="hidden  shadow-sm pr-5 border border-gray-50 lg:w-[300px]  bg-white md:block">
      <div className="flex items-center space-x-0 py-8 px-[26px]">
        <div className="relative w-40 h-7">
          <Image src="/images/logo-dark.svg" layout="fill" alt="Kanban Logo" />
        </div>
      </div>
      <div className="py-[52px]">
        <p className="uppercase font-bold text-paleGrey tracking-[2.4px] text-[12px] px-[26px]">
          all boards <span>({BoardsData.boards.length})</span>
        </p>
        <ul className="flex flex-col pt-8 space-y-3">
          {BoardsData.boards.map((board, index) => (
            <NavItem
              key={board.id}
              board={board}
              index={index}
              selectedIndex={selectedIndex}
              onSelect={handleSelect}
            />
          ))}
          <li className=" flex space-x-4  py-[14px] px-[26px] rounded-r-full items-center">
            <svg
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-current text-primaryPurple"
            >
              <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
            </svg>
            <span className="font-bold text-[15px] leading-[19px] text-primaryPurple whitespace-nowrap">
              +Create new Board
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideNav;
