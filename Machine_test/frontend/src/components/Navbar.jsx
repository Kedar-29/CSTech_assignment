import { Link } from "react-router-dom";
import { logout } from "../utils/auth";

const Navbar = () => {
    return (
        <nav className="bg-blue-600 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-2xl font-bold">Machine Testing</h1>
                <div className="flex space-x-6">
                    <Link to="/dashboard" className="text-white hover:text-gray-300 transition">
                        Dashboard
                    </Link>
                    <Link to="/agents" className="text-white hover:text-gray-300 transition">
                        Manage Agents
                    </Link>
                    <Link to="/upload" className="text-white hover:text-gray-300 transition">
                        Upload CSV
                    </Link>
                    <button
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
