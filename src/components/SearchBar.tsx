import { Loader, Search, Send } from "lucide-react";
import createTransaction from "../utils/createTransaction";
import signAndSendTransaction from "../utils/signAndSendTransaction";
import { PhantomProvider } from "../types/PhantomProviderType";

interface SearchBarProps {
  isConnected: boolean;
  provider: PhantomProvider | undefined;
  wallet: string;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
}

const SearchBar = ({
  isConnected,
  provider,
  wallet,
  searchQuery,
  setSearchQuery,
  isLoading,
}: SearchBarProps) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const transaction = await createTransaction(
      wallet,
      "EKw9722Bgooxxxb15J1QHkUX78LxwAXopDVvv68WGWcX"
    );
    if (typeof provider === "undefined") {
      return;
    }
    const tx_addr = signAndSendTransaction(transaction, provider);

    console.log(
      "Transaction Signature:",
      `https://solana.fm/tx/${tx_addr}?cluster=devnet-solana`
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type your request... (e.g., 'Send 1 SOL to GxFvxhNj...')"
            className="w-full pl-12 pr-16 py-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            disabled={!isConnected || isLoading}
          />
          <button
            type="submit"
            disabled={!isConnected || isLoading}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
              isConnected && !isLoading
                ? "text-purple-500 hover:text-purple-600"
                : "text-gray-400"
            }`}
          >
            {isLoading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
