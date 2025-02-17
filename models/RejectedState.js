const TransactionState = require("./TransactionState");

// This class represents the Rejected state of a transaction.
class RejectedState extends TransactionState {
    // The constructor receives a reason for the rejection.
    constructor(reason) {
        super();
        this.reason = reason;
    }

    process(transaction) {
        // Actualiza el estado y añade el motivo de rechazo en la transacción
        transaction.status = "rejected";
        transaction.rejectionReason = this.reason;
        console.log(`❌ Transaction ${transaction.transactionId} REJECTED: ${this.reason}`);
    }
}

module.exports = RejectedState;
