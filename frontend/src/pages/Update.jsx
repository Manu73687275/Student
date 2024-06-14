import { useState } from 'react';
import axios from 'axios';

const Update = () => {
    const [Name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [qualification, setQualification] = useState('');
    const [collegeName, setCollegeName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [responseData, setResponseData] = useState(null);

    const handleSubmit = async () => {
        setLoading(true);
        setError('');

        const token = localStorage.getItem('token');
        try {
            let updateData = {};
            if (Name) updateData.Name = Name;
            if (age) updateData.age = parseInt(age); // Ensure age is parsed as integer if needed
            if (qualification) updateData.qualification = qualification;
            if (collegeName) updateData.collegeName = collegeName;

            const response = await axios.put(`${window.location.origin}/api/update/student/${email}`, updateData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.status === true) {
                setResponseData(response.data.updated);
                setError('');
            } else {
                setError('Failed to update student data. Please try again.');
            }
        } catch (err) {
            setError('An error occurred while updating student data. Please try again.');
            console.error('Error updating student:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-300 mb-24">
            <div className="flex flex-wrap w-full max-w-6xl bg-white shadow-md rounded-md p-8">
                <div className="w-full md:w-1/2">
                    <h1 className="text-4xl text-center font-bold mb-8">Update Student</h1>
                    {error && <div className="text-red-500 text-center mb-4">{error}</div>}
                    <div className="mb-4">
                        <label className="block text-2xl font-semibold mb-2">Email *</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-2xl font-semibold mb-2">Name</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-2xl font-semibold mb-2">Age</label>
                        <input
                            type="number" // Changed to number type
                            placeholder="Enter Age"
                            className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-2xl font-semibold mb-2">Qualification</label>
                        <input
                            type="text"
                            placeholder="Enter Qualification"
                            className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                            value={qualification}
                            onChange={(e) => setQualification(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-2xl font-semibold mb-2">College Name</label>
                        <input
                            type="text"
                            placeholder="Enter College Name"
                            className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                            value={collegeName}
                            onChange={(e) => setCollegeName(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={handleSubmit}
                        className={`w-full py-2 mt-4 rounded-md text-white font-semibold ${
                            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
                        }`}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Submit'}
                    </button>
                </div>
                {responseData && (
                    <div className="w-full md:w-1/2 p-4">
                        <h2 className="text-2xl font-bold mb-4">Updated Student Data</h2>
                        <p>
                            <strong>Name:</strong> {responseData.Name}
                        </p>
                        <p>
                            <strong>Email:</strong> {responseData.email}
                        </p>
                        <p>
                            <strong>Age:</strong> {responseData.age}
                        </p>
                        <p>
                            <strong>Qualification:</strong> {responseData.qualification}
                        </p>
                        <p>
                            <strong>College Name:</strong> {responseData.collegeName}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Update;
