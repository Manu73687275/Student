import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [Name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setLoading(true);
        setError("");
        if (!Name || !email || !password) {
            setError("All fields are required.");
            setLoading(false);
            return;
        }
        try {
            const response = await axios.post(`${window.location.origin}/api/signup`, {
                Name,
                email,
                password
            });

            if (response.data.status === true) {
                localStorage.setItem("token", response.data.token);
                navigate("/middle");
            } else {
                setError("Incorrect data provided. Please try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-300 mb-24">
            <div className="m-10 p-8 bg-white shadow-md rounded-md w-96">
                <h1 className="text-4xl text-center font-bold mb-8">SIGNUP</h1>
                {error && <div className="text-red-500 text-center mb-4">{error}</div>}
                <div className="mb-4">
                    <label className="block text-2xl font-semibold mb-2">Name</label>
                    <input
                        type="text"
                        placeholder="Manu G m"
                        className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-2xl font-semibold mb-2">Email</label>
                    <input
                        type="email"
                        placeholder="manu@gmail.com"
                        className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-2xl font-semibold mb-2">Password</label>
                    <input
                        type="password"
                        placeholder="password"
                        className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    className={`w-full py-2 mt-4 rounded-md text-white font-semibold ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'}`}
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Submit'}
                </button>
            </div>
        </div>
    );
};

export default Signup;
