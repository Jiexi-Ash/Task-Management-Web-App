import React from "react";

function Task({ task }) {
  const completedSubTasks = task.subTasks.filter(
    (subTask) => subTask.isCompleted === true
  );
  const totalSubtasks = task.subTasks.length;

  return (
    <div className="px-4 py-6 bg-white rounded-lg shadow-md flex flex-col space-y-4  w-[300px] group cursor-pointer transition-all duration-200 ease-in">
      <h3 className="font-bold text-[15px] group-hover:text-primaryPurple">
        {task.title}
      </h3>
      <p className="flex space-x-2 text-paleGrey font-bold text-[12px]">
        <span>
          {completedSubTasks.length} of {totalSubtasks}
        </span>
        <span>subtasks</span>
      </p>
    </div>
  );
}

export default Task;
