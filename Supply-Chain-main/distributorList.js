const distributor = require("./distributor");
const readlineSync = require('readline-sync');

class distributorList{
    constructor() { 
        this.list = [];
    }

    addDistributor(distributor) {
        this.list.push(distributor);
    }

    registerDistributor() {
        var userInput = {};
        userInput.did = this.list.length+1;
        console.log("enter your details to register");
        userInput.dname = readlineSync.question("Enter your name: ");

        var newDistributor = new distributor(userInput.did, userInput.dname);
        console.log(`Your identification no is ${userInput.did}`);
        return newDistributor;
    }

}

module.exports = distributorList;