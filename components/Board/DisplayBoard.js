import React from "react";
import { useSelector } from "react-redux";
import BoardColumn from "./BoardColumn";
import Task from "./Task";

function DisplayBoard() {
  const selectedBoard = useSelector((state) => state.board.selectedBoard);
  console.log(selectedBoard);
  const board = selectedBoard?.columns[0];
  console.log(board);

  return (
    <div className="flex overflow-x-auto w-full">
      {selectedBoard?.columns.map(
        (column) => (
          console.log(column),
          (<BoardColumn key={column._id} column={column} />)
        )
      )}
      <div className="mt-6 px-4 flex-shrink-0 pb-6 flex justify-center items-center w-[300px] bg-gradient-to-b from-[#E9EFFA] to-[#E9EFFA]/50 rounded-md">
        <button className="text-2xl hover:text-primaryPurple transition-all duration-200 ease-in">
          + new column
        </button>
      </div>
    </div>
  );
}

export default DisplayBoard;
