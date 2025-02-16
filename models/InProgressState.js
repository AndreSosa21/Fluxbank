const TransactionState = require("./TransactionState");
//this class represents the InProgress state of a transaction
class InProgressState extends TransactionState {
    process(transaction) {
        console.log(`The transaction ${transaction.transactionId} is in progress...`);
        // Validate the transaction after 60 seconds
        setTimeout(() => {
            transaction.validateTransaction();
        }, 60000); 
    }
}

module.exports = InProgressState;