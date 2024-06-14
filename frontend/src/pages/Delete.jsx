import axios from "axios";
import { useState } from "react";

const Delete = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [responseData, setResponseData] = useState(null);

    const handleDelete = async () => {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");
        try {
            const response = await axios.post(`${window.location.origin}/api/delete/student`,
                { email },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.status === true) {
                setResponseData(response.data.data);
            } else {
                setError("Failed to delete student. Please try again.");
            }
        } catch (err) {
            setError("An error occurred while deleting student. Please try again.");
            console.error("Error deleting student:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-300 mb-24">
            <div className="flex flex-wrap w-full max-w-6xl bg-white shadow-md rounded-md p-8">
                <div className="w-full md:w-1/2">
                    <h1 className="text-4xl text-center font-bold mb-8">Delete Student</h1>
                    {error && <div className="text-red-500 text-center mb-4">{error}</div>}
                    <div className="mb-4">
                        <label className="block text-2xl font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="Enter Student Email"
                            className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={handleDelete}
                        className={`w-full py-2 mt-4 rounded-md text-white font-semibold ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-700'}`}
                        disabled={loading}
                    >
                        {loading ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
                {responseData && (
                    <div className="w-full md:w-1/2 p-4">
                        <h2 className="text-2xl font-bold mb-4">Deleted Student</h2>
                        <p><strong>Name:</strong> {responseData.Name}</p>
                        <p><strong>Email:</strong> {responseData.email}</p>
                        <p><strong>Age:</strong> {responseData.age}</p>
                        <p><strong>Qualification:</strong> {responseData.qualification}</p>
                        <p><strong>College Name:</strong> {responseData.collegeName}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Delete;
