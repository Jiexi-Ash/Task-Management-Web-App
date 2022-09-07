import { useState } from "react";
import Head from "next/head";
import Navbar from "components/Navbar/Navbar";
import SideNav from "components/SideNav/SideNav";
import AddBoard from "components/Board/AddBoard";

function MainLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = (bool) => {
    setIsOpen(bool);
  };
  return (
    <>
      <Head>
        <title>Kanban - Task Management App</title>
        <meta name="description" content="A Task Management web app" />
        <link rel="icon" href="/images/favicon-32x32.png" />
      </Head>

      <Navbar handleOpen={handleModal} />
      <main>
        <AddBoard handleOpen={handleModal} isOpen={isOpen} />
        <div className="flex  space-x-[2px]">
          <SideNav handleOpen={handleModal} />
          <div className="grow min-h-screen">{children}</div>
        </div>
      </main>
    </>
  );
}

export default MainLayout;
