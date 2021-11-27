// import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
import Web3 from 'web3';

function App() {

  const [roninAddress, setRoninAddress] = useState('')
  const [playerAddress, setPlayerAddress] = useState('')
  const [percentShare, setPercentShare] = useState('')
  const [currentAccount, setCurrentAccount] = useState('')
  const [depositAmount, setDepositAmount] = useState('')
  const [guildMasterAddress, setGuildMasterAddress] = useState('')

  // const resetForm = () => {
  //   setTitle('')
  //   setDate('')
  // }

  async function loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
    }
  }

  // var account = web3.eth.accounts.wallet;
  // console.log("my address:", account);

  async function loadContract() {
      return await new window.web3.eth.Contract(
          [
              {
                  "inputs": [],
                  "stateMutability": "nonpayable",
                  "type": "constructor"
              },
              {
                  "anonymous": false,
                  "inputs": [
                      {
                          "indexed": true,
                          "internalType": "bytes32",
                          "name": "id",
                          "type": "bytes32"
                      }
                  ],
                  "name": "ChainlinkCancelled",
                  "type": "event"
              },
              {
                  "anonymous": false,
                  "inputs": [
                      {
                          "indexed": true,
                          "internalType": "bytes32",
                          "name": "id",
                          "type": "bytes32"
                      }
                  ],
                  "name": "ChainlinkFulfilled",
                  "type": "event"
              },
              {
                  "anonymous": false,
                  "inputs": [
                      {
                          "indexed": true,
                          "internalType": "bytes32",
                          "name": "id",
                          "type": "bytes32"
                      }
                  ],
                  "name": "ChainlinkRequested",
                  "type": "event"
              },
              {
                  "anonymous": false,
                  "inputs": [
                      {
                          "indexed": false,
                          "internalType": "address",
                          "name": "player",
                          "type": "address"
                      },
                      {
                          "indexed": false,
                          "internalType": "uint256",
                          "name": "amount",
                          "type": "uint256"
                      }
                  ],
                  "name": "Claim",
                  "type": "event"
              },
              {
                  "anonymous": false,
                  "inputs": [
                      {
                          "indexed": false,
                          "internalType": "address",
                          "name": "guildMaster",
                          "type": "address"
                      },
                      {
                          "indexed": false,
                          "internalType": "uint256",
                          "name": "amount",
                          "type": "uint256"
                      }
                  ],
                  "name": "Deposit",
                  "type": "event"
              },
              {
                  "anonymous": false,
                  "inputs": [
                      {
                          "indexed": true,
                          "internalType": "address",
                          "name": "previousOwner",
                          "type": "address"
                      },
                      {
                          "indexed": true,
                          "internalType": "address",
                          "name": "newOwner",
                          "type": "address"
                      }
                  ],
                  "name": "OwnershipTransferred",
                  "type": "event"
              },
              {
                  "anonymous": false,
                  "inputs": [
                      {
                          "indexed": false,
                          "internalType": "address",
                          "name": "guildMaster",
                          "type": "address"
                      },
                      {
                          "indexed": false,
                          "internalType": "uint256",
                          "name": "amount",
                          "type": "uint256"
                      }
                  ],
                  "name": "Withdraw",
                  "type": "event"
              },
              {
                  "inputs": [],
                  "name": "APIUrl",
                  "outputs": [
                      {
                          "internalType": "string",
                          "name": "",
                          "type": "string"
                      }
                  ],
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "inputs": [
                      {
                          "internalType": "address",
                          "name": "_roninAddress",
                          "type": "address"
                      },
                      {
                          "internalType": "address",
                          "name": "_player",
                          "type": "address"
                      },
                      {
                          "internalType": "uint256",
                          "name": "_percentShare",
                          "type": "uint256"
                      }
                  ],
                  "name": "addScholar",
                  "outputs": [],
                  "stateMutability": "nonpayable",
                  "type": "function"
              },
              {
                  "inputs": [],
                  "name": "balance",
                  "outputs": [
                      {
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256"
                      }
                  ],
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "inputs": [
                      {
                          "internalType": "address",
                          "name": "_roninAddress",
                          "type": "address"
                      },
                      {
                          "internalType": "address",
                          "name": "_newPlayer",
                          "type": "address"
                      }
                  ],
                  "name": "changePlayer",
                  "outputs": [],
                  "stateMutability": "nonpayable",
                  "type": "function"
              },
              {
                  "inputs": [],
                  "name": "claim",
                  "outputs": [],
                  "stateMutability": "nonpayable",
                  "type": "function"
              },
              {
                  "inputs": [],
                  "name": "claimableTotal",
                  "outputs": [
                      {
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256"
                      }
                  ],
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "inputs": [
                      {
                          "internalType": "uint256",
                          "name": "_amount",
                          "type": "uint256"
                      }
                  ],
                  "name": "deposit",
                  "outputs": [],
                  "stateMutability": "nonpayable",
                  "type": "function"
              },
              {
                  "inputs": [],
                  "name": "devaddr",
                  "outputs": [
                      {
                          "internalType": "address",
                          "name": "",
                          "type": "address"
                      }
                  ],
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "inputs": [],
                  "name": "feeAddress",
                  "outputs": [
                      {
                          "internalType": "address",
                          "name": "",
                          "type": "address"
                      }
                  ],
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "inputs": [
                      {
                          "internalType": "bytes32",
                          "name": "_requestId",
                          "type": "bytes32"
                      },
                      {
                          "internalType": "uint256",
                          "name": "_claimableTotal",
                          "type": "uint256"
                      }
                  ],
                  "name": "fulfill",
                  "outputs": [],
                  "stateMutability": "nonpayable",
                  "type": "function"
              },
              {
                  "inputs": [
                      {
                          "internalType": "string",
                          "name": "_roninAddress",
                          "type": "string"
                      }
                  ],
                  "name": "getSLPamount",
                  "outputs": [],
                  "stateMutability": "nonpayable",
                  "type": "function"
              },
              {
                  "inputs": [],
                  "name": "guildMaster",
                  "outputs": [
                      {
                          "internalType": "address",
                          "name": "",
                          "type": "address"
                      }
                  ],
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "inputs": [],
                  "name": "owner",
                  "outputs": [
                      {
                          "internalType": "address",
                          "name": "",
                          "type": "address"
                      }
                  ],
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "inputs": [],
                  "name": "percentFee",
                  "outputs": [
                      {
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256"
                      }
                  ],
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "inputs": [
                      {
                          "internalType": "address",
                          "name": "",
                          "type": "address"
                      }
                  ],
                  "name": "playerInfo",
                  "outputs": [
                      {
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256"
                      }
                  ],
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "inputs": [
                      {
                          "internalType": "address",
                          "name": "",
                          "type": "address"
                      }
                  ],
                  "name": "playerList",
                  "outputs": [
                      {
                          "internalType": "bool",
                          "name": "",
                          "type": "bool"
                      }
                  ],
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "inputs": [
                      {
                          "internalType": "address",
                          "name": "_player",
                          "type": "address"
                      }
                  ],
                  "name": "removeOldPlayer",
                  "outputs": [],
                  "stateMutability": "nonpayable",
                  "type": "function"
              },
              {
                  "inputs": [],
                  "name": "renounceOwnership",
                  "outputs": [],
                  "stateMutability": "nonpayable",
                  "type": "function"
              },
              {
                  "inputs": [
                      {
                          "internalType": "address",
                          "name": "",
                          "type": "address"
                      }
                  ],
                  "name": "roninInfo",
                  "outputs": [
                      {
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256"
                      }
                  ],
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "inputs": [
                      {
                          "internalType": "address",
                          "name": "",
                          "type": "address"
                      }
                  ],
                  "name": "roninList",
                  "outputs": [
                      {
                          "internalType": "bool",
                          "name": "",
                          "type": "bool"
                      }
                  ],
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "inputs": [
                      {
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256"
                      }
                  ],
                  "name": "scholarInfo",
                  "outputs": [
                      {
                          "internalType": "address",
                          "name": "roninAddress",
                          "type": "address"
                      },
                      {
                          "internalType": "address",
                          "name": "player",
                          "type": "address"
                      },
                      {
                          "internalType": "uint256",
                          "name": "claimable",
                          "type": "uint256"
                      },
                      {
                          "internalType": "uint256",
                          "name": "percentShare",
                          "type": "uint256"
                      }
                  ],
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "inputs": [],
                  "name": "scholarLength",
                  "outputs": [
                      {
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256"
                      }
                  ],
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "inputs": [],
                  "name": "slp",
                  "outputs": [
                      {
                          "internalType": "contract IERC20",
                          "name": "",
                          "type": "address"
                      }
                  ],
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "inputs": [
                      {
                          "internalType": "address",
                          "name": "_newMaster",
                          "type": "address"
                      }
                  ],
                  "name": "transferGuildMaster",
                  "outputs": [],
                  "stateMutability": "nonpayable",
                  "type": "function"
              },
              {
                  "inputs": [
                      {
                          "internalType": "address",
                          "name": "newOwner",
                          "type": "address"
                      }
                  ],
                  "name": "transferOwnership",
                  "outputs": [],
                  "stateMutability": "nonpayable",
                  "type": "function"
              },
              {
                  "inputs": [
                      {
                          "internalType": "uint256",
                          "name": "_date",
                          "type": "uint256"
                      },
                      {
                          "internalType": "string",
                          "name": "_roninAddress",
                          "type": "string"
                      }
                  ],
                  "name": "updatePaymentBalance",
                  "outputs": [],
                  "stateMutability": "nonpayable",
                  "type": "function"
              },
              {
                  "inputs": [
                      {
                          "internalType": "uint256",
                          "name": "_percent",
                          "type": "uint256"
                      }
                  ],
                  "name": "updatePercentFee",
                  "outputs": [],
                  "stateMutability": "nonpayable",
                  "type": "function"
              },
              {
                  "inputs": [
                      {
                          "internalType": "address",
                          "name": "_roninAddress",
                          "type": "address"
                      },
                      {
                          "internalType": "uint256",
                          "name": "_percent",
                          "type": "uint256"
                      }
                  ],
                  "name": "updatePercentShare",
                  "outputs": [],
                  "stateMutability": "nonpayable",
                  "type": "function"
              },
              {
                  "inputs": [
                      {
                          "internalType": "uint256",
                          "name": "_amount",
                          "type": "uint256"
                      }
                  ],
                  "name": "withdraw",
                  "outputs": [],
                  "stateMutability": "nonpayable",
                  "type": "function"
              }
          ]
          , '0x33085Ca77b74089F30835F79E010E35F50ce423A');
  }

  //Function Call
  async function callScholar() {
    // updateStatus('Checking Scholar Numbers...');
        const sendTarget = await  window.contract.methods.scholarLength().call()
            .then(res => console.log('number of scholar:', res))
            .catch(err => console.log(err))
    // updateStatus(`Checking Done!`);
  }

  async function callGuildMaster() {
    // updateStatus('Checking Scholar Numbers...');
        const sendTarget = await  window.contract.methods.guildMaster().call()
            .then(res => console.log('guildMaster:', res))
            .catch(err => console.log(err))
    // updateStatus(`Checking Done!`);
  }



