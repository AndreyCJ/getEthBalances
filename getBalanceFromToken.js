var walletAddress = '0xdc76cd25977e0a5ae17155770273ad58648900d3';
var tokenAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7';

// The minimum ABI to get ERC20 Token balance
var minABI = [
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

var contract = new web3.eth.Contract(minABI, tokenAddress);

async function getBalance() {
  balance = await contract.methods.balanceOf(walletAddress).call();

  return balance;
}
getBalance().then(function (result) {
  console.log(result.toFixed());
});