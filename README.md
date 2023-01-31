This is an app which connects to a "First Ether Bank" smart contract deployed on Ethereum's Goerli testnet. In addition to checking balances, users can deposit, withdraw, and transfer Goerli ETH.

The app has multiple components. First is a Solidity bank contract, which was compiled and deployed to the Goerli Ethereum Testnet using Hardhat and Visual Studio Code. Next, the HTML, CSS and JavaScript files were connected to the Solidity bank contract on Goerli via Web3.js. 

To use the app, one needs to install Metamask to thier browser and connect it to the Goerli Ethereum testnet. This is key-- please don't send real ETH to this app's smart contract. If you do, it will be lost forever. 

Using Metamask, one can deposit Goerli ETH, withdraw it, transfer it, and check balances. 

The smart contract can be viewed on the Goerli Testnet Explorer at the following website: https://goerli.etherscan.io/address/0x126a4ce17d7a058d6a10566aa6d07c02c003053b
The app can be accessed at the following website: https://first-ethereum-bank.netlify.app/

