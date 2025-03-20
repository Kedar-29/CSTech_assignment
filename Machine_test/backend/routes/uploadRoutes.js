const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const xlsx = require("xlsx");
const fs = require("fs");
const Task = require("../models/Task");

const router = express.Router();

// Ensure 'uploads/' directory exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            "text/csv",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.ms-excel",
        ];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error("Only CSV, XLSX, and XLS files are allowed"));
        }
        cb(null, true);
    },
});

// Upload & Process File
router.post("/", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });

        let data = [];
        const filePath = req.file.path;

        if (req.file.mimetype === "text/csv") {
            fs.createReadStream(filePath)
                .pipe(csv())
                .on("data", (row) => data.push(row))
                .on("end", async () => {
                    await processAndStoreData(data, res);
                    fs.unlinkSync(filePath); // Delete file after processing
                });
        } else {
            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
            await processAndStoreData(sheetData, res);
            fs.unlinkSync(filePath); // Delete file after processing
        }
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: "Error processing file" });
    }
});

// Function to Process & Save Data
const processAndStoreData = async (data, res) => {
    if (!Array.isArray(data) || data.length === 0) {
        return res.status(400).json({ error: "Invalid or empty file data" });
    }

    const agents = ["Agent A", "Agent B", "Agent C", "Agent D", "Agent E"];
    let distributedTasks = [];

    data.forEach((item, index) => {
        if (!item.FirstName || !item.Phone) return;

        const assignedAgent = agents[index % agents.length];

        const newTask = new Task({
            firstName: item.FirstName,
            phone: item.Phone,
            notes: item.Notes || "",
            assignedTo: assignedAgent,
        });

        distributedTasks.push(newTask);
    });

    await Task.insertMany(distributedTasks);
    res.json({ message: "File uploaded and tasks distributed!", distributedTasks });
};

module.exports = router;
