import React from "react";
import Task from "./Task";

function BoardColumn({ column }) {
  const columnID = column._id;
  return (
    <div className="mt-6 px-4 flex-shrink-0 mb-6">
      <div className="flex items-center space-x-2 ">
        <div className="w-5 h-5 rounded-full bg-[#49C4E5]"></div>
        <h2 className="text-paleGrey font-bold uppercase text-[12px]">
          {column?.name}
          <span> ({column?.tasks.length})</span>
        </h2>
      </div>
      <div className="flex flex-col space-y-6 mt-6">
        {column?.tasks.map((task) => (
          <Task key={task._id} task={task} columnID={columnID} />
        ))}
      </div>
    </div>
  );
}

export default BoardColumn;
