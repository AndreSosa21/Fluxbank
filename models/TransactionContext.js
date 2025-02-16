const InProgressState = require("./InProgressState");
const ApprovedState = require("./ApprovedState");
const RejectedState = require("./RejectedState");
const accounts = require("../accounts/accounts.json").accounts;

class TransactionContext {
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

    setState(state) {
        this.status = state;
        this.status.process(this);
    }

    validateTransaction() {
        const destinationAccount = accounts.find(acc => acc.accountNumber === this.destinationAccount);

        if (!destinationAccount) {
            this.setState(new RejectedState("Cuenta destinataria no existe."));
        } else if (destinationAccount.accountType !== this.accountType) {
            this.setState(new RejectedState("El tipo de cuenta no coincide con la cuenta destinataria."));
        } else {
            this.setState(new ApprovedState());
        }
    }

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