// import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
import Web3 from 'web3';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import abi from './contractABI';

function App() {

  const [roninAddress, setRoninAddress] = useState('')
  const [playerAddress, setPlayerAddress] = useState('')
  const [percentShare, setPercentShare] = useState('')
  const [currentAccount, setCurrentAccount] = useState('')
  const [weiAmount, setWeiAmount] = useState('')
  const [scholarUint, setScholarUint] = useState('')
  const [guildMasterAddress, setGuildMasterAddress] = useState('')

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
          abi
          , '0x33085Ca77b74089F30835F79E010E35F50ce423A');
  }
  

  //Function Call
  async function callScholar() {
    // updateStatus('Checking Scholar Numbers...');
        await  window.contract.methods.scholarLength().call()
            .then(res => console.log('number of scholar:', res))
            .catch(err => console.log(err))
    // updateStatus(`Checking Done!`);
  }

  async function callClaimableTotal() {
    // updateStatus('Checking Scholar Numbers...');
        await  window.contract.methods.claimableTotal().call()
            .then(res => console.log('claimableTotal:', res))
            .catch(err => console.log(err))
    // updateStatus(`Checking Done!`);
  }

  async function callBalance() {
    // updateStatus('Checking Scholar Numbers...');
        await  window.contract.methods.balance().call()
            .then(res => console.log('Balance:', res))
            .catch(err => console.log(err))
    // updateStatus(`Checking Done!`);
  }  

  async function callPlayerList() {
    // updateStatus('Checking Scholar Numbers...');
        await  window.contract.methods.playerList(playerAddress).call()
            .then(res => console.log('PlayerList:', res))
            .catch(err => console.log(err))
    // updateStatus(`Checking Done!`);
  }  

  async function callRoninInfo() {
    // updateStatus('Checking Scholar Numbers...');
        await  window.contract.methods.roninInfo(roninAddress).call()
            .then(res => console.log('roninInfo:', res))
            .catch(err => console.log(err))
    // updateStatus(`Checking Done!`);
  }

  async function callScholarInfo() {
    // updateStatus('Checking Scholar Numbers...');
        await  window.contract.methods.scholarInfo(roninAddress).call()
            .then(res => console.log('Scholar Info:', res))
            .catch(err => console.log(err))
    // updateStatus(`Checking Done!`);
  }  

    // scholarInfo

//------------------------------
//------------------------------


  
  //Function Send

  //ADD TARGET WALLET
  async function addScholar() {
      // updateStatus('Add Scholar...');
      await  window.contract.methods.addScholar(roninAddress,
      roninAddress, percentShare).send({from: currentAccount})
  }

  async function changePlayer() {
      // updateStatus('Changing Player...');
      await  window.contract.methods.changePlayer(roninAddress,
      playerAddress).send({from: currentAccount})
      // updateStatus('Changed player successfully!')
  }

  async function removeOldPlayer() {
      // updateStatus('Removing Old Player..');
      await  window.contract.methods.removeOldPlayer(playerAddress).send({from: currentAccount})
      // updateStatus('Deposit successfully!')
  }

  async function deposit() {
      // updateStatus('deposit');
      await  window.contract.methods.deposit(weiAmount).send({from: currentAccount})
  }

  async function withdraw() {
    // updateStatus('deposit');
    await  window.contract.methods.withdraw(weiAmount).send({from: currentAccount})
}

  async function updatePercentShare() {
      // updateStatus('Updating Percent Share...');
      await  window.contract.methods.updatePercentShare(currentAccount, percentShare).send({from: currentAccount})
  }


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


  //Run once, to get current wallet address/guildMaster
  useEffect(() => {
    getAccounts();
    callGuildMaster();
  }, [])

  async function callGuildMaster() {

        await  window.contract.methods.guildMaster().call()
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
        <label>
          <span>ScholarUint:</span>
          <input 
            type="text" 
            onChange={(e) => setScholarUint(e.target.value)} 
            value={scholarUint}
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
        
        {(currentAccount === guildMasterAddress) &&
        <button onClick={addScholar}>Add Scholar</button>
        }

        {(currentAccount === guildMasterAddress) &&
        <button onClick={changePlayer}>Change Player</button>
        }

        {(currentAccount === guildMasterAddress) &&
        <button onClick={removeOldPlayer}>Remove Old Player</button>
        }

        {(currentAccount === guildMasterAddress) &&
        <button onClick={updatePercentShare}>Update Percent Share</button>
        }

        <button onClick={callScholar}>scholarLength</button>

        <br/><br/>

        <label>
          <span>Deposit:</span>
          <input 
            type="text" 
            onChange={(e) => setWeiAmount(e.target.value)} 
            value={weiAmount}
          />
        </label>

        <br/><br/>

        <button onClick={deposit}>deposit</button>
        <button onClick={callBalance}>Balance</button>
        <button onClick={callClaimableTotal}>ClaimableTotal</button>
        <button onClick={callRoninInfo}>Ronin Info</button>
        <button onClick={callScholarInfo}>Scholar Info</button>

    </div>
  );
}

export default App;
