const TransactionState = require("./TransactionState");
// This class represents the Approved state of a transaction.
class ApprovedState extends TransactionState {
    process(transaction) {
        console.log(`✅ Transaction ${transaction.transactionId} APPROVED.`);
    }
}

module.exports = ApprovedState;