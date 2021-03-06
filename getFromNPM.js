const Web3 = require('web3');
const { getAddressBalances } = require('eth-balance-checker/lib/web3');

const CreateClient = require('./web3provider');
const web3 = CreateClient(Web3);

var addressesI = '0xa02cDD92fD5d015DD250ad7a605BAF39425Df222';
var tokensI = ['0xdac17f958d2ee523a2206206994597c13d831ec7'];

getAddressBalances(web3, addressesI, tokensI).then((balances) => {
  console.log(balances);
});
