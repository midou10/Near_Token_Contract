import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import getConfig from './config.js';
import * as nearlib from 'near-api-js';

// Initializing contract
async function initContract() {
    window.nearConfig = getConfig(process.env.NODE_ENV || 'development')
    console.log("nearConfig", window.nearConfig);
    window.nearlib = nearlib; // Remove
    console.log('nearlib:', nearlib); // Remove

    // Initializing connection to the NEAR DevNet.
    const keyStore = new nearlib.keyStores.BrowserLocalStorageKeyStore();  // Remove
    console.log('keyStore:', keyStore);  // Remove
    const target = {
      deps: { 
        keyStore
      }
    };  // Remove
    console.log('target:', target); // Remove
    window.near = await nearlib.connect(Object.assign(target, window.nearConfig));  // Remove
    // window.near = await nearlib.connect(Object.assign({ deps: { keyStore: new nearlib.keyStores.BrowserLocalStorageKeyStore() } }, window.nearConfig)); // uncomment
    
    // Needed to access wallet login
    window.walletAccount = new nearlib.WalletAccount(window.near);
    
    // Getting the Account ID. If unauthorized yet, it's just empty string.
    window.accountId = window.walletAccount.getAccountId();

    // Initializing our contract APIs by contract name and configuration.
    let acct = await new nearlib.Account(window.near.connection, window.accountId);
    window.contract = await new nearlib.Contract(acct, window.nearConfig.contractName, {
        // View methods are read only. They don't modify the state, but usually return some value.
        viewMethods: ['welcome'],
        // Change methods can modify the state. But you don't receive the returned value when called.
        changeMethods: ['setGreeting'],
        // Sender is the account ID to initialize transactions.
        sender: window.accountId
    });
}

window.nearInitPromise = initContract().then(() => {
  ReactDOM.render(<App contract={window.contract} wallet={window.walletAccount} />,
    document.getElementById('root')
  );
}).catch(console.error)


// Notes
// do not attach references to nearAPI, contract, or wallet to the window global object
// when deploying to production

// is there a reason initContract has to execute first and render on success?
// should I just render the login page first?

// this snippet on DevTools gives me the user's wallet balance
// contract.account.state().then(state => {
//   let balance = nearlib.utils.format.formatNearAmount(state.amount, 2)
//   console.log(balance) // logs 500.00 NEAR
// })

// we're passing the contract and the wallet instances to the App component
// also need to pass in the nearAPI util functions to parse the yoctoNear amount!

// contract contains the following
  // the contractId
  // viewMethods and changeMethods
  // an account object, which contrains
    // account has prototype methods (stake, state, addKey, deleteKey, etc.)
    // accountId of the user (if signed in)
    // connection object, which contains
      // networkId
      // provider JsonRpcProvider and connectionUrl
        // provider has prototype methods (endJsonRpc, sendTransaction, txStatus, etc.)
      // signer object which points to the key-value store containing key pairs
        // signer has prototype methods (createKey, getPublicKey, signMessage)
        // keyStore object also has methods (getAccounts, getKey, setKey, etc.)
    
// walletAccount contains the following
  // prototype methods such as getAccountId, isSignedIn, requestSignIn
  // private objects _authData, _keyStore, _near, etc. which are not used in App.js
    // _authData has the user's accountId and keys (not sure if that's the private key)
    // _keyStore also points to local storage which has key value pairs (wallet auth key)
    // _near contains accountCreator, config, and connection objects