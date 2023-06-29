import type { NextPage } from "next";
import Head from "next/head";
import { BasicsView } from "../views";

const Basics: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>NFT Fractionizer Tests</title>
        <meta
          name="description"
          content="Testing Basic Functionality"
        />
      </Head>
      <BasicsView />
    </div>
  );
};

export default Basics;
