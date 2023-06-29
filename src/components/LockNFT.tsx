import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, Keypair, SystemProgram } from '@solana/web3.js';
import { web3 } from '@coral-xyz/anchor';
import idl from '../../group8.json';
import { notify } from '../utils/notifications';

function LockNFT() {
  console.log('Inside LockNFT...')
  const defaultProgramId = 'GVyKhCt25xvgXbjGyGq8WRjPbvUD1TToyyQPpRYZp8wa';
  const defaultNetwork = 'https://api.devnet.solana.com';
  const { publicKey, signTransaction } = useWallet();
  const [programIdInput, setProgramIdInput] = useState(defaultProgramId);
  const [networkInput, setNetworkInput] = useState(defaultNetwork);
  const [nftInput, setNftInput] = useState('');
  const [result, setResult] = useState('');

  const testLockNFT = async (programId, network, nft) => {
    const anchor = require("@coral-xyz/anchor");

    // Connection to the specified network
    const connection = new Connection(network, 'confirmed');
    const provider = new anchor.AnchorProvider(connection, {
      preflightCommitment: 'processed',
    }, {});

    console.log('Connected to the network');

    // Load the program
    const programIdPublicKey = new PublicKey(programId);
    const program = new anchor.Program(idl, programIdPublicKey, provider);

    
    // Required input accounts
    const sender = Keypair.generate();
    const senderTokenAccount = Keypair.generate();
    const mint = Keypair.generate();
    const lockingTokenAccount = Keypair.generate();
    const programAccount = Keypair.generate();

    // lockNFT function call
    try {
      await program.rpc.lockNFT({
        accounts: {
          sender: sender.publicKey,
          senderTokenAccount: senderTokenAccount.publicKey,
          nft: nft,
          lockingTokenAccount: lockingTokenAccount.publicKey,
          program: programAccount.publicKey,
          tokenProgram: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
          rent: web3.SYSVAR_RENT_PUBKEY,
          systemProgram: SystemProgram.programId,
          mint: mint.publicKey,
        },
        signers: [sender, senderTokenAccount, mint, lockingTokenAccount, programAccount],
      });

      setResult('NFT locked successfully!');
    } catch (error) {
      console.error('Error locking NFT:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      setResult(`Failed to lock NFT. Error: ${errorMessage}`);
    }
  };

  const onSubmit = () => {
    testLockNFT(programIdInput, networkInput, new PublicKey(nftInput));
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <label htmlFor="programIdInput">Program ID:</label>
          <input
            id="programIdInput"
            value={programIdInput}
            onChange={(e) => setProgramIdInput(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="networkInput">Network:</label>
          <input
            id="networkInput"
            value={networkInput}
            onChange={(e) => setNetworkInput(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="nftInput">NFT Public Key:</label>
          <input
            id="nftInput"
            value={nftInput}
            onChange={(e) => setNftInput(e.target.value)}
          />
        </div>
        <button
          className="group w-60 m-2 btn animate-pulse bg-gradient-to-br from-indigo-500 to-fuchsia-500 hover:from-white hover:to-purple-300 text-black"
          onClick={onSubmit}
          disabled={!publicKey}
        >
          <div className="hidden group-disabled:block">Wallet not connected</div>
          <span className="block group-disabled:hidden">Lock NFT</span>
        </button>
        <div>{result}</div>
      </header>
    </div>
  );
}

export default LockNFT;