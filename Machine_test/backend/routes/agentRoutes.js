const express = require("express");
const router = express.Router();
const Agent = require("../models/Agent");

//  Route to add a new agent
router.post("/add", async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;
        
        // Check if agent already exists
        const existingAgent = await Agent.findOne({ email });
        if (existingAgent) {
            return res.status(400).json({ message: "Agent already exists" });
        }

        // Create new agent
        const newAgent = new Agent({ name, email, mobile, password });
        await newAgent.save();

        res.status(201).json({ message: "Agent added successfully", agent: newAgent });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

//  Route to get all agents
router.get("/", async (req, res) => {
    try {
        const agents = await Agent.find();
        res.status(200).json(agents);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
