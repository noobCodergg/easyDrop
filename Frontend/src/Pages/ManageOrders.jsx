import React, { createContext, use, useState } from "react";
import OrderTable from "../Components/vendor/OrderTable";
import DatePicker from "../Components/vendor/DatePicker";
import Dropdown from "../Components/vendor/Dropdown";
import SearchInput from "../Components/vendor/SearchInput";
import Cards from "../Components/vendor/Cards";

export const OrderContext = createContext();
const ManageOrders = () => {
  const statusOption = [
    { value: 0, label: "Completed" },
    { value: 1, label: "Pending" },
    { value: 2, label: "Cancelled" },
  ];

  const [text, setText] = useState('');
  const [value,setValue]=useState('');
  const [startDate,setStartDate]=useState('');
  const [endDate,setEndDate]=useState('')
  console.log(text,value,startDate,endDate);
  return (
    <OrderContext.Provider value={{ text, setText, value, setValue,startDate,setStartDate,endDate,setEndDate }}>
      <div>
        <Cards />
        <div className="flex justify-between">
          <div className="flex gap-2 w-1/2">
            <SearchInput />

            <Dropdown statusOptions={statusOption} />
          </div>
          <div className="flex gap-2">
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
