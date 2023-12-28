const blockchain = require("./blockchain");
const Block = require("./block");
const VerifiedOrdersBlockchain = new blockchain();
const client = require("./client");
const distributor = require("./distributor");
const readlineSync = require('readline-sync');

// const clientList = require("./clientList");
// const distributorList = require("./distributorList");
// const orderList = require("./orderList");

class test{

    constructor() {
        const products = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
        this.initializeBlockchain();
    }

    initializeBlockchain() {
        VerifiedOrdersBlockchain.chain.push(Block.createNewBlock(1,0,0));
    }
    printStartMenu() {
        console.log("WELCOME!!");
        console.log("Choose option required")
        console.log("Enter a number for your requirement");
        console.log("Choose 1 to login as admin");
        console.log("Choose 2 to login as user");
        console.log("Enter as node for mining");
    }

    printAdminMenu(){
        console.log("Choose 1 to add a distributor");
        console.log("Choose 2 to add a client");
        console.log("Choose 3 to add a node")
    }
    printUserMenu(){
        console.log("Choose 1 to login as a distributor");
        console.log("Choose 2 to login as a customer");
    }
    printClientMenu() {
        console.log("What do you want to do?");
        console.log("Choose 1 to view available products and place order");
        console.log("Choose 2 to receive and cofirm delivery");
        console.log("Choose 3 to view current order status");
    }

    printDistributorMenu() {
        console.log("What do you want to do?");
        console.log("Choose 1 to dispatch order");
        console.log("Choose 2 to view current order status");
    }

    test() 
    {
        VerifiedOrdersBlockchain.add_node(1, 100);
    VerifiedOrdersBlockchain.add_node(2, 200);
    VerifiedOrdersBlockchain.add_node(3, 200);
    VerifiedOrdersBlockchain.add_node(4, 100);
    VerifiedOrdersBlockchain.add_node(5, 150);

    
        while(true){
            this.printStartMenu();
            let utype;
            utype = parseFloat(readlineSync.question("Enter your option "));
            switch(utype) {
                case 1: 
                    this.printAdminMenu();
                    let ch1;
                    ch1=parseFloat(readlineSync.question("Enter your option "));
                    switch(ch1){
                        case 1:
                            let dist=VerifiedOrdersBlockchain.distributorList.registerDistributor();
                            VerifiedOrdersBlockchain.distributorList.addDistributor(dist);
                            break;
                        case 2:
                            let cli=VerifiedOrdersBlockchain.clientList.registerClient();
                            VerifiedOrdersBlockchain.clientList.addClient(cli);
                            break;
                        case 3:
                            let num1 = parseFloat(readlineSync.question("Enter nodeid: "));
                            let num2 = parseFloat(readlineSync.question("Enter stake: "));
                            VerifiedOrdersBlockchain.add_node(num1,num2);
                            break;
                    }
                        break;

                case 2: 
                    this.printUserMenu();
                    let ch2;
                    ch2=parseFloat(readlineSync.question("Enter your option "));
                    switch(ch2){
                        case 1:
                            let di= parseFloat(readlineSync.question("Enter your id: "));
                            this.printDistributorMenu();
                            let duser;
                            for (const d of VerifiedOrdersBlockchain.distributorList.list)
                            {
                                if(di==d.did)
                                {
                                    duser=d;
                                }
                            }
                            let cho1;
                            cho1=parseFloat(readlineSync.question("Enter your option "));
                            switch(cho1){
                                case 1:
                                    for (const o of VerifiedOrdersBlockchain.orderList.list)
                                    {
                                        if(di==o.currDistributor.did)
                                        {
                                            duser.dispatchOrder(o);
                                        }
                                    }
                                    break;
                                case 2:
                                    for (const o of VerifiedOrdersBlockchain.orderList.list)
                                    {
                                        if(di==o.currDistributor.did)
                                        {
                                            duser.getStatus(o);
                                        }
                                    }
                                    break;                                  
                            }
                            break;
                        case 2:
                            let ci=parseFloat(readlineSync.question("Enter your id: "));
                            this.printClientMenu();                            
                            let cuser;
                            for (const c of VerifiedOrdersBlockchain.clientList.list)
                            {
                                if(ci===c.cid)
                                {
                                    cuser=c;
                                }
                            }
                            let cho2;
                            cho2=parseFloat(readlineSync.question("Enter your option "));
                            switch(cho2){
                                case 1:
                                    console.log("List of products:");
                                    console.log("1 2 3 4 5 6 7 8 9 10 11 12 13 14 15");
                                    let pi=parseFloat(readlineSync.question("Enter the needed product id "));
                                    let o=cuser.placeOrder(pi,VerifiedOrdersBlockchain.distributorList.list);
                                    VerifiedOrdersBlockchain.orderList.addorder(o);
                                    break;
                                case 2:
                                    if(VerifiedOrdersBlockchain.orderList.list.length>0)
                                    {
                                    for (const o of VerifiedOrdersBlockchain.orderList.list)
                                    {
                                        if(ci===o.currClient.cid)
                                        {
                                            cuser.receiveProduct(o,o.clientKey);
                                        }
                                    }
                                    }
                                    else
                                    {
                                        console.log("No orders yet");
                                    }
                                    break;
                                case 3:
                                    for (const o of VerifiedOrdersBlockchain.orderList.list)
                                    {
                                        if(ci==o.currClient.cid)
                                        {
                                            cuser.getStatus(o);
                                        }
                                    }
                                    break;  

                            }
                            break;
                        
                    }
                    break;
                case 3:
                    VerifiedOrdersBlockchain.selectdelegates();
                    VerifiedOrdersBlockchain.conductInternalVoting();
                    let nid=parseFloat(readlineSync.question("Enter the node id "));
                    VerifiedOrdersBlockchain.mine(nid)
                    break;
                

            }
        }
    }
}


const test1 = new test();
test1.test();
