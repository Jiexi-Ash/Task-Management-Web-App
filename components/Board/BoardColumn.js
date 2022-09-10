import { useState } from "react";

function BoardColumn({ handleChange, removeColumn, index, column }) {
  const [value, setValue] = useState(column);

  const handleInputChange = (e) => {
    setValue({ name: e.target.value });
  };
  const handleFocus = (e) => {
    handleChange(value, index);
  };

  const handleRemove = () => {
    removeColumn(index);
  };

  return (
    <div className="flex items-center space-x-4">
      <input
        className="appearance-none border border-gray-200 rounded w-full py-2 px-3 my-2  leading-tight focus:ring-0 focus:border-paleGrey placeholder:text-gray-300  placeholder:text-sm"
        id="username"
        type="text"
        placeholder="Column Name"
        onChange={handleInputChange}
        value={value.name}
        onBlur={handleFocus}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 cursor-pointer"
        onClick={handleRemove}
      >
        <g fill="#828FA3" fillRule="evenodd">
          <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
          <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
        </g>
      </svg>
    </div>
  );
}

export default BoardColumn;
