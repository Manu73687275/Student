import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="min-h-screen bg-gray-300 flex flex-col gap-y-40 items-center">
            <header className="w-full bg-orange-100 text-white py-4 shadow-md flex flex-col md:flex-row justify-between items-center px-6 md:px-12 lg:px-24 xl:px-32">
                <div className="flex items-center justify-center md:justify-start">
                    <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold  text-red-500">Student Registration Portal</h1>
                </div>
                <nav className="flex gap-5 mt-4 md:mt-0">
                    <Link to="/login" className="rounded-md text-lg md:text-xl lg:text-2xl px-4 py-2 text-red-500 bg-white hover:bg-green-200">
                        Login
                    </Link>
                    <Link to="/signup" className="rounded-md text-lg md:text-xl lg:text-2xl px-4 py-2 text-red-500 bg-white hover:bg-green-200">
                        Signup
                    </Link>
                </nav>
            </header>
            <div className="flex justify-center items-center mt-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-green-600">Student Registration Portal</h1>
            </div>
        </div>
    );
};

export default Navbar;