//------------------------------
//------------------------------


  
  //Function Send

  //ADD TARGET WALLET
  async function addScholar() {
      // updateStatus('Add Scholar...');
      const sendTarget = await  window.contract.methods.addScholar(roninAddress,
      roninAddress, "100000000000000000").send({from: currentAccount})
  }

  async function changePlayer() {
      // updateStatus('Changing Player...');
      const sendTarget = await  window.contract.methods.changePlayer(roninAddress,
      playerAddress).send({from: currentAccount})
      // updateStatus('Changed player successfully!')
  }

  async function removeOldPlayer() {
      // updateStatus('Removing Old Player..');
      const sendTarget = await  window.contract.methods.removeOldPlayer(playerAddress).send({from: currentAccount})
      // updateStatus('Deposit successfully!')
  }

  async function deposit() {
      // updateStatus('deposit');
      const sendTarget = await  window.contract.methods.deposit("10000").send({from: '0xDB41eAe1832Bdf41e3c2aDeD4FB08f6822109577'})
  }

  async function updatePercentShare() {
      // updateStatus('Updating Percent Share...');
      const sendTarget = await  window.contract.methods.updatePercentShare("0xDB41eAe1832Bdf41e3c2aDeD4FB08f6822109577","300000000000000000").send({from: '0xDB41eAe1832Bdf41e3c2aDeD4FB08f6822109577'})
  }

  // console.log(window.contract.methods.guildMaster, "HELLO");


  //get wallet account index[0]
  async function getCurrentAccount() {
      const accounts = await window.web3.eth.getAccounts();
      return accounts[0];
  }

  //load smart contract, display 'Ready!' when successfully loaded.
  async function load() {
      await loadWeb3();
      window.contract = await loadContract();
      // updateStatus('Ready!');
  }

  //the update function, just just to change text. to 'Readt!'
  // function updateStatus(status) {
  //     const statusEl = document.getElementById('status');
  //     statusEl.innerHTML = status;
  //     console.log(status);
  // }

  load();


  //Run once, to get current wallet address!
  useEffect(() => {
    getAccounts();
    callGuildMaster();
  }, [])

  async function callGuildMaster() {

        const sendTarget = await  window.contract.methods.guildMaster().call()
            .then(res => setGuildMasterAddress(res))
            .catch(err => console.log(err))

  }

  function getAccounts() {
    window.web3.eth.getAccounts((error,result) => {
      result = String(result);
        if (error) {
            console.log(error);
        } else {
            setCurrentAccount(result)
        }
    });
  }

  //print current selected account
  // console.log("test", currentAccount);
  // console.log("what is it", typeof(currentAccount), currentAccount)

  return (
    <div className="App">
        <label>
          <span>Ronin Address:</span>
          <input 
            type="text" 
            onChange={(e) => setRoninAddress(e.target.value)}
            value={roninAddress}
          />
        </label>
        <br/>
        <label>
          <span>Player Address:</span>
          <input 
            type="text" 
            onChange={(e) => setPlayerAddress(e.target.value)} 
            value={playerAddress}
          />
        </label>
        <br/>
        {(currentAccount === guildMasterAddress) &&
        <label>
          <span>Percent Share:</span>
          <input 
            type="text" 
            onChange={(e) => setPercentShare(e.target.value)} 
            value={percentShare}
          />
        </label>}

        {/* <p>roninAddress - {roninAddress}, playerAddress - {playerAddress}, percentShare - {percentShare} </p> */}

        <br/><br/>

        

        <button onClick={addScholar}>Add Scholar</button>

        <button onClick={changePlayer}>Change Player</button>

        <button onClick={removeOldPlayer}>Remove Old Player</button>

        <button onClick={updatePercentShare}>Update Percent Share</button>

        <button onClick={callScholar}>scholarLength</button>

        <button onClick={callGuildMaster}>callGuildMaster</button>

        <br/><br/>

        <label>
          <span>Deposit:</span>
          <input 
            type="text" 
            onChange={(e) => setDepositAmount(e.target.value)} 
            value={depositAmount}
          />
        </label>

        <button onClick={deposit}>deposit</button>

    </div>
  );
}

export default App;
