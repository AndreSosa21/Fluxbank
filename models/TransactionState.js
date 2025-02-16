class TransactionState {
    process(transaction) {
        throw new Error("Método 'process' debe ser implementado.");
    }
}

module.exports = TransactionState;