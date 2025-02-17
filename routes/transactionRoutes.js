const express = require("express");
const TransactionContext = require("../models/TransactionContext");
const router = express.Router();

const transactions = [];
// The POST endpoint receives the sourceAccount, destinationAccount, accountType, and amount from the request body. It validates the request body and creates a new transaction with a unique transactionId. The transaction is added to the transactions array and the transaction status is set to InProgressState. The transaction state is then set to the current status. If any of the required fields are missing, the endpoint returns a 400 status code with an error message. If the amount is not a valid number or is less than or equal to 0, the endpoint returns a 400 status code with an error message. If the sourceAccount and destinationAccount are the same, the endpoint returns a 400 status code with an error message. If the accountType is not "ahorros" or "corriente", the endpoint returns a 400 status code with an error message.
router.post("/", (req, res) => {
    const { sourceAccount, destinationAccount, accountType, amount } = req.body;

    if (!sourceAccount || !destinationAccount || !accountType || !amount) {
        return res.status(400).json({ error: "You must complete all the fields." });
    }

    if (typeof amount !== "number" || amount <= 0) {
        return res.status(400).json({ error: "The amount must be a valid number." });
    }
    if (sourceAccount === destinationAccount) {
        return res.status(400).json({ error: "The source account and the destination account cannot be equal." });
    }
    
    if( typeof accountType !== "string" || (accountType !== "ahorros" && accountType !== "corriente")) {
        return res.status(400).json({ error: "Type of account invalid." });
    }

    const transactionId = `TXN${Date.now()}`;
    const newTransaction = new TransactionContext(transactionId, sourceAccount, destinationAccount, accountType, amount);

    transactions.push(newTransaction);
    newTransaction.setState(newTransaction.status); 

    res.status(201).json({ message: "Transaction in progress.", transactionId });
});

// The GET endpoint returns an array of all transactions with their details. The transactions are formatted using the getTransactionDetails method of the TransactionContext class.
router.get("/", (req, res) => {
    const formattedTransactions = transactions.map(t => t.getTransactionDetails());
    res.json({ transactions: formattedTransactions });
});

module.exports = router;

