const TransactionState = require("./TransactionState");
// This class represents the Rejected state of a transaction.
class RejectedState extends TransactionState {
    // The constructor receives a reason for the rejection.
    constructor(reason) {
        super();
        this.reason = reason;
    }

    process(transaction) {
        console.log(`❌ Transaction ${transaction.transactionId} REJECTED: ${this.reason}`);
    }
}

module.exports = RejectedState;