import logo from "./logo.svg";
import back from "./artifacts/contracts/GoogleDrive.sol/GoogleDrive.json";
import "./App.css";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Homepage from "./pages/Homepage/Homepage";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  redirect,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Firstpage from "./pages/Firstpage/Firstpage";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [reload, setreload] = useState(0);
  const nav = useNavigate();
  function sett() {
    setIsConnected(true);
  }
  useEffect(() => {
    // window.location.reload();
    console.log(account);
  }, [account]);

  // useEffect(() => {
  const connect = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      try {
        if (provider) {
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
            
          });

          window.ethereum.on("accountsChanged", () => {
            //connect();
            window.location.reload();
          });
          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);

          let contractAddress ="0xedA1966c63c7D80ae6155d110cDC0C0AB734fC6D";
          
          
        //  "0x53036c54Dce77900F1bD1C21ad4e4F26e068d548";

          const contract = new ethers.Contract(
            contractAddress,
            back.abi,
            signer
          );

          setContract(contract);
          setProvider(provider);
          console.log(contract);
          console.log(account);
        } else {
          alert("pls install metamask");
        }
      } catch {
        alert(
          "check at the metamask sign for sign up or install the extension"
        );
      }
    };
    provider && loadProvider();
    // }, []);
  };
  // const add = async() => {
  //   await contract.Resgister();
  // };
  return (
    <>
      {/* {!isConnected && (
        <div className="App">
          {/* {/* <button onClick={connect}>connect to metamask</button> */}
      {/* <h1>{account ? account : "not connected"}</h1> */}
      {/* <button onClick={connect}>connect to metamask</button>
          <button onClick={() => setIsConnected(true)}>
            <Link to="/homepage">Home</Link>
          </button>
        </div>
      // )} */}
      {/* <button onClick={connect}>meta</button>
      <button onClick={add}>meta</button> */}

      {/* <button onClick={()=>{nav("/homepage")}}>homepage</button> */}

      <Routes>
        <Route
          exact
          path="/"
          element={
            <Firstpage
              isConnected={isConnected}
              sett={sett}
              connect={connect}
              account={account}
              provider={provider}
              contract={contract}
            />
          }
        ></Route>
        <Route
          exact
          path="homepage"
          element={
            isConnected ? (
              <Homepage
                account={account}
                provider={provider}
                contract={contract}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
