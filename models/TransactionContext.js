const InProgressState = require("./InProgressState");
const ApprovedState = require("./ApprovedState");
const RejectedState = require("./RejectedState");
const accounts = require("../accounts/accounts.json").accounts;

class TransactionContext {
    // The constructor receives the transactionId, sourceAccount, destinationAccount, accountType, and amount.
    constructor(transactionId, sourceAccount, destinationAccount, accountType, amount) {
        this.transactionId = transactionId;
        this.sourceAccount = sourceAccount;
        this.destinationAccount = destinationAccount;
        this.accountType = accountType;
        this.amount = amount;
        this.status = new InProgressState();
        this.time = new Date().toLocaleTimeString();
        this.date = new Date().toLocaleDateString();
    }
    // The setState method receives a state and sets the status of the transaction to that state.

    setState(state) {
        this.status = state;
        this.status.process(this);
    }
    // The validateTransaction method checks if the destination account exists and if the account type matches the destination account type. If the destination account does not exist, the transaction is rejected with the message "Cuenta destinataria no existe." If the account type does not match, the transaction is rejected with the message "El tipo de cuenta no coincide con la cuenta destinataria."

    validateTransaction() {
        const destinationAccount = accounts.find(acc => acc.accountNumber === this.destinationAccount);

        if (!destinationAccount) {
            this.setState(new RejectedState("Destination account not found."));
        } else if (destinationAccount.accountType !== this.accountType) {
            this.setState(new RejectedState("The account type does not match with the number account."));
        } else {
            this.setState(new ApprovedState());
        }
    }
    // The getTransactionDetails method returns an object with the transaction details.

    getTransactionDetails() {
        return {
            transactionId: this.transactionId,
            sourceAccount: this.sourceAccount,
            destinationAccount: this.destinationAccount,
            accountType: this.accountType,
            amount: this.amount,
            status: this.status.constructor.name.replace("State", "").toLowerCase(),
            time: this.time,
            date: this.date
        };
    }
}

module.exports = TransactionContext;