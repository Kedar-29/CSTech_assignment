import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:5600/api/auth/login", { email, password });
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } catch (error) {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-600">
            <div className="bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-xl shadow-lg w-96 border border-gray-300">
                <h2 className="text-3xl font-extrabold text-center text-black">Admin Login</h2>
                <p className="text-center text-black">Access your account securely</p><br/>
                <form className="mt-6 space-y-4" onSubmit={handleLogin}>
                    {/* Email Field */}
                    <div>
                        <label className="block text-black font-semibold">Enter your Email</label>
                        <input
                            type="email"
                            className="w-full p-3 mt-1 border rounded-lg bg-white bg-opacity-30 placeholder-gray-300 focus:ring-2 focus:ring-blue-400 outline-none text-white"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    {/* Password Field */}
                    <div>
                        <label className="block text-black font-semibold">Enter your Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full p-3 mt-1 border rounded-lg bg-white bg-opacity-30 placeholder-gray-300 focus:ring-2 focus:ring-blue-400 outline-none text-white"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span
                                className="absolute right-4 top-3 text-white cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>
                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                        Login
                    </button>
                    <p className="text-center text-white text-sm mt-2">
                        Forgot your password? <span className="underline cursor-pointer">Reset here</span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
