import { useState, useEffect } from "react";
import MainLayout from "components/UI/MainLayout";
import HeaderHome from "components/Home/HeaderHome";
import { getSession } from "next-auth/react";
import { toJson } from "helpers/functions";
import { getBoards } from "db/services/board.services";
import { findUserByEmail } from "db/services/user.services";
import connectDB from "db/connectDB";
import { setUserBoards, setSelectedBoard } from "redux/reducers/boardSlice";
import { useDispatch } from "react-redux";
import DisplayBoard from "components/Board/DisplayBoard";

export default function Home({ boards }) {
  console.log("render home");
  const dispatch = useDispatch();
  useEffect(() => {
    if (boards) {
      dispatch(setUserBoards(boards));
      dispatch(setSelectedBoard(boards[0]));
    }
  }, [boards]);
  return (
    <>
      {" "}
      <MainLayout boards={boards}>
        {!boards ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <h2 className="text-[18px] mb-6 font-bold leading-5 text-paleGrey text-center max-w-[350px] md:max-w-[460] lg:max-w-[500px] transition-all duration-200">
                This board is empty. Create a new column to get started.
              </h2>
              <button className="btn bg-primaryPurple">+ add new task</button>
            </div>
          </div>
        ) : (
          <div className="w-screen">
            <DisplayBoard />
          </div>
        )}
      </MainLayout>
    </>
  );
}

export async function getServerSideProps(context) {
  await connectDB();

  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  const user = await findUserByEmail(session.user.email, {
    password: 0,
  });

  const boards = await getBoards(user._id);

  return {
    props: {
      boards: toJson(boards),
    },
  };
}
