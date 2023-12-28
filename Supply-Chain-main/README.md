# Supply-Chain
# Blockchain Assignment - 1

## Team members - (Group 4)
1) Prachi Shah (2021A7PS2589H)
2) Shramana Ghosh (2021A7PS1834H)
3) Ambi Gaur (2021A4PS2923H)
3) Harigovind R (2021A7PS2810H)

## Objective
* The objective of this project is to develop a secure supply chain management system using blockchain technology. This system aims to ensure the efficient and error-free distribution of products from manufacturers to clients through a network of distributors
* This assignment focuses on implementing the consensus algorithm - __Delegated Proof of Stake__ for SCM Blockchain.

## Delegated Proof of Stake (DPoS) algorithm 
In DPoS consensus users can either directly vote or give their voting power to another entity to vote on their behalf. The chosen witness are responsible for generating blocks by verifying transactions. If they verify and sign all transactions in a block, they are rewarded, which is usually shared with those who have voted for witness. If a witness fails to verify all transactions in the given time, block is missed, all transactions are left unverified and no reward is distributed to that witness. The reward is added up to reward of the next witness which verifies that block.

### Problem Statement
To prevent errors in the distribution of products, you need to build a supply chain management system using Blockchain technology with the following features:

1. To register new clients, distributors and a manufacturer (only one) to the system,
with the client and distributor depositing a security amount to a trusted third party.
2. To improve the security of the blockchain, incorporate a consensus algorithm
assigned to your group.
3. Implementing Merkle tree to calculate the hash of all the transactions in a block
and successfully mine the block with the transaction.
4. To view the current product status in the supply chain using a QR code.
5. At one time, the distributor can distribute a product to a dedicated client. Once
the transaction is confirmed by both the distributor and the consumer, then only
the next delivery can be taken by him/her.
6. A well-known issue is understood when:
a. The distributor has dispatched the product, and the client has received it,
but the client is denying it (The client is lying, but the distributor is not).
b. The distributor has not dispatched the product, and the client has not
received it (The client is not lying, but the distributor is).
Resolve both issues & after identifying the liar, make deductions from the security
deposit if the distributor or consumer is telling a lie.

### Solution
Our solution for secure supply chain management and blockchain verification ensures the integrity and transparency of the entire process. When a client places an order, only authorized distributors can accept it and sign a digital timestamp upon dispatch, providing indisputable proof of order fulfillment. To receive the product, clients use their private keys to digitally sign the order key, confirming receipt. We employ blockchain technology to validate these transactions, using the public keys of clients and distributors to check signatures. Valid transactions are added to a mined block, while invalid ones result in the forfeiture of a security deposit. This multi-layered approach guarantees the security of the supply chain, prevents fraud, and maintains trust throughout the process.


## How to run
```bash
     node test.js
```
## Required installation
```bash
     npm install readline-sync
     npm install qrcode-terminal
     npm install crypto
     npm install js-sha256
```
## Screenshots of the working application

### Register Distributor<br>
![WhatsApp Image 2023-10-02 at 7 33 46 PM](https://github.com/pks03/Supply-Chain/assets/115401101/8a529d79-cd25-4dfb-8514-ba9f83a2d146)

### Register Client<br>
![WhatsApp Image 2023-10-02 at 7 35 45 PM](https://github.com/pks03/Supply-Chain/assets/115401101/2e64869e-f804-4fba-b069-486c997ea3af)

### Client Placing an order
![WhatsApp Image 2023-10-02 at 7 38 04 PM](https://github.com/pks03/Supply-Chain/assets/115401101/04d52a39-adff-4c19-af11-e8baec01f265)

### Distributor dispatching the order
![WhatsApp Image 2023-10-02 at 7 46 54 PM](https://github.com/pks03/Supply-Chain/assets/115401101/71a5e66c-bf4e-48b9-8167-8ba0eabc7041)

### Distributor trying to view order status
![WhatsApp Image 2023-10-02 at 7 49 52 PM](https://github.com/pks03/Supply-Chain/assets/115401101/1f7a17ef-f26b-497b-a152-822d2b519d84)

### Client has not received the order so there are no verified transactions yet hence block can't be mined
![WhatsApp Image 2023-10-02 at 7 50 58 PM](https://github.com/pks03/Supply-Chain/assets/115401101/3808b405-f0aa-4f3d-ab37-ca596ef09aad)

### Client confirms delivery of order
![WhatsApp Image 2023-10-02 at 7 54 55 PM](https://github.com/pks03/Supply-Chain/assets/115401101/a540dfec-6bd7-42cb-b736-dbfbb89977e2)

### Block is mined with valid transaction
![WhatsApp Image 2023-10-02 at 7 56 46 PM](https://github.com/pks03/Supply-Chain/assets/115401101/38787bc6-529f-4809-9f7a-280d81a03793)
