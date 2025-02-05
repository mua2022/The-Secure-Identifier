import { useState, useEffect } from "react";
import "./App.css";
import "./Dashboard.tsx"

function LandingPage() {
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    document.title = "Decentralized Identity - Secure Your Identity |  MUA";
  }, []);


  const connectWallet = () => {
    setWalletConnected(true);
  };

  return (
    <>
     
      {/* Header Section */}
      <header className="bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Decentralized Identity</h1>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="/Dashboard" className="hover:underline">Dashboard</a></li>
            <li><a href="/help" className="hover:underline">Help</a></li>
          </ul>
        </nav>
      </header>
      
      <div className=" bg-violet-600 text-white text-center p-10">
        {/* Hero Section */}
        <h1 className="text-5xl font-bold mb-4">Secure Your Identity with Blockchain</h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          A decentralized identity and verification platform for banking applications, ensuring privacy and security.
        </p>
        <button 
          className={`mt-6 px-6 py-3 text-lg rounded border border-blue-500 text-blue-500 bg-white transition-colors ${walletConnected ? 'bg-orange-500 text-blue' : 'hover:bg-gray-100'}`}
          onClick={connectWallet}
        >
          {walletConnected ? "Wallet Connected" : "Connect Wallet"}
        </button>
      </div>

      {/* Features Section */}
      <div className="py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-8">Why Choose Our Platform?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-800 rounded-xl shadow-lg">
            <h3 className="text-xl text-white font-semibold">Tamper-Proof</h3>
            <p className="text-gray-400 mt-2">Blockchain ensures data integrity and immutability.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-xl shadow-lg">
            <h3 className="text-xl text-white font-semibold">Privacy-Preserving</h3>
            <p className="text-gray-400 mt-2">Your identity stays secure and decentralized.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-xl shadow-lg">
            <h3 className="text-xl text-white font-semibold">Banking-Grade Security</h3>
            <p className="text-gray-400 mt-2">Designed for financial institutions and users alike.</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 px-6 text-center bg-blue-600">
        <h2 className="text-3xl font-semibold">Get Started with Secure Identity</h2>
        <button className="mt-6 bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 text-lg rounded">Create Your Identity</button>
      </div>
      <div>
      <footer>@Copyright 2025 | DESIGNS BY MUA</footer>
      </div>
    </>
  );
}

export default LandingPage;