import Head from "next/head";
import Image from "next/image";
import MainLayout from "components/UI/MainLayout";
import HeaderHome from "components/Home/HeaderHome";
import AddBoard from "components/Board/AddBoard";

export default function Home() {
  return (
    <MainLayout>
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
