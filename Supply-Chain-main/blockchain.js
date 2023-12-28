const orderList = require("./orderList");
const distributorList = require("./distributorList");
const sha256 = require('js-sha256');
const crypto = require("crypto");
const Block = require("./block");
const clientList = require("./clientList");
const readlineSync = require('readline-sync');
const client = require("./client");
const distributor = require("./distributor");
class blockchain {
    constructor() {
    this.chain = []; 
    this.verifiedTransactions = [];
    this.nodes = new Set();
    this.all_nodes = [];
    this.starNodespool = [];
    this.clientList = new clientList();
    this.distributorList = new distributorList();
    this.orderList = new orderList();
    this.validator = null;
    }

    merkleRoot(_leafnodes) {
        const leafNodes = _leafnodes;
        let nodePerItreration = leafNodes;

        let nodeArray = [];
        let low = 0;
        let h = low+1; 
        let i = 0;
        let j = 0;
        while(j < leafNodes){
            nodeArray[j] =  sha256(JSON.stringify(this.verifiedTransactions[j]));
            j++;
        }

        while(nodePerItreration >1){//Loop executes untill we get the merkel root. Which means one hash node in merkel root level 

            if(nodePerItreration% 2 == 0){ 
                while(h<=nodePerItreration-1){
                  nodeArray[i] =  sha256(nodeArray[low] + nodeArray[h] + Date.now());
                  low = h+1;
                  h = low + 1;
                  i++;
              }
              nodePerItreration = nodePerItreration/2;
          }
          else {
  
                while(h<=nodePerItreration-1){
                  nodeArray[i] =  sha256(nodeArray[low] + nodeArray[h] + Date.now());
                  low = h+1;
                  h = low + 1;
                  i++;
                  if(low == nodePerItreration - 1){
                      h = low ;
                      continue;
                  }
              }
              nodePerItreration = (nodePerItreration + 1)/2;
          }

        }
        
        return [nodeArray[0]];

    }

    add_node(nodeid, stake) {
        const nid = nodeid;
        const authority = stake;
        this.nodes.add([nid, authority]);
    }
    selectdelegates() {
        const nodesArray = Array.from(this.nodes); // Convert Set to Array for easy random selection
        const numberOfNodesToSelect = 3;
        const selectedNodes = [];

        // Ensure there are enough nodes in the set
        if (nodesArray.length >= numberOfNodesToSelect) {
            while (selectedNodes.length < numberOfNodesToSelect) {
                const randomIndex = Math.floor(Math.random() * nodesArray.length);
                const randomNode = nodesArray.splice(randomIndex, 1)[0]; // Remove selected node from array
                selectedNodes.push(randomNode);
            }
        } else {
            console.log("Not enough nodes to select from.");
        }

        this.starNodespool = selectedNodes;
    }
    conductInternalVoting() {
        let votes = new Map(); // Map to store votes with node IDs as keys and vote counts as values

        // Initialize vote counts to zero for all nodes
        this.starNodespool.forEach(node => {
            const [nodeId] = node;
            votes.set(nodeId, 0); // Initialize votes to zero
        });

        // Simulate voting based on voters' stakes
        this.starNodespool.forEach(node => {
            const [voterId, voterStake] = node;
            const availableNodes = Array.from(this.starNodespool).filter(node => node[0] !== voterId);
            if (availableNodes.length > 0) {
                const randomNode = availableNodes[Math.floor(Math.random() * availableNodes.length)];
                const votedNodeId = randomNode[0]; // Get a random node to vote for

                // Add voter's stake to the voted node's vote count
                votes.set(votedNodeId, votes.get(votedNodeId) + voterStake);
            }
        });

        // Display the voting results
        console.log("Voting Results:");
        for (const [nodeId, voteCount] of votes.entries()) {
            console.log(`Node ${nodeId}: ${voteCount} votes`);
        }

        // Find the node with the most votes
        let maxVotes = 0;
        let validatorNode = null;

        for (const [nodeId, voteCount] of votes.entries()) {
            if (voteCount > maxVotes) {
                maxVotes = voteCount;
                validatorNode = nodeId;
            }
        }
        this.validator=validatorNode;

        if (validatorNode) {
            console.log(`Node ${validatorNode} is selected as the validator with ${maxVotes} votes.`);
            // Set the validator in your blockchain data structure for further use
            // For example: this.validator = validatorNode;
        } else {
            console.log("No validator selected.");
        }
    }

    
    add_vote() {
        // Copy all nodes from the set to an array
        this.all_nodes = Array.from(this.nodes);
    
        // Iterate over each node in the array
        for (const node of this.all_nodes) {
            // Create a shallow copy of the node array
            const y = [...node];
            // Add a random number (between 0 and 100) multiplied by the node's stake to the copied array
            y.push(node[1] * Math.floor(Math.random() * 101));
            // Push the modified array to the voteNodespool array
            this.voteNodespool.push(y);
        }
    
        // Log the voteNodespool array to the console
        console.log(this.voteNodespool);
    }

