import { useNavigate } from "react-router-dom";

const AuthButton = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleAuth = () => {
    if (isLoggedIn) {
      localStorage.removeItem("isLoggedIn");
      navigate("/logout");
    } else {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    }
  };

  return (
    <button
      onClick={handleAuth}
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
    >
      {isLoggedIn ? "Log Out" : "Log In"}
    </button>
  );
};

export default AuthButton;
