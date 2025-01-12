import { Transaction, VersionedTransaction } from "@solana/web3.js";
import { PhantomProvider } from "../types/PhantomProviderType";

const signAndSendTransaction = async (transaction: Transaction | VersionedTransaction, provider: PhantomProvider): Promise<string> => {
    try {
        const { signature } = await provider.signAndSendTransaction(transaction);
        return signature;
      } catch (error) {
        console.warn(error);
        throw new Error(error.message);
      }
}

export default signAndSendTransaction;