'use strict';

module.exports = (web3) => {
  const account = '0x829dFD680701DA06DD1C71eB6Ed93D99645E3305'.toLowerCase();

  return async function checkLastBlock() {
    let block = await web3.eth.getBlock('latest');
    console.log(`[*] Searching block ${block.number}...`);
    if (block && block.transactions) {
      for (let txHash of block.transactions) {
        let tx = await web3.eth.getTransaction(txHash);
        if (account === tx.to.toLowerCase()) {
          console.log(`[+] Transaction found on block ${lastBlockNumber}`);
          console.log({
            address: tx.from,
            value: web3.utils.fromWei(tx.value, 'ether'),
            timestamp: new Date(),
          });
        }
      }
    }
  };
};
