import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";


function Dashboard() {
  const [identity, setIdentity] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  useEffect(() => {
      document.title = "Decentralized Identity - Secure Your Identity |  MUA";
    }, []);
  

  const createIdentity = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask to create an identity.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      setWalletAddress(userAddress);

      // Simulating identity creation with a unique hash
      const identityHash = ethers.keccak256(ethers.toUtf8Bytes(userAddress));
      setIdentity(identityHash);
    } catch (error) {
      console.error("Error creating identity:", error);
      alert("Failed to create identity.");
    }
  };

  return (
    
    <div className="min-h-screen bg-gray-900 text-white text-center p-10">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <p className="text-lg text-gray-400 mt-4">Manage your decentralized identity securely.</p>
      <button 
        className="mt-6 bg-green-500 hover:bg-green-600 px-6 py-3 text-lg rounded"
        onClick={createIdentity}
      >
        {identity ? "Identity Created" : "Create Identity"}
      </button>
      {walletAddress && <p className="mt-4 text-lg">Wallet Address: {walletAddress}</p>}
      {identity && <p className="mt-4 text-lg">Identity Hash: {identity}</p>}
    </div>
  );
}

export default Dashboard;
