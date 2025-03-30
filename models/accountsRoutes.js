// routes/accountsRoutes.js
const express = require("express");
const router = express.Router();
const accounts = require("./accountsStore");

// POST /accounts: crea una cuenta nueva
router.post("/", (req, res) => {
  const { accountType, initialBalance } = req.body;
  
  // Validar que se envíen todos los campos
  if (!accountType || initialBalance === undefined) {
    return res.status(400).json({ error: "Both accountType and initialBalance are required." });
  }
  
  // Validar accountType
  if (accountType !== "corriente" && accountType !== "ahorros") {
    return res.status(400).json({ error: "Invalid account type. Must be 'corriente' or 'ahorros'." });
  }
  
  // Validar initialBalance: debe ser número y mayor o igual a 0
  if (typeof initialBalance !== "number" || initialBalance < 0) {
    return res.status(400).json({ error: "Initial balance must be a number greater or equal to 0." });
  }
  
  // Asignar el owner a partir del usuario autenticado
  const owner = req.user.username;
  // Generar un número de cuenta único (por ejemplo, concatenando "ACCT", timestamp y un número aleatorio)
  const accountNumber = "ACCT" + Date.now() + Math.floor(Math.random() * 1000);
  
  const newAccount = {
    accountNumber,
    accountType,
    balance: initialBalance,
    owner
  };
  accounts.push(newAccount);
  return res.status(201).json({ message: "Account created successfully.", account: newAccount });
});

module.exports = router;