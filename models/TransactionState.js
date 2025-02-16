// this class is the base class for the transaction states
class TransactionState {
    process(transaction) {
        throw new Error("Method 'process' must be implemented.");
    }
}

module.exports = TransactionState;