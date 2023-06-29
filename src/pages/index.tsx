import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>NFT Fractionizer</title>
        <meta
          name="description"
          content="NFT Fractionizer"
        />
      </Head>
      <HomeView />
    </div>
  );
};

export default Home;
