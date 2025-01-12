import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, TransactionMessage, VersionedTransaction } from "@solana/web3.js";

const createTransaction = async (
    sender: string,
    receiver: string
  ): Promise<Transaction | VersionedTransaction> => {
    const connection = new Connection(
      "https://solana-mainnet.g.alchemy.com/v2/m_hRudwSAjlmKxI-Y5RwVD3Wmkj5AwTV"
    );
  
    const transfertInstruction = SystemProgram.transfer({
      fromPubkey: new PublicKey(sender),
      toPubkey: new PublicKey(receiver),
      lamports: 0.01 * LAMPORTS_PER_SOL,
    });
  
    const transactionV0 = new TransactionMessage({
      payerKey: new PublicKey(sender),
      recentBlockhash: await connection
        .getLatestBlockhash()
        .then((res) => res.blockhash),
      instructions: [transfertInstruction],
    }).compileToV0Message();
    const transaction = new VersionedTransaction(transactionV0);
    return transaction;
  };

  export default createTransaction;