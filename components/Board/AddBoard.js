import { useState, useEffect } from "react";
import Modal from "react-modal";
import BoardColumn from "./BoardColumn";
import { useDispatch } from "react-redux";
import { createBoard } from "redux/reducers/boardSlice";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

Modal.setAppElement("#react-modal");

function AddBoard({ isOpen, handleOpen }) {
  const dispatch = useDispatch();
  const [columns, setColumns] = useState([]);
  const [boardName, setBoardName] = useState("");

  const handleAddColumn = (e) => {
    e.preventDefault();
    setColumns([...columns, { name: "" }]);
    console.log(columns);
  };

  const removeColumn = (index) => {
    // splice the array at the index
    const newColumns = [...columns];
    newColumns.splice(index, 1);
    setColumns(newColumns);
  };
  const handleChange = (value, index) => {
    const newColumns = [...columns];
    newColumns[index] = value;
    setColumns(newColumns);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBoard({ boardName, boardColumns: columns }));
  };

  const getColumns = () => {
    return columns.map((column, index) => (
      <BoardColumn
        handleChange={handleChange}
        removeColumn={removeColumn}
        index={index}
        key={`${column.boardName}-${index}`}
        column={column}
      />
    ));
  };
  // useEffect(() => {
  //   getColumns();
  // }, [columns]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        style={customStyles}
        onRequestClose={() => handleOpen(false)}
      >
        <div className="flex justify-center items-center h-full">
          <div className="w-full max-w-[480px] p-4">
            <h3 className="capitalize font-bold text-[18px] text-primaryBlack">
              add new board
            </h3>
            <form className="bg-white">
              <div className="my-6">
                <label
                  htmlFor="boardName"
                  className="text-[12px] font-bold text-paleGrey pb-3"
                >
                  Board Name
                </label>
                <input
                  className="appearance-none border border-gray-200 rounded w-full py-2 px-3 my-2 font-medium  leading-tight focus:ring-0 focus:border-paleGrey placeholder:text-gray-300 placeholder:text-sm"
                  id="username"
                  type="text"
                  placeholder="e.g web Design"
                  onChange={(e) => setBoardName(e.target.value)}
                  value={boardName}
                />
              </div>
              <div className="mb-2">
                <p className="text-[12px] font-bold text-paleGrey">
                  Board Columns
                </p>
              </div>
              {getColumns()}

              <div className="">
                <button
                  className="btn bg-primaryPurple/10 py-2 w-full text-primaryPurple"
                  onClick={handleAddColumn}
                >
                  + add new column
                </button>
                <button
                  className="btn bg-primaryPurple py-2 w-full mt-8"
                  onClick={handleSubmit}
                >
                  create new board
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AddBoard;

{
  /* <form className="w-full ">
<div className="flex flex-col space-y-4 py-6">
  <div className=" flex flex-col space-y-2">
    <label
      htmlFor="boardName"
      className="text-[12px] font-bold text-paleGrey"
    >
      Board Name
    </label>
    <input
      type="text"
      name="boardName"
      id="boardName"
      className="border border-gray-300 rounded-md px-3 py-2 w-full"
    />
  </div>
</div>
</form> */
}
