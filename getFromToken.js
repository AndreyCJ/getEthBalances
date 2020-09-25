const fs = require('fs');
const Web3 = require('web3');

const CreateClient = require('./web3provider');
const web3 = CreateClient(Web3);

// -- Get one eth wallet balance
// const balance = web3.eth.getBalance(
//   '0xdc76cd25977e0a5ae17155770273ad58648900d3'
// );
// balance.then((data) => console.log(web3.utils.fromWei(data, 'ether')));

function checkAllBalances(accounts) {
  accounts.map(async (account, i) => {
    try {
      if (typeof account !== 'object') {
        const address = account.toLowerCase();
        const balance = await web3.eth.getBalance(address);
        console.log(`${i}: ${address} \tbalance: ${web3.utils.fromWei( balance, 'ether')} ether`);
      }
    } catch (e) {
      console.log(e)
    }
  });
}

fs.readFile('./gethaddr.txt', 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
  }
  const sortedData = data.split('\r\n');
  const accounts = sortedData[0].split('\n');
  // console.log(accounts[0], accounts[120], accounts[500], accounts[7998])
  checkAllBalances(accounts);
});

// const walletAddress = '0xdc76cd25977e0a5ae17155770273ad58648900d3';
// const tokenAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7';

// The minimum ABI to get ERC20 Token balance
// let minABI = [
//   // balanceOf
//   {
//     constant: true,
//     inputs: [
//       {
//         name: '_owner',
//         type: 'address',
//       },
//     ],
//     name: 'balanceOf',
//     outputs: [
//       {
//         name: 'balance',
//         type: 'uint256',
//       },
//     ],
//     type: 'function',
//   },
//   // decimals
//   {
//     constant: true,
//     inputs: [],
//     name: 'decimals',
//     outputs: [
//       {
//         name: '',
//         type: 'uint8',
//       },
//     ],
//     type: 'function',
//   },
// ];

// let contract = new web3.eth.Contract(minABI, tokenAddress);

// async function getBalance() {
//   balance = await contract.methods.balanceOf(walletAddress).call();

//   return balance;
// }
// getBalance().then(function (result) {
//   console.log(result.toFixed());
// });