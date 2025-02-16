const TransactionState = require("./TransactionState");

class InProgressState extends TransactionState {
    process(transaction) {
        console.log(`La transacción ${transaction.transactionId} está en curso...`);
        setTimeout(() => {
            transaction.validateTransaction();
        }, 60000); // 1 minuto
    }
}

module.exports = InProgressState;