import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './Navbar.js';
import UploadSuccess from './UploadSuccess.js';
import UploadImage from './UploadImage.js';
import NFTGrid from './NFTGrid.js';
import NFTDetail from './NFTDetail.js';

function App() {
  const [walletAddress, setWallet] = useState("");

  useEffect(() => {
    //getWalletAddress();
    addWalletListener();
  });

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        } else {
          setWalletAddress("");
        }
      });
    } else {
      alert("Please install Metamask");
    }
  }

  async function getWalletAddress() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = (accounts[0]);
      setWalletAddress(account);
    } else {
      alert("Please install MetaMask");
    }
  };


  return (
    <div id="container">
      <Router>
        <Navbar onConnectWallet={getWalletAddress} address={walletAddress} />

        <Routes>
          <Route path="/create-nft" exact element={<UploadImage address={walletAddress}/>} />
          <Route path="/success" element={<UploadSuccess />} />
          <Route path="/" element={<NFTGrid />} />
          <Route path="/nft-detail/:tokenId" element={<NFTDetail />} />
        </Routes>
      </Router>
    </div> 
  );
};

export default App;