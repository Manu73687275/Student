import axios from "axios";
import { useState } from "react";
//import { useNavigate } from "react-router-dom";

const Add = () => {
    const [Name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [qualification, setQualification] = useState("");
    const [collegeName, setCollegeName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [responseData, setResponseData] = useState(null);
    //const navigate = useNavigate();

    const handleSubmit = async () => {
        setLoading(true);
        setError("");
        if (!Name || !email || !age || !qualification || !collegeName) {
            setError("All fields are required.");
            setLoading(false);
            return;
        }
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post(`${window.location.origin}/api/create/student`, {
                Name,
                email,
                age,
                qualification,
                collegeName
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

            if (response.data.status === true) {
                setResponseData(response.data.data);
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
            <div className="flex flex-wrap w-full max-w-6xl bg-white shadow-md rounded-md p-8">
                <div className="w-full md:w-1/2">
                    <h1 className="text-4xl text-center font-bold mb-8">Add Student</h1>
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
                        <label className="block text-2xl font-semibold mb-2">Age</label>
                        <input
                            type="text"
                            placeholder="22"
                            className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-2xl font-semibold mb-2">Qualification</label>
                        <input
                            type="text"
                            placeholder="BE"
                            className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                            onChange={(e) => setQualification(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-2xl font-semibold mb-2">College Name</label>
                        <input
                            type="text"
                            placeholder="NIE"
                            className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                            onChange={(e) => setCollegeName(e.target.value)}
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
                {responseData && (
                    <div className="w-full md:w-1/2 p-4">
                        <h2 className="text-2xl font-bold mb-4">Student Data</h2>
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

export default Add;
