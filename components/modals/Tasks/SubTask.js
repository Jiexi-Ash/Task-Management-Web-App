import { useState } from "react";

function SubTask({ submitChange, removeSubTask, index, subTask }) {
  const [value, setValue] = useState(subTask);

  const handleOnChange = (e) => {
    setValue({ ...value, title: e.target.value });
  };

  const handleFocusOut = (e) => {
    console.log(value);
    submitChange(value, index);
  };

  const handleRemoveSubTask = (e) => {
    e.preventDefault();
    removeSubTask(value.name);
  };

  return (
    <div className="flex items-center space-x-4">
      <input
        className="appearance-none border border-paleGrey/25 rounded w-full py-2 px-3 my-2  leading-tight focus:ring-0 focus:border-paleGrey/50 placeholder:text-gray-200  placeholder:text-[13px] "
        type="text"
        placeholder="e.g Take coffee break"
        value={value.title}
        onChange={handleOnChange}
        onBlur={handleFocusOut}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 cursor-pointer"
        onClick={handleRemoveSubTask}
      >
        <g fill="#828FA3" fillRule="evenodd">
          <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
          <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
        </g>
      </svg>
    </div>
  );
}

export default SubTask;
