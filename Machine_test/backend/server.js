const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));  
app.use("/api/agents", require("./routes/agentRoutes")); 
app.use("/api/upload", require("./routes/uploadRoutes"));

// Base API Response
app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 5600;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
