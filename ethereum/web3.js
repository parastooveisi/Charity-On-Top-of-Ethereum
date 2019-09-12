import Web3 from "web3";
//creating an instance and ripping out the Metamask injected provider
let web3; //we will modify this variable(let)

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") { //users with meta metamask
  //to check if we are in the browser and metamask is running
  //type of is for checking if variable id defined
  web3 = new Web3(window.web3.currentProvider);
} else { //without metamask
  // We are on the server OR the user is not running metamask
  const provider = new Web3.providers.HttpProvider( // creating our own provider
    "https://rinkeby.infura.io/SDM4Fg05tjRsEKoN1ZnE"
  );
  web3 = new Web3(provider);
}

export default web3;
