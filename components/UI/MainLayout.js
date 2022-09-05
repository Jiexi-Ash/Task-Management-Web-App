import React from "react";
import Head from "next/head";
import Navbar from "components/Navbar/Navbar";
import SideNav from "components/SideNav/SideNav";

function MainLayout({ children }) {
  return (
    <>
      <Head>
        <title>Kanban - Task Management App</title>
        <meta name="description" content="A Task Management web app" />
        <link rel="icon" href="/images/favicon-32x32.png" />
      </Head>

      <Navbar />
      <main>
        <div className="flex  space-x-[2px]">
          <SideNav />
          <div className="grow min-h-screen">{children}</div>
        </div>
      </main>
    </>
  );
}

export default MainLayout;
