const order = require("./order");

class orderList {
    constructor() {
        this.list = [];
    }

    addorder(order) {
        this.list.push(order);
    }
}

module.exports = orderList;