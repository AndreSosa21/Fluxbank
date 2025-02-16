// the main file of the project

const express = require("express");
const cors = require("cors");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/transactions", transactionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
