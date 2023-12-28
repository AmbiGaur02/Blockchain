// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract xyz {
    address company;
    address public unknown;
    ERC20Burnable public companyTokens;
    uint[] prices = [200, 400, 600];
    event Log(string message);
    mapping(address=>uint) public customerTokenBalances;
    mapping(address=>bool) paid;
    mapping(uint=>address) orders;
    mapping(uint=>uint) rewards;
    mapping(uint=>uint) tokenPayment;
    uint orderid;

    constructor( ERC20Burnable tokenAddress, address _unknown) {
        company = msg.sender;
        companyTokens = tokenAddress;
        unknown = _unknown;
        orderid = 0;
    }

    function receiveToContract() public {
        require(msg.sender==company);
        companyTokens.transferFrom(msg.sender, address(this), 400);
    }

    function purchase(uint idx ) public {
        require(idx>=1 && idx<=prices.length , "Enter a valid product id");
        orderid++;
        uint avTokens = getAllowance(msg.sender);
        
        uint ta;

        if(avTokens >= 30){
            ta = 30;
            emit Log("You earn a 60% discount ");
        }else if(avTokens >= 25){
            ta = 25;
            emit Log("You earn a 50% discount ");
        }else if(avTokens >= 20){
            ta = 20;
            emit Log("You earn a 40% discount ");
        }else if(avTokens >= 15){
            ta = 15;
            emit Log("You earn a 30% discount");
        }else if(avTokens >= 10){
            ta = 10;
            emit Log("You earn a 20% discount");
        }else if(avTokens >= 5){
            ta = 5;
            emit Log("You earn a 10% discount");
        }else {
            ta = 0;
            emit Log("Earn a few more coins to avail exciting discounts!!");
        }

        tokenPayment[orderid] = ta;

        orders[orderid] = msg.sender; 
        if(idx==1){
            rewards[orderid] = 2;
        }else if(idx==2){
            rewards[orderid] = 4;
        }else{
            rewards[orderid] = 6;
        }
    }

    function payForOrder(uint _oid) public {

        require(orders[_oid]==msg.sender);
        emit Log("Paying...");
        paid[msg.sender] = true;
        uint tokens = tokenPayment[_oid];
        companyTokens.burnFrom(address(this), tokens);
        customerTokenBalances[msg.sender] = customerTokenBalances[msg.sender] - tokens;
    }

    function giveConfirmation(uint _oid) public returns(uint){
        require(msg.sender==company,"Only company can give confirmation");
        address customer = orders[_oid];
        if(paid[customer]==false){
            emit Log("Please complete the payment to continue");
            return 0;
        }
        // companyTokens.approve(customer, customerTokenBalances[customer]);
        customerTokenBalances[customer]+=rewards[_oid];
        // companyTokens.approve(customer, customerTokenBalances[customer]);
        companyTokens.approve(customer,  customerTokenBalances[customer]);
        
        paid[customer] = false;
        return 0;
    }

    function getAllowance(address acc) public view returns(uint){
        uint a = companyTokens.allowance(address(this), acc);
        return a;
    }

}




