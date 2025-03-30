// routes/transactionRoutes.js
const express = require("express");
const TransactionContext = require("../models/TransactionContext");
const accounts = require("../models/accountsStore");
const router = express.Router();

// Array en memoria para almacenar las transacciones
const transactions = [];

// POST /transactions: crear una transacción
router.post("/", (req, res) => {
  const { sourceAccount, destinationAccount, amount } = req.body;
  
  // Validar que se envíen todos los campos
  if (!sourceAccount || !destinationAccount || amount === undefined) {
    return res.status(400).json({ error: "All fields (sourceAccount, destinationAccount, amount) are required." });
  }
  
  // Validar que el monto sea un número positivo
  if (typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ error: "Amount must be a positive number." });
  }
  
  // Validar que las cuentas no sean iguales
  if (sourceAccount === destinationAccount) {
    return res.status(400).json({ error: "Source and destination accounts must be different." });
  }
  
  // Validar que la cuenta origen exista y que pertenezca al usuario autenticado
  const srcAccount = accounts.find(acc => acc.accountNumber === sourceAccount);
  if (!srcAccount) {
    return res.status(400).json({ error: "Source account not found." });
  }
  if (srcAccount.owner !== req.user.username) {
    return res.status(403).json({ error: "You can only initiate transactions from your own account." });
  }
  
  // Validar que la cuenta destino exista (se valida también en TransactionContext, pero aquí damos un feedback temprano)
  const destAccount = accounts.find(acc => acc.accountNumber === destinationAccount);
  if (!destAccount) {
    return res.status(400).json({ error: "Destination account not found." });
  }
  
  // Para el tipo de cuenta, se asume que es el tipo de la cuenta origen
  const accountType = srcAccount.accountType;
  const transactionId = `TXN${Date.now()}`;
  const newTransaction = new TransactionContext(transactionId, sourceAccount, destinationAccount, accountType, amount);
  
  transactions.push(newTransaction);
  
  // Se inicia el procesamiento de la transacción: estado InProgress,
  // y luego se validará (después de 60 segundos, según la lógica del InProgressState)
  newTransaction.setState(newTransaction.status);
  
  return res.status(201).json({ message: "Transaction initiated.", transactionId });
});

// GET /transactions: listar las transacciones realizadas por el usuario autenticado
router.get("/", (req, res) => {
  // Filtrar las transacciones cuyo origen pertenezca al usuario autenticado
  const userTransactions = transactions.filter(txn => {
    const src = accounts.find(acc => acc.accountNumber === txn.sourceAccount);
    return src && src.owner === req.user.username;
  });
  
  const formattedTransactions = userTransactions.map(txn => txn.getTransactionDetails());
  return res.json({ transactions: formattedTransactions });
});

module.exports = router;