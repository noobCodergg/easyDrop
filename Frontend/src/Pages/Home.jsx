import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-2xl font-bold">Welcome to Auth App</h1>
      <Link to="/login">
        <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
          Go to Login
        </button>
      </Link>
    </div>
  );
};

export default Home;
