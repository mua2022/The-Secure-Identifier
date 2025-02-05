import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { http } from "viem";
import { createPublicClient } from "wagmi";
import { ReactNode } from "react";

// Define supported chains
const chains = [sepolia, mainnet];

// Get default wallet connectors
const { connectors } = getDefaultWallets({
  appName: "Decentralized Identity",
  projectId: "ade1e8ff84463b00d42a4aab0c7d6f9b",
});

// Create the client for blockchain communication
const wagmiConfig = createConfig({
  connectors,
  publicClient: createPublicClient({
    chain: sepolia, // Set default chain
    transport: http(),
  }),
  autoConnect: true, // Ensures wallet auto-connect
});

type WalletProviderProps = {
  children: ReactNode;
};

export function WalletProvider({ children }: WalletProviderProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
}
