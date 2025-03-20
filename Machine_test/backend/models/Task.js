const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    phone: { type: String, required: true },
    notes: { type: String },
    assignedTo: { type: String },
});

module.exports = mongoose.model("Task", TaskSchema);
