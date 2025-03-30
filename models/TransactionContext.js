// models/TransactionContext.js
const InProgressState = require("./InProgressState");
const ApprovedState = require("./ApprovedState");
const RejectedState = require("./RejectedState");
const accounts = require("./accountsStore"); // Usamos el almacén en memoria

class TransactionContext {
  // Recibe: transactionId, sourceAccount, destinationAccount, accountType y amount
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
  
  // Validar la transacción:
  // - Verificar que la cuenta destino exista y su tipo coincida
  // - Verificar que la cuenta origen tenga fondos suficientes
  // Si todo es correcto, se actualizan los balances y se aprueba la transacción.
  validateTransaction() {
    const destAccount = accounts.find(acc => acc.accountNumber === this.destinationAccount);
    const sourceAcc = accounts.find(acc => acc.accountNumber === this.sourceAccount);
    
    if (!destAccount) {
      this.setState(new RejectedState("Destination account not found."));
    } else if (destAccount.accountType !== this.accountType) {
      this.setState(new RejectedState("The account type does not match with the destination account."));
    } else if (!sourceAcc) {
      this.setState(new RejectedState("Source account not found."));
    } else if (sourceAcc.balance < this.amount) {
      this.setState(new RejectedState("Insufficient funds in the source account."));
    } else {
      // Actualizar saldos: descontar de la cuenta origen y sumar a la cuenta destino
      sourceAcc.balance -= this.amount;
      destAccount.balance += this.amount;
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