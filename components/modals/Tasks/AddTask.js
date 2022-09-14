import { useState, useEffect } from "react";
import Modal from "react-modal";
import SubTask from "./SubTask";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateBoardColumn } from "redux/reducers/boardSlice";

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

function AddTask({ isTask, handleTask, boards = [] }) {
  const dispatch = useDispatch();
  const selectedBoard = useSelector((state) => state.board.selectedBoard);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [subTasks, setSubTasks] = useState([{ title: "", isCompleted: false }]);
  const [columnID, setColumnID] = useState("");
  const [status, setStatus] = useState(selectedBoard?.columns[0].name);

  const handleSelect = (e) => {
    console.log(e.target.value);
    setColumnID(e.target.value);
    // set the status to the column name
    setStatus(e.target.options[e.target.selectedIndex].text);
  };
  const handleAddSubTask = (e) => {
    e.preventDefault();
    setSubTasks([...subTasks, { title: "", isCompleted: false }]);
  };
  const submitChange = (value, index) => {
    const newSubTasks = [...subTasks];
    newSubTasks[index] = value;
    setSubTasks(newSubTasks);
  };

  const removeSubTask = (name) => {
    const newSubTasks = [...subTasks];
    newSubTasks.splice(name, 1);
    setSubTasks(newSubTasks);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      tasks: {
        title: taskTitle,
        description: taskDescription,
        status,
        subTasks,
      },
      boardID: selectedBoard._id,
      columnID: columnID,
    };

    console.log(taskData);

    axios
      .patch("/api/tasks/addTask", taskData)
      .then((res) => {
        console.log(res);
        dispatch(updateBoardColumn(res.data));
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        handleTask(false);
      });
  };

  return (
    <Modal
      isOpen={isTask}
      onRequestClose={() => handleTask(false)}
      style={customStyles}
    >
      <div className="my-6 w-[343px] md:w-[480px] transition duration-200 ease-in-out">
        <div className="m-6">
          <h3 className="capitalize font-bold text-[18px] text-primaryBlack">
            add new task
          </h3>
        </div>
        <form className="mx-6">
          <div className="flex flex-col mb-6">
            <label className="text-[12px] font-bold text-paleGrey">Title</label>
            <input
              className="appearance-none border border-paleGrey/25 rounded w-full py-2 px-3 my-2  leading-tight focus:ring-0 focus:border-paleGrey/50 placeholder:text-gray-200  placeholder:text-[13px] "
              type="text"
              placeholder="e.g Take coffee break"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-6">
            <label className="text-[12px] font-bold text-paleGrey">
              Description
            </label>
            <textarea
              className="appearance-none border border-paleGrey/25 rounded w-full py-2 px-3 my-2  leading-tight focus:ring-0 focus:border-paleGrey/50 placeholder:text-gray-200  placeholder:text-[13px] "
              type="text"
              placeholder="e.g Take coffee break"
              rows="4"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[12px] font-bold text-paleGrey">
              SubTasks
            </label>
            {subTasks.map((task, index) => (
              <SubTask
                key={`task-${index}`}
                submitChange={submitChange}
                index={index}
                removeSubTask={removeSubTask}
                subTask={task}
              />
            ))}
          </div>
          <button
            className="btn bg-lightPurple w-full"
            onClick={handleAddSubTask}
          >
            + add new subtask
          </button>
          <div className="my-6 flex flex-col">
            <label className="text-[12px] font-bold text-paleGrey">
              Status
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-paleGrey/50 block w-full p-2.5 "
              onChange={handleSelect}
            >
              {selectedBoard &&
                selectedBoard.columns.map((column) => (
                  <option key={column._id} value={column._id}>
                    {column.name}
                  </option>
                ))}
            </select>
          </div>
          <button
            className="btn bg-primaryPurple w-full"
            onClick={handleSubmit}
          >
            create new task
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default AddTask;
