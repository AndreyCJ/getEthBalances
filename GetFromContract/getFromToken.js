const fs = require('fs');
const Web3 = require('web3');

const CreateClient = require('../web3provider');
const web3 = CreateClient(Web3);

// -- Get one eth wallet balance
// const balance = web3.eth.getBalance(
//   '0xdc76cd25977e0a5ae17155770273ad58648900d3'
// );
// balance.then((data) => console.log(web3.utils.fromWei(data, 'ether'))).catch(e => console.log(e));

function checkAllBalances(accounts) {
  accounts.map(async (account, i) => {
    try {
      if (typeof account !== 'object' && account !== '') {
        const address = account.toLowerCase();
        const balance = await web3.eth.getBalance(address);
        console.log(`${i}: ${address} \tbalance: ${web3.utils.fromWei( balance, 'tether')} ether`);
      }
    } catch (e) {
      console.log(e)
    }
  });
}

function checkAllBalancesByToken(accounts) {
  const tokenAddress = '0x1a37dd375096820a5fde14342720102c07100f26';
  const ABI = require('./USDT_ABI.json');

  accounts.map(async (account, i) => {
    try {
      if (typeof account !== 'object' && account !== '') {
        const USDContractInstance = await new web3.eth.Contract(ABI, tokenAddress);
        const balance = await USDContractInstance.methods.balanceOf(account).call();
        const USDT_BALANCE = await web3.utils.fromWei(balance, 'ether');
        console.log(`${i}: ${account} balance: ${USDT_BALANCE} USDT`);
      }
    } catch (e) {
      console.log(err);
    }
  })
}

fs.readFile('./addresses.txt', 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
  }
  const sortedData = data.split('\r\n');
  const accounts = sortedData[0].split('\n');
  checkAllBalancesByToken(accounts)
  // checkAllBalances(['0xDb258a7D1A6De686141d5dE489FdB3a96A008809']);
});

// const walletAddress = '0x632971640dcbe241a5773d10cd581b8593a4de47';
// const walletAddress = '0x3dd5a7c19c2226961df1f97644ab0c6dd8d2daa8';
// const tokenAddress = '0x1a37dd375096820a5fde14342720102c07100f26';
// const ABI = require('./USDT_ABI.json');

// contract.methods.balanceOf(walletAddress).call().then((bal) => console.log(bal))
// contract.balanceOf.call(walletAddress)
// async function getTokenBalance() {
//   try {
//     const USDContractInstance = await new web3.eth.Contract(ABI, tokenAddress);
//     const balance = await USDContractInstance.methods.balanceOf(walletAddress).call();
//     const USDT_BALANCE = await web3.utils.fromWei(balance, 'ether')
//     console.log(USDT_BALANCE)
//   } catch (err) {
//     console.log(err);
//   }
// }
// getTokenBalance();

// ---- GET FROM TOKEN IN TETHER (USDT)
// web3.eth.getBalance(contract.options.address)
//   .then(data => console.log(web3.utils.fromWei(data, 'tether')))
//   .catch(err => console.log(err));


// contract.methods.balanceOf(walletAddress).call((error, balance) => {
//   contract.methods.decimals().call((error, decimals) => {
//     balance = balance.div(10 ** decimals);
//     console.log(balance.toString());
//   });
// });

// Get ERC20 Token contract instance
// let contract = web3.eth.contract(minABI).at(tokenAddress);

// // Call balanceOf function
// contract.balanceOf(walletAddress, (error, balance) => {
//   // Get decimals
//   contract.decimals((error, decimals) => {
//     // calculate a balance
//     balance = balance.div(10**decimals);
//     console.log(balance.toString());
//   });
// });



// let contract = new web3.eth.Contract(minABI, tokenAddress);

// async function getBalance() {
//   balance = await contract.methods.balanceOf(walletAddress).call();

//   return balance;
// }
// getBalance().then(function (result) {
//   console.log(result.toFixed());
// });