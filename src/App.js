import './App.css';
import React from "react";
import Axios from "axios";
import { useState, useEffect } from 'react'
import Web3 from 'web3';
import abi from './contractABI';
import { makeStyles } from "@material-ui/core/styles"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import {
  Drawer, List, ListItem,
  ListItemIcon, ListItemText,
  Container, Typography,
} from "@material-ui/core";
import { grey } from '@mui/material/colors';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PercentIcon from '@mui/icons-material/Percent';
import PaymentsIcon from '@mui/icons-material/Payments';
import TransitEnterexitIcon from '@mui/icons-material/TransitEnterexit';
import PersonIcon from '@mui/icons-material/Person';
import fromExponential from 'from-exponential';


const useStyles = makeStyles((theme) => ({
  drawerPaper: { width: 'inherit'},
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  }
}))


function App() {
    const classes = useStyles();

  const [roninAddress, setRoninAddress] = useState('')
  const [playerAddress, setPlayerAddress] = useState('')
  const [percentShare, setPercentShare] = useState('')
  const [currentAccount, setCurrentAccount] = useState('')
  const [weiAmount, setWeiAmount] = useState('')
  // const [displayAmount, setDisplayAmount] = useState('')
  const [scholarUint, setScholarUint] = useState('')
  const [guildMasterAddress, setGuildMasterAddress] = useState('')
  const [balance, setBalance] = useState('')
  const [claimAbleSLP, setClaimAbleSLP] = useState('')
  const [deptSLP, setDeptSLP] = useState('')
  const [lifeTimeSLP, setLifeTimeSLP] = useState('')
  const [axieName, setAxieName] = useState('')
  const [axieSLP, setaxieSLP] = useState('')



  async function loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
    }
  }

    //load smart contract, display 'Ready!' when successfully loaded.
    async function load() {
        await loadWeb3();
        window.contract = await loadContract();

    }

    load();

    useEffect(() => {
      getAccounts();
      callGuildMaster();
      callBalance();
      }, [currentAccount])

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

    console.log(currentAccount)

  async function loadContract() {
      return await new window.web3.eth.Contract(
          abi
          , '0x85CbD680Cc1b3a899cf25A7c43395762b4F916eE');
  }


  async function scholarInfo() {
      await  window.contract.methods.scholarInfo(scholarUint).call()
      .then((res) => {
          setLifeTimeSLP(res.lifetimeSLP);
          setDeptSLP(res.deptSLP);
        })
      .catch(err => console.log(err));

      setClaimAbleSLP(fromExponential(parseInt(lifeTimeSLP, 10) - parseInt(deptSLP, 10)))
  }

  async function playerInfo() {
      await  window.contract.methods.playerInfo("0x75fa61C7F2D06ffCF2e8C77945D6687760fa399b").call()
          .then(res => setScholarUint(res))
          .catch(err => console.log(err))
      // console.log(scholarUint, "test")
  }
  
  
  //Function Send

  async function addScholar() {
      await  window.contract.methods.addScholar(roninAddress,
      roninAddress, percentShare).send({from: currentAccount})
  }

  async function changePlayer() {
      await  window.contract.methods.changePlayer(roninAddress,
      playerAddress).send({from: currentAccount})
  }

  async function removeOldPlayer() {
      await  window.contract.methods.removeOldPlayer(playerAddress).send({from: currentAccount})
  }

  async function deposit() {

      await  window.contract.methods.deposit(weiAmount).send({from: currentAccount})
  }

  async function withdraw() {

    await  window.contract.methods.withdraw(weiAmount).send({from: currentAccount})
  }

  async function claim() {
    await  window.contract.methods.claim().send({from: currentAccount})
  }

  async function updatePercentShare() {
      // updateStatus('Updating Percent Share...');
      await  window.contract.methods.updatePercentShare(roninAddress, percentShare).send({from: currentAccount})
  }

  async function callBalance() {

        await  window.contract.methods.balance().call()
            .then(res => setBalance(res))
            .catch(err => console.log(err))

  }

    async function callGuildMaster() {
    await  window.contract.methods.guildMaster().call()
        .then(res => setGuildMasterAddress(res))
        .catch(err => console.log(err))

    }


  const roninAddressInnput = <label>
        <input 
            type="text" 
            placeholder= "Ronin Address"
            onChange={(e) => setRoninAddress(e.target.value)}
            value={roninAddress}
        />
        </label>

  const playerAddressInput = <label>
        <input 
            type="text" 
            placeholder= "Player Address"
            onChange={(e) => setPlayerAddress(e.target.value)} 
            value={playerAddress}
        />
        </label>

  const  percentShareInput = <label>
            <input 
                type="text" 
                placeholder= "Percent Share"
                onChange={(e) => setPercentShare(e.target.value)} 
                value={percentShare}
            />
            </label>

  const weiAmountInput = <label>
        <input 
        type="text" 
        placeholder= "SLP amount"
        onChange={(e) => setWeiAmount((e.target.value))}
        value={weiAmount}
        />
        <br/>
        </label>

    const weiAmountInputW = <label>
    <input 
    type="text"
    placeholder= "SLP amount"
    onChange={(e) => setWeiAmount((e.target.value))}
    value={weiAmount}
    />
    </label>


  return (
    <div className="App">
        <Router>
        <div style={{ display: 'flex' }}>
            <Drawer
            style={{ width: '10rem' }}
            variant="persistent"
            anchor="left"
            open={true}
            classes={{ paper: classes.drawerPaper }}
            >
          <List>
            <Link to="/" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon/>
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItem>
            </Link>
            {(currentAccount === guildMasterAddress) &&
            <Link to="/add-scholar" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary={"Add Scholar"} />
              </ListItem>
            </Link>}
            {(currentAccount === guildMasterAddress) &&
            <Link to="/change-player" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <ChangeCircleIcon />
                </ListItemIcon>
                <ListItemText primary={"Change Player"} />
              </ListItem>
            </Link>}
            {(currentAccount === guildMasterAddress) &&
            <Link to="/remove-player" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <PersonRemoveIcon />
                </ListItemIcon>
                <ListItemText primary={"Remove Player"} />
              </ListItem>
            </Link>}
            {(currentAccount === guildMasterAddress) &&
            <Link to="/change-share-percent" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <PercentIcon />
                </ListItemIcon>
                <ListItemText primary={"Change Share Percent"} />
              </ListItem>
            </Link>}
            {(currentAccount === guildMasterAddress) &&
            <Link to="/deposit" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <PaymentsIcon />
                </ListItemIcon>
                <ListItemText primary={"Deposit"} />
              </ListItem>
            </Link>}

            {(currentAccount === guildMasterAddress) &&
            <Link to="/withdraw" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <TransitEnterexitIcon />
                </ListItemIcon>
                <ListItemText primary={"Withdraw"} />
              </ListItem>
            </Link>}

            <Link to="/scholar-info" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={"Scholar Info"} />
              </ListItem>
            </Link>

          </List>
        </Drawer>
        <Switch>
          <Route exact path="/">
          <div className="interfaceUI">
            <Container className="Home-css">
            {(roninAddress !== '') &&
            <React.Fragment>
                In-game Name: {axieName} <br/> 
            </React.Fragment>}

            {(roninAddress !== '') &&
                <React.Fragment>
                Total SLP: {axieSLP} <br/>
            </React.Fragment>}
                Pool Balance: {balance} <br/>
            </Container>
            </div>
          </Route>
          <Route exact path="/add-scholar">
            {(currentAccount === guildMasterAddress) && <div className="interfaceUI"><Container>
                <div className="card">
                    {roninAddressInnput} <br/>
                    {playerAddressInput} <br/>
                    {percentShareInput} <br/>
                    <button className="bn5" onClick={addScholar}>Add Scholar</button>
                </div>
            </Container></div>}
          </Route>
          <Route exact path="/change-player">
          {(currentAccount === guildMasterAddress) && <div className="interfaceUI"><Container>
                {roninAddressInnput} <br/>
                {playerAddressInput} <br/>
                <button className="bn5" onClick={changePlayer}>Change Player</button>
            </Container></div>}
          </Route>
          <Route exact path="/remove-player">
            {(currentAccount === guildMasterAddress) && <div className="interfaceUI"><Container>
                {playerAddressInput} <br/>
                <button className="bn5" onClick={removeOldPlayer}>Remove Old Player</button>
            </Container></div>}
          </Route>
          <Route exact path="/change-share-percent">
            {(currentAccount === guildMasterAddress) && <div className="interfaceUI"><Container>
                {roninAddressInnput} <br/>
                {percentShareInput} <br/>
                <button className="bn5" onClick={updatePercentShare}>Update Percent Share</button>
            </Container></div>}
          </Route>

          <Route exact path="/deposit">
          {(currentAccount === guildMasterAddress) && <div className="interfaceUI">
          <Container>
                {weiAmountInput}
                <button className="bn5" onClick={deposit}>Deposit</button>
                
            </Container></div> }
          </Route>
          <Route exact path="/withdraw">
            {(currentAccount === guildMasterAddress) && <div className="interfaceUI">
            <Container>
                {weiAmountInputW}
                <button className="bn5" onClick={withdraw}>withdraw</button>
            </Container></div>}
          </Route>
          <Route exact path="/scholar-info">
          <div className="interfaceUI">
            <Container className="Home-css">
                <p>Life Time SLP: {lifeTimeSLP}</p>
                <p>Claim Able SLP: {claimAbleSLP}</p>
                <p>Dept SLP: {deptSLP} </p>

                <button className="bn5" style={{marginRight: '10px'}} onClick={playerInfo}>Refresh Info</button>
                <button className="bn5" onClick={claim}>Claim</button>
            </Container>
          </div>
          </Route>
        </Switch>
      </div>
    </Router>
        
        {/* use or not? */}
        {/* <button onClick={callScholar}>scholarLength</button> */}
        {/* <button onClick={callBalance}>Balance</button>
        <button onClick={callClaimableTotal}>ClaimableTotal</button>
        <button onClick={callRoninInfo}>Ronin Info</button>
        <button onClick={callScholarInfo}>Scholar Info</button> */}

    </div>
  );
}

export default App;
