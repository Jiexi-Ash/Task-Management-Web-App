import { useState, useEffect } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";

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

function DeleteBoard({ isDelete = false, handleDelete }) {
  const selectedBoard = useSelector((state) => state.board.selectedBoard);
  return (
    <Modal
      isOpen={isDelete}
      onRequestClose={() => handleDelete(false)}
      style={customStyles}
    >
      <div className=" m-6 w-full max-w-[300px] md:w-full md:max-w-[480px] transition duration-200 ease-in-out">
        <div className="">
          <h3 className="text-[18px] font-bold  text-primaryRed">
            Delete this board?
          </h3>

          <p className="mt-4 text-paleGrey font-medium text-[13px] text-left leading-6">
            {`Are you sure you want to delete the ‘${selectedBoard?.name}’ board? This action will remove all columns and tasks and cannot be reversed.`}
          </p>
        </div>
        <div className="flex flex-col space-y-5 pt-6 lg:flex-row lg:justify-between lg:items-center lg:space-x-4 lg:space-y-0">
          <button className="btn bg-primaryRed w-full ">Delete</button>
          <button className="btn text-primaryPurple  bg-primaryPurple/10 w-full ">
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteBoard;
