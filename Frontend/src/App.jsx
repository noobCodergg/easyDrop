import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Logout from "./Pages/Logout";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from "./Router/ProtectedRoute";
import Transaction from "./Pages/Transaction";
import Finance from "./Pages/Finance";
import Pricing from "./Pages/Pricing";
import Registration from "./Pages/Registration";
import Analytics from "./Pages/Analytics";
import RequestPayment from "./Pages/RequestPayment";
import TotalExpense from "./Pages/TotalExpense";
import TotalIncome from "./Pages/TotalIncome";
import JoinWebinar from "./Pages/JoinWebinar";
import VendorProductOrderManagement from "./Pages/VendorProductOrderManagement";
import ManageOrders from "./Pages/ManageOrders";
import ManageProducts from "./Pages/ManageProducts";





function App() {
  return (
  
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/pricing" element={<Pricing/>}/>
        <Route path="/registration" element={<Registration/>}/>
        <Route path="/analytics" element={<Analytics/>}/>
        <Route path="/requestpayment" element={<RequestPayment/>}/>
        <Route path="/totalexpense" element={<TotalExpense/>}/>
        <Route path="/totalincome" element={<TotalIncome/>}/>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path="/transaction" element={<ProtectedRoute><Transaction/></ProtectedRoute>} />
        <Route path="/finance" element={<ProtectedRoute><Finance/></ProtectedRoute>} />
        <Route path="/joinwebiner" element={<ProtectedRoute><JoinWebinar/></ProtectedRoute>}/>
        
        <Route path="/manage" element={<ProtectedRoute><VendorProductOrderManagement/></ProtectedRoute>}>
         <Route index element={<ManageOrders/>}/>
         <Route path="products" element={<ManageProducts/>}/>
        </Route>
       
      </Routes>
   
  );
}

export default App;

