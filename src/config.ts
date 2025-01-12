import { ChatAnthropic } from "@langchain/anthropic";

export const llm = new ChatAnthropic({
  model: "claude-3-haiku-20240307",
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  temperature: 0,
  maxTokens: undefined,
  maxRetries: 2,
  // other params...
});