import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {Button} from '../Components/ui/button'

const Login = () => {
  const navigate = useNavigate();

  const getPrint = async () => {
    await Print();
  };

  useEffect(() => {
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
      <Button onClick={handleLogin} variant="default" className="w-40 py-2 text-lg">
        Log In
      </Button>
    </div>
  );
};

export default Login;

