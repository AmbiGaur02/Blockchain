const client = require("./client");
const readlineSync = require('readline-sync');

class clientList {
    constructor() {
        this.list = [];
    }

    addClient(client){
        this.list.push(client);
    }

    registerClient(){
        var userInput = {};
        userInput.cid = this.list.length+1;
        console.log("enter your details to register");
        userInput.cname = readlineSync.question("Enter your name: ");
        var newClient = new client(userInput.cid, userInput.cname);
        console.log(`Your identification no is ${userInput.cid}`);
        return newClient;
    }

}

module.exports = clientList;