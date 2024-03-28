import "./App.css";
import ConnectToMetaMask from "./components/ConnectToMetaMask";
import { useState, useEffect } from "react";
import Web3 from "web3";

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [message, setMessage] = useState("");
  const [messageValue, setMessageValue] = useState("");
  const [loading, setLoading] = useState(false);

  const contractAddress = "0xa031589C7006C5551eA403C7F4a169e56126d2AF"
  const abi = [
    {
      inputs: [{ internalType: "string", name: "_message", type: "string" }],
      name: "createMessage",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_owner", type: "address" }],
      name: "getMessage",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "messages",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
  ];

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        const accounts = await web3Instance.eth.requestAccounts();
        setAccounts(accounts);
        const contractInstance = new web3Instance.eth.Contract(
          abi,
          contractAddress
        );
        setContract(contractInstance);
      }
    };

    initWeb3();
  }, []);

  const sendMessage = async () => {

   const txReceipt = await contract.methods.createMessage(String(messageValue)).send({ from: accounts[0] });

    setMessage('https://sepolia.etherscan.io/tx/' + txReceipt.transactionHash)
    console.log("Message Sent", messageValue);
    console.log(txReceipt)
  };


  return (
    <div className="p-10 py-4">
      <ConnectToMetaMask />
      <div className="my-4">
        <input
          value={messageValue}
          onChange={(e) => setMessageValue(e.target.value)}
          className="bg-gray-100 px-2 py-2 rounded-md shadow-md"
          type="text"
          placeholder="Enter sha+url here"
        />
        <button
          onClick={sendMessage}
          className="bg-red-500 p-2 rounded-md text-white shadow-md ml-2 active:scale-90 transition"
        >
          Create
        </button>
      </div>
      {message}
    </div>
  );
}

export default App;