    selection() {
        // Sort voteNodespool array in descending order based on the third element of each node array
        this.starNodespool = [...this.voteNodespool].sort((a, b) => b[2] - a[2]);
        console.log(this.starNodespool);
    
        // Select the top 3 nodes with the highest voting values
        for (let x = 0; x < 3; x++) {
            this.superNodespool.push(this.starNodespool[x]);
        }
        console.log(this.superNodespool);
    
        // Extract the addresses of the selected nodes and add them to the validator array
        for (const y of this.superNodespool) {
            this.validator.push(y[0]);
        }
        console.log(this.validator);
    }
    
    verifyOrders() {
        for(const o of this.orderList.list) {
            let a = this.verifyTransaction(o);
            if(a) {
                this.verifiedTransactions.push(this.generateOrderHash(o));
            }
        }
    }


    verifyTransaction(curr) {
        // console.log(typeof(curr));
        // console.log(curr);
        // console.log(typeof(curr.receiveSignature));
        // console.log(typeof(curr.dtimestamp));

     
        const verify2 = crypto.createVerify('SHA256');
        verify2.update(curr.dtimestamp.toString());
        verify2.end();
        let distributorVerify = verify2.verify(curr.currDistributor.publicKey, curr.dispatchSignature,'hex');

        const verify1 = crypto.createVerify('SHA256');
        verify1.update(curr.clientKey.toString());
        verify1.end();
        let clientVerify = verify1.verify(curr.currClient.publicKey, curr.receiveSignature,'hex');

        if(distributorVerify && clientVerify){
            curr.currDistributor.securityDeposit = 100;
            curr.currClient.securityDeposit = 100;
            curr.currDistributor.free = 1;
            return true;
        }else if(distributorVerify){
            curr.currDistributor.securityDeposit = 100;
            console.log("The client is wrong");
            return false;
        }else if(clientVerify){
            curr.currClient.securityDeposit = 100;
            console.log("The distributor is lying");
            return false;
        }else{ 
            return false;
        }
    }

    generateOrderHash(order1) {
        const dataAsString = order1.orderid+order1.productid+order1.dtimestamp.toString() + order1.clientKey.toString() + order1.dispatchSignature+order1.receiveSignature;
        const hash = sha256(dataAsString); 
        return hash;
    }

    mine(nodeid) {
        if(this.validator===nodeid){
                this.verifyOrders();
                if(this.verifiedTransactions.length > 0) {
                    let lastBlock = this.chain[this.chain.length-1];
                    let prevHash = lastBlock.hash;
                    let newBlock = Block.createNewBlock(this.chain.length + 1, prevHash, this.merkleRoot(this.verifiedTransactions.length));
                    this.chain.push(newBlock);
                    console.log(`Block mined by node ${nodeid}`);
                    console.log(this.chain);
                    this.verifiedTransactions = [];
                    this.starNodespool=[];
                    this.validator=null;
                }else {
                console.log("Not enough orders to mine a block");
            }
        }else{
            console.log("You are not eligible to mine a block");
        }
           
    }
}

module.exports = blockchain;

// const ch = new blockchain();

// let d1 = new distributor(1,"prachi");
// ch.distributorList.addDistributor(d1);
// console.log(ch.distributorList);

