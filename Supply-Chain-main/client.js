const crypto = require("crypto");
const distributor = require("./distributor");
const order = require("./order");
const qrcode= require('qrcode-terminal');
const orderList=require("./orderList");


class client {
    constructor(cid, cname) {
        this.cid = cid;
        this.cname = cname;
        this.securityDeposit = 100;
        const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048
        });

        this.publicKey = publicKey;
        this.privateKey = privateKey;
    }

    placeOrder(productid, dlist) {
        if(this.securityDeposit==0){
            console.log("You don't have enough funds to deposit as security to place order.");
            return;
        }
        if(productid  > 15){
            console.log("Enter a valid product ID");
            return;
        }

        let d = this.findAvailableDistributor(dlist);
        let id = Math.floor((Math.random() * 100) + 1);
        let newOrder = new order(id, productid, this, d);
        this.securityDeposit = 0;
        d.securityDeposit = 0;
        d.free = 0;
        console.log(`Your orderid is ${newOrder.orderid}`);
        console.log(`Your distributor id is ${d.did}`);
        return newOrder;
    }

    receiveProduct (curr, key) {
        let receiveTime = Date.now();
        curr.rtimestamp = receiveTime;
        const sign = crypto.createSign('SHA256');
        sign.update(key.toString());
        sign.end();
        const signature = sign.sign(this.privateKey,'hex');
        curr.receiveSignature = signature;
    }

    findAvailableDistributor(dlist) {
        for(const d of dlist) {
            if(d.free == 1)
            return d;
        }
    }
    
    getStatus(curr) {
        const ds = curr.dispatchSignature;
        const rs = curr.receiveSignature;
        let text;
        if(ds.localeCompare("")===0){
            text = "Order not yet dispatched.";
        }else if(rs.localeCompare("")===0){
            text = `Your order has been dispatched at ${curr.dtimestamp} and will be delivered soon`;
        }else{
            text = `Order dispated at ${curr.dtimestamp} and received at ${curr.rtimestamp}`;
        }

        qrcode.generate(text, { small: true }, function (qrcode) {
        console.log(qrcode);
        });
    }
    
}

module.exports = client;