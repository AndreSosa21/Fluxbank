const TransactionState = require("./TransactionState");

class RejectedState extends TransactionState {
    constructor(reason) {
        super();
        this.reason = reason;
    }

    process(transaction) {
        console.log(`❌ Transacción ${transaction.transactionId} RECHAZADA: ${this.reason}`);
    }
}

module.exports = RejectedState;