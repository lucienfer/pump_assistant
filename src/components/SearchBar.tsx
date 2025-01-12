import { Loader, Search, Send } from "lucide-react";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { llm } from "../config";
import AIResponse from "../types/AIResponseType";

interface SearchBarProps {
  isConnected: boolean;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  responses: AIResponse[];
  setResponses: React.Dispatch<React.SetStateAction<AIResponse[]>>;
}

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a helpful assistant that translates {input_language} to {output_language}.",
  ],
  ["human", "{input}"],
]);

const SearchBar = ({
  isConnected,
  searchQuery,
  setSearchQuery,
  isLoading,
  responses,
  setResponses,
}: SearchBarProps) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const chain = prompt.pipe(llm);
    const response = await chain.invoke({
      input_language: "French",
      output_language: "English",
      input: searchQuery,
    });
    const responseAI: AIResponse = {
      message: response.content.toString(),
      type: "transaction",
    };
    const tmp = responses;
    tmp.push(responseAI);
    setResponses(tmp);
    console.log(tmp[0]);
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
