import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Logout from "./Pages/Logout";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from "./Router/ProtectedRoute";
import Transaction from "./Pages/Transaction";
import Finance from "./Pages/Finance";



function App() {
  return (
  
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path="/transaction" element={<ProtectedRoute><Transaction/></ProtectedRoute>} />
        <Route path="/finance" element={<ProtectedRoute><Finance/></ProtectedRoute>} />
      </Routes>
   
  );
}

export default App;

