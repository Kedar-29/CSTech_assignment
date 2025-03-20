import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Agents from "./pages/Agent";
import UploadCSV from "./pages/UploadCSV";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/agents" element={<ProtectedRoute><Agents /></ProtectedRoute>} />
                <Route path="/upload" element={<ProtectedRoute><UploadCSV /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
};

export default App;
