import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const UploadCSV = () => {
    const [file, setFile] = useState(null);
    const [distributedTasks, setDistributedTasks] = useState([]);

    const handleFileUpload = async (e) => {
        e.preventDefault();

        if (!file) {
            alert("⚠️ Please select a file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:5600/api/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("File uploaded successfully!");
            setDistributedTasks(response.data.distributedTasks);
        } catch (error) {
            console.error("Upload error:", error.response?.data || error.message);
            alert(`Upload failed: ${error.response?.data?.error || "Something went wrong"}`);
        }
    };

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get("http://localhost:5600/api/upload/distributed-tasks");
                setDistributedTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    return (
        <div><Navbar />
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <div className="w-full max-w-2xl bg-white p-6 mt-10 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 text-center">Upload CSV</h2>
                <form onSubmit={handleFileUpload} className="w-full mt-6 flex flex-col items-center">
                    <input type="file" accept=".csv,.xlsx,.xls" className="p-3 border rounded-md" onChange={(e) => setFile(e.target.files[0])} required />
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-md mt-4">Upload File</button>
                </form>
            </div>
        </div>
        </div>
    );
};

export default UploadCSV;
