import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Buffer } from "buffer";

declare global {
  var Buffer: typeof import("buffer").Buffer;
  interface Window {
    phantom?: {
      solana?: {
        connect(): Promise<{ publicKey: { toString(): string } }>;
        disconnect(): Promise<void>;
        isConnected: boolean;
        isPhantom: boolean;
      };
    };
  }
}

globalThis.Buffer = Buffer;

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <App />
  //{/* </StrictMode>, */}
);
