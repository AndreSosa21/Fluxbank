// the main file of the project

const express = require("express");
const cors = require("cors");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173", "https://state-pattern-andresosa21-andresosa21s-projects.vercel.app"],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));

// Ruta de verificación para saber si el servidor está en línea
app.get("/", (req, res) => {
    res.json({ message: "🚀 Backend desplegado correctamente en Vercel!" });
});

// Rutas de transacciones
app.use("/transactions", transactionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


