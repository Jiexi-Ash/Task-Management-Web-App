import Head from "next/head";
import Image from "next/image";
import MainLayout from "components/UI/MainLayout";
import HeaderHome from "components/Home/HeaderHome";

export default function Home() {
  return (
    <MainLayout>
      <HeaderHome />
    </MainLayout>
  );
}
