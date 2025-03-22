import SearchInput from "../Components/vendor/SearchInput";
import Dropdown from "../Components/vendor/Dropdown";
import React from "react";
import Products from "../Components/vendor/Products";
import { Button } from "../Components/ui/button";

const ManageProducts = () => {
  const statusOption=[{
    value:'Mouse',label:'Mouse'
  },
  {
    value:'Keyboard',label:'Keyboard'
  },
  {
    value:'Headset',label:'Headset'
  }]
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-2 w-1/2">
          <SearchInput />
          <Button variant='Investor'>+ Add New Product</Button>
          <Dropdown statusOptions={statusOption} initialStatus='Select Category'/>
        </div>
      </div>
      <div>
       <Products/> 
      </div>
    </div>
  );
};

export default ManageProducts;
