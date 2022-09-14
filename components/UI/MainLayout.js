import { useState } from "react";
import Head from "next/head";
import Navbar from "components/Navbar/Navbar";
import SideNav from "components/SideNav/SideNav";
import AddBoard from "components/Board/AddBoard";
import NavModal from "components/Navbar/NavModal";
import { useSelector } from "react-redux";
import AddTask from "components/modals/Tasks/AddTask";
import HeaderHome from "components/Home/HeaderHome";

function MainLayout({ children }) {
  const boards = useSelector((state) => state.board.board);
  console.log("render");
  const [isOpen, setIsOpen] = useState(false);
  const [isNavOpen, setIsModalOpen] = useState(false);
  const [isTask, setIsTask] = useState(false);

  const handleNavModal = () => {
    setIsModalOpen(!isNavOpen);
  };

  const handleAddBoardModal = (bool) => {
    console.log("navbar btn");
    setIsOpen(bool);
  };

  const handleAddTaskModal = (bool) => {
    setIsTask(bool);
  };

  return (
    <>
      <Head>
        <title>Kanban - Task Management App</title>
        <meta name="description" content="A Task Management web app" />
        <link rel="icon" href="/images/favicon-32x32.png" />
      </Head>

      <Navbar
        handleAddBoard={handleAddBoardModal}
        handleNavModal={handleNavModal}
        isNavOpen={isNavOpen}
        isTask={isTask}
        handleTask={handleAddTaskModal}
      />
      <>
        <AddBoard handleAddBoardModal={handleAddBoardModal} isOpen={isOpen} />
        <NavModal
          isNavOpen={isNavOpen}
          handleNavModal={handleNavModal}
          boards={boards}
          handleAddBoardModal={handleAddBoardModal}
        />
        <AddTask
          isTask={isTask}
          handleTask={handleAddTaskModal}
          boards={boards}
        />
      </>
      <main className="">
        <div className="relative flex   space-x-[2px] min-h-screen">
          <SideNav handleAddBoardModal={handleAddBoardModal} />
          <div className="flex-1">
            <HeaderHome handleTask={handleAddTaskModal} />
            {children}
          </div>
        </div>
      </main>
    </>
  );
}

export default MainLayout;
