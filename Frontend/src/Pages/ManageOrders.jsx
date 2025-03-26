import React, { createContext, use, useState } from "react";
import OrderTable from "../Components/vendor/OrderTable";
import DatePicker from "../Components/vendor/DatePicker";
import Dropdown from "../Components/vendor/Dropdown";
import SearchInput from "../Components/vendor/SearchInput";
import Cards from "../Components/vendor/Cards";

export const OrderContext = createContext();
const ManageOrders = () => {
  const statusOption = [
    { value: 0, label: "Pending" },
    { value: 1, label: "Approved" },
    { value: 2, label: "Shipped" },
    {value : 3, label : "Delivered"},
    {value : -1, label : "Cancelled"}
  ];

  const [text, setText] = useState('');
  const [value,setValue]=useState('');
  const [startDate,setStartDate]=useState('');
  const [endDate,setEndDate]=useState('')
  
  return (
    <OrderContext.Provider value={{ text, setText, value, setValue,startDate,setStartDate,endDate,setEndDate }}>
      <div >
        <Cards />
        <div className="block sm:flex justify-between">
          <div className="block sm:flex gap-2 ">
            <SearchInput />
            <Dropdown statusOptions={statusOption} />
          </div>
          <div className="block sm:flex gap-2">
            <DatePicker type="start"/>
            <DatePicker type="end"/>
          </div>
        </div>
        
        
        <OrderTable data={{text,value,startDate,endDate}}/>
        
        
      </div>
    </OrderContext.Provider>
  );
};

export default ManageOrders;
