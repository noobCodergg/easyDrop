import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Print } from "../Api/AdminApi/AdminApi";

const Login = () => {
  const navigate = useNavigate();
  const getPrint=async () =>{
    await Print();
  }
  useEffect(() => {
    getPrint()
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-2xl font-bold">Login Page</h1>
      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Log In
      </button>
    </div>
  );
};

export default Login;
