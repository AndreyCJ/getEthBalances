'use strict';

module.exports = (Web3) => {
  const provider = new Web3.providers.HttpProvider(
    // 'http://localhost:8545'
    'https://rinkeby.infura.io/v3/980285561fcc4df884c5cea38760d6f7'
  );

  return new Web3(provider);
};