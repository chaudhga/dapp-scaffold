
import { FC } from "react";
import { SignMessage } from '../../components/SignMessage';
import { SendTransaction } from '../../components/SendTransaction';
import { SendVersionedTransaction } from '../../components/SendVersionedTransaction';
import LockNFT from '../../components/LockNFT';
import PingContract from '../../components/PingContract';
import { RequestAirdrop } from "components/RequestAirdrop";

export const BasicsView: FC = ({ }) => {

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-fuchsia-500 mt-10 mb-8">
          NFT Fractionizer Tests
        </h1>
        {/* CONTENT GOES HERE */}
        <div className="text-center">
          <RequestAirdrop />
          <PingContract />
          <LockNFT />
        </div>
      </div>
    </div>
  );
};
