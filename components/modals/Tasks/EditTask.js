import { useState, useEffect } from "react";
import Modal from "react-modal";
import SubTask from "./SubTask";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateSubTask, updateTask } from "redux/reducers/boardSlice";

Modal.setAppElement("#react-modal");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    border: "1px solid #E5E7EB",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

function EditTask({ task = {}, handleEdit, isEdit, columnID }) {
  const dispatch = useDispatch();
  const [subTaskID, setSubTaskID] = useState("");
  const selectedBoard = useSelector((state) => state.board.selectedBoard);
  const completedSubTasks = task.subTasks.filter(
    (subTask) => subTask.isCompleted === true
  );
  const totalTasks = task.subTasks.length;

  const handleSelect = (e) => {
    console.log(e.target.value);
    const taskData = {
      updateColumnID: e.target.value,
      boardID: selectedBoard._id,
      columnID: columnID,
      taskID: task._id,
    };
    console.log(taskData);
    dispatch(updateTask(taskData));
    // setColumnID(e.target.value);
    // // set the status to the column name
    // setStatus(e.target.options[e.target.selectedIndex].text);
  };
  const handleAddSubTask = (e) => {};
  const submitChange = (value, index) => {};

  const removeSubTask = (name) => {};
  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {};
  };

  const handleCheck = (e, subTaskID) => {
    const taskData = {
      columnID,
      boardID: selectedBoard._id,
      taskID: task._id,
      subTaskID,
      isCompleted: e.target.checked,
    };
    console.log(taskData);
    dispatch(updateSubTask(taskData));
    // close the modal
    handleEdit(false);
  };

  return (
    <Modal
      isOpen={isEdit}
      onRequestClose={() => handleEdit(false)}
      style={customStyles}
    >
      <div className=" my-6 w-[343px] md:w-[480px] transition duration-200 ease-in-out">
        <div className="m-6 flex items-center justify-between">
          <h3 className="capitalize font-bold text-[18px] text-primaryBlack mr-4">
            {task?.title}
          </h3>
          <span>
            <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
              <g fill="#828FA3" fillRule="evenodd">
                <circle cx="2.308" cy="2.308" r="2.308" />
                <circle cx="2.308" cy="10" r="2.308" />
                <circle cx="2.308" cy="17.692" r="2.308" />
              </g>
            </svg>
          </span>
          {/* <div className="absolute bg-red-500 px-4 py-4 top-10 -right-20 w-full max-w-[200px] rounded">
            <ul className="flex flex-col space-y-3">
              <li className="text-[13px]">Edit Task</li>
              <li className="text-[13px]">Delete task</li>
            </ul>
          </div> */}
        </div>
        <div className="m-6">
          <p className="text-paleGrey text-[13px] leading-6">
            {task?.description}
          </p>
        </div>
        <p className="m-6 text-xs text-paleGrey font-bold">
          Subtasks (
          <span>
            {completedSubTasks.length} of {totalTasks}
          </span>
          )
        </p>

        {task.subTasks.map((subTask, index) => (
          <div
            key={subTask._id}
            className="mx-6 my-1 bg-lightishGrey2 rounded-sm px-3 py-[14px]"
          >
            <div>
              <div className="flex items-center space-x-2">
                <input
                  className=" appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  value={subTask.isCompleted}
                  checked={subTask.isCompleted}
                  onChange={(e) => handleCheck(e, subTask._id)}
                />
                {subTask.isCompleted ? (
                  <p className="text-[13px] text-paleGrey line-through">
                    {subTask.title}
                  </p>
                ) : (
                  <p className="text-[13px] text-paleGrey">{subTask.title}</p>
                )}
              </div>
            </div>
          </div>
        ))}
        <div className="m-6 flex flex-col space-y-4">
          <p className="text-paleGrey text-[12px]  font-bold">Current Status</p>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-paleGrey/50 block w-full p-2.5 "
            onChange={handleSelect}
          >
            {/* add default option */}
            <option defaultValue={task.status}>{task.status}</option>

            {selectedBoard &&
              selectedBoard.columns.map((column) => (
                <option key={column._id} value={column._id}>
                  {column.name}
                </option>
              ))}
          </select>
        </div>
      </div>
    </Modal>
  );
}

export default EditTask;
