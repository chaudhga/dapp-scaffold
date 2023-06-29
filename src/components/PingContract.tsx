import { useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';

const PingContract: React.FC = () => {
  const defaultProgramId = 'GVyKhCt25xvgXbjGyGq8WRjPbvUD1TToyyQPpRYZp8wa';
  const defaultNetwork = 'https://api.devnet.solana.com';

  const [programIdInput, setProgramIdInput] = useState<string>(defaultProgramId);
  const [networkInput, setNetworkInput] = useState<string>(defaultNetwork);
  const [isPinging, setIsPinging] = useState<boolean>(false);
  const [pingResult, setPingResult] = useState<string>('');

  const handlePing = async () => {
    setIsPinging(true);
    const connection = new Connection(networkInput, 'confirmed');
    const programId = new PublicKey(programIdInput);

    try {
      await connection.getAccountInfo(programId);
      setPingResult('Smart contract is reachable');
    } catch (error) {
      setPingResult('Smart contract is not reachable or does not exist');
    } finally {
      setIsPinging(false);
    }
  };

  return (
    <div>
      <h2>Ping Solana Smart Contract</h2>
      <label htmlFor="programIdInput">Program ID:</label>
      <input
        id="programIdInput"
        type="text"
        value={programIdInput}
        onChange={(e) => setProgramIdInput(e.target.value)}
        style={{ color: 'black' }}
      />
      <label htmlFor="networkInput">Network:</label>
      <input
        id="networkInput"
        type="text"
        value={networkInput}
        onChange={(e) => setNetworkInput(e.target.value)}
        style={{ color: 'black' }}
      />
      <button onClick={handlePing} disabled={isPinging}>
        {isPinging ? 'Pinging...' : 'Ping'}
      </button>
      <p>{pingResult}</p>
    </div>
  );
};

export default PingContract;