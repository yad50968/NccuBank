pragma solidity ^0.4.0;

contract NccuBank {
    
       
    
    // 預設 nccubank 的貨幣 
    uint public nccubank_coin = 1000000000;
    
    // user 有多少 coin
    mapping (address => uint256) public balances;
    
    // user 的 某產品 的 address
    mapping (address => mapping (string => address))  who_buy_which_product;
    
    


    // 用來記錄 generate produtc1 的 event
    event generate_product1_event(address indexed from, uint _amount, uint _installments, address product1_address);
    
    
    string public product_1 = "product1";
    
    
    
    
    // 此合約的擁有者
    address private owner;

    // 儲存所有會員的餘額
    //mapping (address => uint256) private balances;

    // 事件們，用於通知前端 web3.js
    event DepositEvent(address indexed from, uint256 value, uint256 timestamp);
    event WithdrawEvent(address indexed from, uint256 value, uint256 timestamp);
    event TransferEvent(address indexed from, address to, uint256 value, uint256 timestamp);
    event generate_product1_terminal_event(address indexed from, uint amount,uint installments,uint have_installments);
    event generate_product1_maturity_event(address indexed from, uint amount,uint installments);

    // 建構子
    function NccuBank() {
        owner = msg.sender;
    }

    // 存錢進去
    function deposit() payable {
        balances[msg.sender] += msg.value;

        DepositEvent(msg.sender, msg.value, now);
    }

    // 提錢出來
    function withdraw(uint256 etherValue) {
        uint256 weiValue = etherValue * 1 ether;

        if (balances[msg.sender] < weiValue) {
            throw;
        }

        if (!msg.sender.send(weiValue)) {
            throw;
        }

        balances[msg.sender] -= weiValue;

        WithdrawEvent(msg.sender, etherValue, now);
    }

    // 轉帳
    function transfer(address to, uint256 etherValue) {
        uint256 weiValue = etherValue * 1 ether;

        if (balances[msg.sender] < weiValue) {
            throw;
        }

        balances[msg.sender] -= weiValue;
        balances[to] += weiValue;

        TransferEvent(msg.sender, to, etherValue, now);
    }

    // 檢查銀行帳戶餘額
    function checkBankBalance() constant returns (uint256) {
        return balances[msg.sender];
    }

    // 檢查以太帳戶餘額
    function checkEtherBalance() constant returns (uint256) {
        return msg.sender.balance;
    }
    
    
    
    function show_product1_address(address user) constant returns(address){
        return who_buy_which_product[user][product_1];   
    }

    function create_product_1(address whobuy,uint256 amount, uint256 installments) {
        
        // 如果user沒錢 throw
        if (balances[whobuy] < amount) {
            throw;
        }
        
        balances[whobuy] -= amount;
        nccubank_coin += amount;
        
        // 產出 product1 contract
        Product1 product1_contract = new Product1(whobuy, amount, installments, this);
        who_buy_which_product[whobuy][product_1] = product1_contract.contractAddress();

        // 發送 event
        generate_product1_event(whobuy, amount, installments, product1_contract.contractAddress());
        
    }
    
    // 完成 要把利息加本金送給買家
    function product1_maturity(address whobuy, uint256 amount,uint256 installments){
        
        who_buy_which_product[whobuy][product_1] = 0x0;
        nccubank_coin -= amount + amount * installments/100;  
        balances[whobuy] += amount + amount * installments/100;
        generate_product1_maturity_event(whobuy,amount,installments);

    }
    // 提前解約 要退回剩下錢
    function product1_terminal(address whobuy, uint amount,uint installments, uint have_installments){
        
        who_buy_which_product[whobuy][product_1] = 0x0;
        nccubank_coin -= amount*(have_installments)/installments;
        balances[whobuy] += amount*(have_installments)/installments;
        generate_product1_terminal_event(whobuy,amount,installments,have_installments);

    }
    
    
}


contract Product1 {
    
    
    address nccubank_address;
    address who_buy;
    uint amount;
    uint installments;
    
    
    function Product1(address _who_buy, uint256 _amount, uint256 _installments, address _nccubank_address) {
        
        who_buy = _who_buy;
        nccubank_address = _nccubank_address;
        amount = _amount;
        installments = _installments;
        
    }
    
    // 回傳此合約address
    function contractAddress() constant returns(address) {
        return this;
    }
    
    
    function terminal(uint256 have_installments){

        // 呼叫NccuBank合約
        NccuBank nb = NccuBank(nccubank_address);
        
        nb.product1_terminal(who_buy, amount, installments, have_installments);
        
        // 合約自殺
        suicide(0x0);
        
    }
    
    
    
    function maturity(){
        
        // 呼叫NccuBank合約
        NccuBank nb = NccuBank(nccubank_address);
        nb.product1_maturity(who_buy, amount, installments);
        
        
        
        // 合約自殺
        suicide(0x0);
        
    }
    
    
}