const TransactionState = require("./TransactionState");
// This class represents the Rejected state of a transaction.
class RejectedState extends TransactionState {
    // The constructor receives a reason for the rejection.
    constructor(reason) {
        super();
        this.reason = reason;
    }

    process(transaction, res) { // ✅ Agregamos `res` como argumento
        // The process method logs a message with the transactionId and the reason for rejection.
        return res.status(400).json({ 
            error: `❌ Transaction ${transaction.transactionId} REJECTED: ${this.reason}` // ✅ Usamos template string con backticks
        });
    }
}

module.exports = RejectedState;