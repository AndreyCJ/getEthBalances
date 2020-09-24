const fs = require('fs');
// const { getAddressBalances } = require('eth-balance-checker/lib/web3');
const Web3 = require('web3');

// const BuildTransactionChecker = require('./transactionChecker');
// const CreateClient = require('./web3provider');
const web3 = new Web3('http://localhost:8545');

const walletAddress = '0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98';
const tokenAddress = ['0xdac17f958d2ee523a2206206994597c13d831ec7'];

// The minimum ABI to get ERC20 Token balance
let minABI = [
  // balanceOf
  {
    "constant": true,
    "inputs": [{
      "name": "_owner",
      "type": "address"
    }],
    "name": "balanceOf",
    "outputs": [{
      "name": "balance",
      "type": "uint256"
    }],
    "type": "function"
  },
  // decimals
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{
      "name": "",
      "type": "uint8"
    }],
    "type": "function"
  }
];

let contract = new web3.eth.Contract(minABI, tokenAddress);

async function getBalance() {
  balance = await contract.methods.balanceOf(walletAddress).call();

  return balance;
}

getBalance().then(function (result) {
  console.log(result);
});


// getAddressBalances(web3, address, tokens).then((balances) => {
//   console.log(balances); // { "0x0": "100", "0x456...": "200" }
// });

// const tokenInst = web3.eth.contract(tokenABI).at(tokenAddress);

// async function checkAllBalances(accounts) {
//   accounts.forEach(async (account, i) => {
//     const address = account.toLowerCase();
//     const balance = await web3.eth.getBalance(address);
//     console.log(
//       `${i}: ${address} \tbalance: ${web3.utils.fromWei(
//         balance,
//         'ether'
//       )} ether`
//     );
//   });
// }

// fs.readFile('./gethaddr.txt', 'utf8', (err, data) => {
//   if (err) {
//     return console.log(err);
//   }
//   const accounts = data.split('\r\n');
//   checkAllBalances(['0xa02cDD92fD5d015DD250ad7a605BAF39425Df222']);
// });