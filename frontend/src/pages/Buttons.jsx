import { useNavigate } from "react-router-dom";

export default function Buttons() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300">
      <div className="space-y-4 mx">
        <button
          onClick={() => navigate("/Add")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3"
        >
          Add Student Data
        </button>
        <button
          onClick={() => navigate("/read")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3"
        >
          Students Data
        </button>
        <button
          onClick={() => navigate("/update")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3"
        >
          Update Student Data
        </button>
        <button
          onClick={() => navigate("/delete")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3"
        >
          Delete Student Data
        </button>
      </div>
    </div>
  );
}
