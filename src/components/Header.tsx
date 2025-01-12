import { Wallet } from "lucide-react";

const Header = ({
  isConnected,
  disconnectWallet,
  connectWallet,
}: {
  isConnected: boolean;
  disconnectWallet: () => Promise<void>;
  connectWallet: () => Promise<void>;
}) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold text-gray-800">Solana AI Assistant</h1>
      <button
        onClick={isConnected ? disconnectWallet : connectWallet}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
          isConnected
            ? "bg-red-500 hover:bg-red-600"
            : "bg-purple-500 hover:bg-purple-600"
        } text-white transition-colors`}
      >
        <Wallet className="w-5 h-5" />
        {isConnected ? "Disconnect" : "Connect Wallet"}
      </button>
    </div>
  );
};

export default Header;
