const crypto = require("crypto");
const qrcode = require('qrcode-terminal');
class distributor{
    constructor(did, dname){
        this.did = did;
        this.dname = dname;
        const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048
        });
        this.free = 1;
        this.securityDeposit = 100;
        this.publicKey = publicKey;
        this.privateKey = privateKey;
    }

    dispatchOrder(curr) {
        const sign = crypto.createSign('SHA256');
        let dispatchTimestamp = Date.now();
        let dispatchTimestampString = dispatchTimestamp.toString();
        sign.update(dispatchTimestampString);
        sign.end();
        const signature = sign.sign(this.privateKey,'hex');
        curr.dtimestamp = dispatchTimestamp;
        curr.dispatchSignature = signature;
    }
    
    getStatus(curr) {
        const ds = curr.dispatchSignature;
        const rs = curr.receiveSignature;
        let text;
        if(ds.localeCompare("")===0){
            text = "Order not yet dispatched.";
        }else if(rs.localeCompare("")===0){
            text = `Order dispatched at ${curr.dtimestamp} is out for delivery`;
        }else{
            text = `Order dispated at ${curr.dtimestamp} and received at ${curr.rtimestamp}`;
        }

        qrcode.generate(text, { small: true }, function (qrcode) {
        console.log(qrcode);
        });
    }
}

module.exports = distributor;