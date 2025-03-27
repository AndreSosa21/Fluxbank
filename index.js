// the main file of the project
const loginRouter = require("./models/login");
const registerRouter = require("./models/register");
const {usersRouter, profileRouter} = require("./models/users");
const  authenticate  = require("./middlewares/Authentication");



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



// server online verification
app.get("/", (req, res) => {
    res.json({ message: "🚀 Backend desplegado correctamente en Vercel!" });
});
// login route
app.use("/login", loginRouter);
// Users routes
app.use("/users", usersRouter);

// profile route
app.use("/profile", profileRouter);

// Transaction routes
app.use("/transactions", authenticate, transactionRoutes);

// Register route
app.use("/register", registerRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


