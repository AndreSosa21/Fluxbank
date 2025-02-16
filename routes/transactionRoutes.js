const express = require("express");
const TransactionContext = require("../models/TransactionContext");
const router = express.Router();

const transactions = [];

router.post("/", (req, res) => {
    const { sourceAccount, destinationAccount, accountType, amount } = req.body;

    if (!sourceAccount || !destinationAccount || !accountType || !amount) {
        return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }

    if (typeof amount !== "number" || amount <= 0) {
        return res.status(400).json({ error: "El monto debe ser un número válido." });
    }
    if (sourceAccount === destinationAccount) {
        return res.status(400).json({ error: "La cuenta de origen y la cuenta de destino no pueden ser la misma." });
    }
    
    if( typeof accountType !== "string" || (accountType !== "ahorro" && accountType !== "corriente") || typeof sourceAccount !== "number" || typeof destinationAccount !== "number") {
        return res.status(400).json({ error: "El tipo de cuenta es inválido." });
    }

    const transactionId = `TXN${Date.now()}`;
    const newTransaction = new TransactionContext(transactionId, sourceAccount, destinationAccount, accountType, amount);

    transactions.push(newTransaction);
    newTransaction.setState(newTransaction.status); // Iniciar el estado en "en curso"

    res.status(201).json({ message: "Transacción en curso.", transactionId });
});

router.get("/", (req, res) => {
    const formattedTransactions = transactions.map(t => t.getTransactionDetails());
    res.json({ transactions: formattedTransactions });
});

module.exports = router;

