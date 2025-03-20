import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Agents = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAgents();
    }, []);

    const fetchAgents = async () => {
        try {
            const { data } = await axios.get("http://localhost:5600/api/agents");
            setAgents(data);
        } catch (error) {
            alert("Failed to fetch agents.");
        }
    };

    const handleAddAgent = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post("http://localhost:5600/api/agents/add", { name, email, mobile, password });
            alert("✅ Agent added successfully!");
            fetchAgents();
            setName("");
            setEmail("");
            setMobile("");
            setPassword("");
        } catch (error) {
            alert("❌ Failed to add agent. Please try again.");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 text-center">Add Agent</h2>
                <form className="mt-4 space-y-4" onSubmit={handleAddAgent}>
                    <input 
                        type="text" 
                        placeholder="Name" 
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
                        value={name}
                        onChange={(e) => setName(e.target.value)} required 
                    />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} required 
                    />
                    <input 
                        type="text" 
                        placeholder="Mobile" 
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)} required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} required 
                    />
                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-md transition"
                        disabled={loading}
                    >
                        {loading ? "Adding..." : "Add Agent"}
                    </button>
                </form>
            </div>

            <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-800 text-center">Agent List</h3>
                <ul className="mt-4 space-y-2">
                    {agents.map((agent) => (
                        <li 
                            key={agent._id} 
                            className="p-3 border rounded-md bg-gray-50"
                        >
                            <span className="font-semibold">{agent.name}</span> - {agent.email}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Agents;
