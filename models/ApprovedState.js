const TransactionState = require("./TransactionState");

class ApprovedState extends TransactionState {
    process(transaction) {
        console.log(`✅ Transaction ${transaction.transactionId} APPROVED.`);
    }
}

module.exports = ApprovedState;