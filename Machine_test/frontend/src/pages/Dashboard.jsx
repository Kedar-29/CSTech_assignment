import Navbar from "../components/Navbar";
import { FaUsers, FaFileUpload, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto py-10 px-6">
                <h2 className="text-4xl font-bold text-gray-800 text-center">Admin Dashboard</h2>
                <p className="text-lg text-gray-600 text-center mt-3">
                    Manage users, upload files, and control the system efficiently.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                    <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
                    
                        <div>
                            <h3 className="text-xl font-semibold">User Management</h3>
                            <p className="text-gray-600">Add, remove, or update users.</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
                      
                        <div>
                            <h3 className="text-xl font-semibold">File Management</h3>
                            <p className="text-gray-600">Upload and organize documents securely.</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
                 
                        <div>
                            <h3 className="text-xl font-semibold">System Settings</h3>
                            <p className="text-gray-600">Configure and manage system settings.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                <Link to="/agents" className="text-white hover:text-gray-300 transition">
                       
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow hover:bg-blue-700">
                        Get Started
                    </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;