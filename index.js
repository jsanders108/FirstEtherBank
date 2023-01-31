let account;
const connectMetamask = async () => {
if(window.ethereum !== "undefined") {
    const accounts = await ethereum.request({method: "eth_requestAccounts"});
    account = accounts[0];
    document.getElementById("userArea").innerHTML = `User Account: ${account}`;
    }
}

const connectContract = async () => {
    const ABI = [
        {
        "anonymous": false,
        "inputs": [
            {
            "indexed": true,
            "internalType": "address",
            "name": "depositor",
            "type": "address"
            },
            {
            "indexed": false,
            "internalType": "uint256",
            "name": "amountDeposited",
            "type": "uint256"
            }
        ],
        "name": "fundsDeposited",
        "type": "event"
        },
        {
        "anonymous": false,
        "inputs": [
            {
            "indexed": true,
            "internalType": "address",
            "name": "sender",
            "type": "address"
            },
            {
            "indexed": true,
            "internalType": "address",
            "name": "recipient",
            "type": "address"
            },
            {
            "indexed": false,
            "internalType": "uint256",
            "name": "amountTransferred",
            "type": "uint256"
            }
        ],
        "name": "fundsTransferred",
        "type": "event"
        },
        {
        "anonymous": false,
        "inputs": [
            {
            "indexed": true,
            "internalType": "address",
            "name": "withdrawer",
            "type": "address"
            },
            {
            "indexed": false,
            "internalType": "uint256",
            "name": "amountWithdrawn",
            "type": "uint256"
            }
        ],
        "name": "fundsWithdrawn",
        "type": "event"
        },
        {
        "inputs": [],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
        },
        {
        "inputs": [],
        "name": "getBalance",
        "outputs": [
            {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
        },
        {
        "inputs": [],
        "name": "getContractBalance",
        "outputs": [
            {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
        },
        {
        "inputs": [
            {
            "internalType": "address",
            "name": "_to",
            "type": "address"
            },
            {
            "internalType": "uint256",
            "name": "_amount",
            "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
        },
        {
        "inputs": [
            {
            "internalType": "uint256",
            "name": "_amount",
            "type": "uint256"
            }
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
        }
    ]; 
    const Address = "0x126A4ce17d7a058D6A10566aa6d07C02c003053b";
    window.web3 = await new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract(ABI, Address);
    document.getElementById("contractArea").innerHTML = "Connected to Bank";
}

const getBalance = async () => {
    const amountWei = await window.contract.methods.getBalance().call({from: account});
    const ethValue = ethers.utils.formatEther(amountWei);
    document.getElementById("balanceArea").innerHTML = `Your balance: ${ethValue} Goerli ETH`;
}

const depositEth = async () => {
    const amountEth = document.getElementById("depositInput").value;
    const weiValue = ethers.utils.parseUnits(amountEth,"ether")
    await window.contract.methods.deposit().send({from: account, value: weiValue});
}

const withdrawEth = async () => {
    const amountEth = document.getElementById("amountInput1").value;
    const weiValue = ethers.utils.parseUnits(amountEth,"ether")
    await window.contract.methods.withdraw(weiValue).send({from: account});
}

const transferEth = async () => {
    const amountEth = document.getElementById("amountInput2").value;
    const weiValue = ethers.utils.parseUnits(amountEth,"ether")
    const address = document.getElementById("addressInput").value;
    await window.contract.methods.transfer(address, weiValue).send({from: account});
}

const getContractBalance = async () => {
    const amountWei = await window.contract.methods.getContractBalance().call();
    const ethValue = ethers.utils.formatEther(amountWei);
    document.getElementById("contractBalanceArea").innerHTML = `Total contract balance: ${ethValue} Goerli ETH`;
}
