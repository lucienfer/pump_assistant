import { useEffect, useState } from "react";
import { Connection } from "@solana/web3.js";
import getProvider from "./utils/getProvider";
import Alert from "./components/Alert";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [wallet, setWallet] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  //const [responses, setResponses] = useState<AgentResponse[]>([]);
  //const [assistant] = useState<SimpleAssistant>(() => new SimpleAssistant());
  const provider = getProvider();

  const connection = new Connection(
    "https://solana-mainnet.g.alchemy.com/v2/m_hRudwSAjlmKxI-Y5RwVD3Wmkj5AwTV"
  );

  useEffect(() => {
    const checkWallet = async () => {
      try {
        // Vérifie si Phantom est installé
        const isPhantomInstalled =
          window.phantom?.solana && window.phantom.solana.isPhantom;

        if (!isPhantomInstalled) {
          setError("Please install Phantom Wallet");
        }
      } catch (error) {
        console.error(error);
        setError("Error checking wallet");
      }
    };

    checkWallet();
  }, []);

  const connectWallet = async () => {
    try {
      // Connecte le wallet
      if (typeof provider === "undefined") {
        throw new Error("Phantom wallet not found!");
      }

      const response = await provider.connect();

      console.log(response);
      // Met à jour l'état avec la clé publique
      setWallet(response.publicKey.toString());

      setIsConnected(true);
      setError("");
    } catch (error) {
      console.error(error);
      setError("Error connecting wallet");
    }
  };

  const disconnectWallet = async () => {
    try {
      if (typeof provider === "undefined") {
        throw new Error("Phantom wallet not found!");
      }
      // Déconnecte le wallet
      await provider.disconnect();

      // Réinitialise l'état
      setWallet("");

      setIsConnected(false);
      setError("");
    } catch (error) {
      console.error(error);
      setError("Error disconnecting wallet");
    }
  };

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
        <Header
          isConnected={isConnected}
          disconnectWallet={disconnectWallet}
          connectWallet={connectWallet}
        />

        {isConnected && (
          <div className="mb-6 p-4 bg-white rounded-lg shadow">
            <p className="text-sm text-gray-600">Connected:</p>
            <p className="font-mono text-sm truncate">{wallet}</p>
          </div>
        )}

        {error && <Alert message={error} />}

        <SearchBar
          isConnected={isConnected}
          provider={provider}
          wallet={wallet}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isLoading={isLoading}
        />

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
