//SPDX-License-Identifier: MIT

pragma solidity >=0.8.9;

contract FirstEtherBank {

    mapping (address => uint) balance;
    
    event fundsDeposited(address indexed depositor, uint amountDeposited);
    event fundsWithdrawn(address indexed withdrawer, uint amountWithdrawn);
    event fundsTransferred(address indexed sender, address indexed recipient, uint amountTransferred); 

    function deposit() public payable {
        balance[msg.sender] += msg.value;
        emit fundsDeposited(msg.sender, msg.value); 
    }

    function getBalance() public view returns (uint) {
        return balance[msg.sender]; 
    }

    function withdraw(uint _amount) public {
        require(balance[msg.sender] >= _amount, "Insufficient funds!");
        balance[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount); 
        emit fundsWithdrawn(msg.sender, _amount); 
    }

    function transfer(address _to, uint _amount) public {
        require(balance[msg.sender] >= _amount, "Insufficient funds!");
        require(msg.sender != _to, "Don't send funds to yourself!"); 

        uint prevBalance = balance[msg.sender]; 
        balance[msg.sender] -= _amount;
        payable(_to).transfer(_amount);

        assert( balance[msg.sender] == prevBalance - _amount);
        emit fundsTransferred(msg.sender, _to, _amount);  
    }

    function getContractBalance() public view returns (uint){
        return address(this).balance;
    }

}  