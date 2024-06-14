import axios from "axios";
import { useState } from "react";

export default function Read() {
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const [filterName, setFilterName] = useState(""); // State for the filter input

    const handleSubmit = async () => {
        setLoading(true);
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${window.location.origin}/api/student`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            if (response.data.status === true) {
                setResponseData(response.data);
            } else {
                setResponseData(null);
            }
        } catch (err) {
            console.error("An error occurred:", err);
            setResponseData(null);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        setFilterName(e.target.value); 
    };

    const filteredStudents = responseData && responseData.students
        ? responseData.students.filter(student =>
            student.Name.toLowerCase().includes(filterName.toLowerCase())
          )
        : [];

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-300 p-4">
            <div className="w-full md:w-1/2">
                <h1 className="text-4xl text-center font-bold mb-8">Get Student Data</h1>
                <div className="mb-4">
                    <label className="block text-2xl font-semibold mb-2">Filter by Name</label>
                    <input
                        type="text"
                        placeholder="Enter student name"
                        className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                        value={filterName}
                        onChange={handleFilterChange}
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    className={`w-full py-2 mt-4 rounded-md text-white font-semibold ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'}`}
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Get Student Data'}
                </button>
            </div>
            {responseData && (
                <div className="w-full md:w-1/2 p-4 mt-8 bg-white shadow-md rounded-md">
                    <h2 className="text-2xl font-bold mb-4">Student Data</h2>
                    {filteredStudents.length > 0 ? (
                        filteredStudents.map((student) => (
                            <div key={student._id} className="mb-4 p-4 border-b border-gray-200">
                                <p><strong>Name:</strong> {student.Name}</p>
                                <p><strong>Email:</strong> {student.email}</p>
                                <p><strong>Age:</strong> {student.age}</p>
                                <p><strong>Qualification:</strong> {student.qualification}</p>
                                <p><strong>College Name:</strong> {student.collegeName}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-lg">No students found.</p>
                    )}
                </div>
            )}
        </div>
    );
}
