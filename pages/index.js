import Head from "next/head";
import Image from "next/image";
import MainLayout from "components/UI/MainLayout";
import HeaderHome from "components/Home/HeaderHome";
import { getSession } from "next-auth/react";
import { toJson } from "helpers/functions";
import { getBoards } from "db/services/board.services";
import { findUserByEmail } from "db/services/user.services";

export default function Home({ boards }) {
  return (
    <MainLayout boards={boards}>
      <HeaderHome />
      <div className="flex flex-col justify-center items-center h-full space-y-5">
        <h2 className="text-[18px] font-bold leading-5 text-paleGrey text-center max-w-[350px] md:max-w-[460] lg:max-w-[500px] transition-all duration-200">
          This board is empty. Create a new column to get started.
        </h2>
        <button className="btn bg-primaryPurple">+ add new task</button>
      </div>
    </MainLayout>
  );
}

// severside rendering
export async function getServerSideProps(context) {
  // get session
  const session = await getSession(context);

  const user = await findUserByEmail(session.user.email, {
    password: 0,
  });

  const boards = await getBoards(user._id);
  // get boards from db
  // const boards = await getBoards(user._id);

  return {
    props: {
      boards: toJson(boards),
    },
  };
}
