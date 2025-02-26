import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("isLoggedIn");
    setTimeout(() => navigate("/"), 2000);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-2xl font-bold">You have been logged out</h1>
      <p>Redirecting to home...</p>
    </div>
  );
};

export default Logout;
