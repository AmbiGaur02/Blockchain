

class order{
    constructor(orderid, productid, currClient, currDistributor){
        this.orderid = orderid;
        this.productid = productid;
        this.currClient = currClient;
        this.currDistributor = currDistributor;
        this.clientKey = this.getRandomNumber(6);
        this.dtimestamp = 0;
        this.rtimestamp = 0;
        this.dispatchSignature = "";
        this.receiveSignature = "";
    }

    getRandomNumber(length) {
        const min = Math.pow(10, (length-1));
        const max = Math.pow(10, (length));
        return Math.floor(Math.random() * (max - min) + min);
    }

    
    // createOrder() {
    //     return new order(no, pid, c, d);
    // }
}

module.exports = order;