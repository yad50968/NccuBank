pragma solidity ^0.4.0;

contract NccuBank {
    address public minter;
    mapping (address => uint) public balances;

    event Sent(address from, address to, uint amount);

    function NccuBank() {
        minter = msg.sender;
    }

    function mint(address receiver, uint amount) returns (bool) {
        if (msg.sender != minter) return false;
        
        balances[receiver] += amount;
        
        return true;
    }

    function _send(address receiver, uint amount) returns (bool) {
        if (balances[msg.sender] < amount) return false;
        
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        
        Sent(msg.sender, receiver, amount);
        
        return true;
    }
    
    function check() constant returns (uint) {
        return balances[msg.sender];
    }
}