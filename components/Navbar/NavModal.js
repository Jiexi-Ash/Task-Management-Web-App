import { useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import NavItem from "./NavItem";
import { setSelectedBoard } from "redux/reducers/boardSlice";

function NavModal({
  handleNavModal,
  boards = [],
  isNavOpen,
  handleAddBoardModal,
}) {
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelectBoard = (board, index) => {
    setSelectedIndex(index);
    dispatch(setSelectedBoard(board));
    handleNavModal();
  };

  const handleModals = () => {
    handleNavModal();
    handleAddBoardModal(true);
  };
  const customStyles = {
    content: {
      top: "100px",
      left: "50px",
      right: "auto",
      bottom: "auto",
      padding: "0",
      border: "1px solid #E5E7EB",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };
  return (
    <>
      <Modal
        isOpen={isNavOpen}
        style={customStyles}
        onRequestClose={() => handleNavModal()}
      >
        <div className="w-full max-w-sm py-6 md:hidden">
          <div className="flex flex-col  shadow-sm  rounded-sm">
            <h2 className="px-6 pb-4 uppercase text-[12px]">
              All boards <span>({boards.length})</span>
            </h2>
            <div className="mr-6">
              <ul className="flex flex-col space-y-2 ">
                {boards.map((board, index) => (
                  <NavItem
                    board={board}
                    key={board._id}
                    onSelect={handleSelectBoard}
                    index={index}
                    selectedIndex={selectedIndex}
                  />
                ))}
                <li
                  className="px-6 py-2 cursor-pointer"
                  onClick={() => handleModals()}
                >
                  <div className="flex items-center space-x-2  w-full">
                    <svg
                      width="16"
                      height="16"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-current text-primaryPurple"
                    >
                      <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
                    </svg>
                    <span className="font-bold text-[15px] leading-[19px] text-primaryPurple whitespace-nowrap">
                      +Create new Board
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-[#F4F7FD] py-4 mx-6 rounded-sm mt-4"></div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default NavModal;
