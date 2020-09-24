const Web3 = require('web3');

// const web3 = new Web3('http://localhost:8545');
const CreateClient = require('./web3provider');
const web3 = CreateClient(Web3);

const walletAddress = '0xdc76cd25977e0a5ae17155770273ad58648900d3';
const tokenAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7';

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
  console.log(result.toFixed());
});