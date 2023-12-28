const sha256 = require('js-sha256');

class Block{
    constructor(index, merkleRoot, prevHash, timestamp) {
        this.index = index;
        this.merkleRoot = merkleRoot;
        this.prevHash = prevHash;
        this.timestamp = timestamp;
        this.hash = this.hashBlock(merkleRoot, prevHash, timestamp);
    }

    hashBlock(merkleRoot, prevHash, timestamp) {
        const dataAsString = prevHash + timestamp.toString() + merkleRoot ; //block headder inputed in sha256 to find block hash
        const hash = sha256(dataAsString); // finding hash using dataAaString as first-pre-image
        return hash;
    }

    static createNewBlock(idx, prevhash, merkleRoot) {
        let ts = Date.now();
        let nB = new Block(idx, merkleRoot, prevhash, ts);
        return nB;
    }

}

module.exports = Block;
