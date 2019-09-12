import web3 from "./web3";

import Charity from "./build/Charity.json";

const instance = new web3.eth.Contract(
  JSON.parse(Charity.interface), //contract ABI
  "0x56d5126d7e353b6370Fb5480D639BAF5893b964a" //the address that we deployed our contract on
);

export default instance;
