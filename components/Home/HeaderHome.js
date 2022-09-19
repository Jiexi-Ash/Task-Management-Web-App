import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useSelector } from "react-redux";

function HeaderHome({ handleTask, handleDelete }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectedBoard = useSelector((state) => state.board.selectedBoard);

  const handleBoardOptions = () => {
    setIsOpen(!isOpen);
  };

  const handleDeleteBoard = () => {
    console.log("delete board");
    handleDelete(true);
  };

  const handleEditBoard = () => {
    console.log("edit board");
  };
  return (
    <div className="hidden relative justify-between items-center py-5 px-7 bg-white md:flex">
      <div>
        <p className="text-[20px] font-bold">
          {selectedBoard ? selectedBoard.name : ""}
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <button
          className="btn bg-lightPurple/50"
          onClick={() => handleTask(true)}
        >
          +add new task
        </button>
        <div
          className="w-6 h-6 relative cursor-pointer"
          onClick={handleBoardOptions}
        >
          <EllipsisVerticalIcon />
        </div>
        {isOpen && (
          <div className="absolute top-20 right-9 bg-white shadow rounded p-4 w-full max-w-[190px]">
            <ul className="flex flex-col space-y-4">
              <li
                className="text-xs font-medium text-paleGrey capitalize cursor-pointer"
                onClick={handleEditBoard}
              >
                edit board
              </li>
              <li
                className="text-xs font-medium text-red-600 capitalize cursor-pointer"
                onClick={handleDeleteBoard}
              >
                delete board
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeaderHome;
