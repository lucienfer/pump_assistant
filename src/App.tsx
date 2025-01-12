import { useCallback, useState } from "react";
import { Loader, Search, Send, Wallet } from "lucide-react";

const Alert = ({ message }: { message: string }) => (
  <div className="p-4 mb-6 bg-red-50 border border-red-200 rounded-lg text-red-600">
    {message}
  </div>
);

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  //const [responses, setResponses] = useState<AgentResponse[]>([]);
  //const [assistant] = useState<SimpleAssistant>(() => new SimpleAssistant());

  const connectWallet = useCallback(async () => {
    try {
      if (!window.phantom?.solana) {
        throw new Error("Phantom wallet not found! Please install it.");
      }

      // Simulation de connexion
      const mockPublicKey = "SimPubK" + Math.random().toString(36).substr(2, 9);
      setPublicKey(mockPublicKey);
      setIsConnected(true);
      setError(null);

      // addResponse({
      //   type: "info",
      //   message: "Wallet connected successfully",
      //   timestamp: new Date(),
      // });
    } catch (err) {
      setError(err.message);
      // addResponse({
      //   type: "error",
      //   message: err.message,
      //   timestamp: new Date(),
      // });
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setIsConnected(false);
    setPublicKey("");
    // addResponse({
    //   type: "info",
    //   message: "Wallet disconnected",
    //   timestamp: new Date(),
    // });
  }, []);

  // const addResponse = (response: AgentResponse) => {
  //   setResponses((prev) => [response, ...prev]);
  // };

  // const handleSearch = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!searchQuery.trim()) return;

  //   setIsLoading(true);
  //   try {
  //     // Analyse de la requête
  //     const transaction = await assistant.parseRequest(searchQuery);

  //     if (!transaction) {
  //       throw new Error("Could not understand the request");
  //     }

  //     addResponse({
  //       type: "info",
  //       message: "Understanding your request...",
  //       timestamp: new Date(),
  //       details: transaction,
  //     });

  //     // Estimation des frais
  //     const fees = await assistant.estimateFees();

  //     addResponse({
  //       type: "info",
  //       message: `Estimated fees: ${fees} SOL`,
  //       timestamp: new Date(),
  //     });

  //     // Simulation de traitement
  //     const signature = await assistant.processTransaction(transaction);

  //     addResponse({
  //       type: "transaction",
  //       message: "Transaction processed successfully!",
  //       timestamp: new Date(),
  //       details: {
  //         signature,
  //         transaction,
  //         fees,
  //       },
  //     });
  //   } catch (err) {
  //     addResponse({
  //       type: "error",
  //       message: err.message,
  //       timestamp: new Date(),
  //     });
  //     setError(err.message);
  //   } finally {
  //     setIsLoading(false);
  //     setSearchQuery("");
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header avec bouton wallet */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Solana AI Assistant
          </h1>
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

        {/* Affichage de la clé publique */}
        {isConnected && (
          <div className="mb-6 p-4 bg-white rounded-lg shadow">
            <p className="text-sm text-gray-600">Connected:</p>
            <p className="font-mono text-sm truncate">{publicKey}</p>
          </div>
        )}

        {/* Message d'erreur */}
        {error && <Alert message={error} />}

        {/* Barre de recherche centrale */}
        <div className="w-full max-w-2xl mx-auto mb-8">
          <form className="relative">
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

        {/* Zone d'affichage des réponses */}
        <div className="space-y-4">
          {/* {responses.map((response, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg shadow ${
            response.type === 'error' 
              ? 'bg-red-50 border border-red-200' 
              : response.type === 'transaction'
              ? 'bg-green-50 border border-green-200'
              : 'bg-white'
          }`}
        >
          <div className="flex justify-between items-start">
            <span className={`text-sm ${
              response.type === 'error' 
                ? 'text-red-600' 
                : response.type === 'transaction'
                ? 'text-green-600'
                : 'text-gray-600'
            }`}>
              {response.message}
            </span>
            <span className="text-xs text-gray-400">
              {response.timestamp.toLocaleTimeString()}
            </span>
          </div>
          {response.details && (
            <pre className="mt-2 text-xs bg-gray-50 p-2 rounded overflow-x-auto">
              {JSON.stringify(response.details, null, 2)}
            </pre>
          )}
        </div>
      ))} */}
        </div>

        {!isConnected && (
          <p className="text-center mt-4 text-gray-500">
            Connect your wallet to start using the AI assistant
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
