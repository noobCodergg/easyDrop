import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { updateOrderStatus } from "../../Api/OrdersApi/OrdersApi";
import { OrderContext } from "../../Pages/ManageOrders";
const DropDown = ({ initialStatus, onStatusChange, statusOptions = [],orderId='' }) => {
  const [status, setStatus] = React.useState(initialStatus || "Pending");
  const {setValue}=React.useContext(OrderContext)
  
  React.useEffect(() => {
    setStatus(initialStatus || "Pending");
  }, [initialStatus]);

  const handleStatusSelect = async(newStatus) => {
    setStatus(newStatus);
   setValue(newStatus)
    if (onStatusChange) {
      onStatusChange(newStatus);
    }
   
    if(orderId!==''){
    try{
      const response=await updateOrderStatus(orderId,newStatus)
    }catch(error){
      console.log(error)
    }
  }
  };

  return (
    <div className="pb-6">
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
        {status === 0 ? (
    <p>Pending</p>
  ) : status === 1 ? (
    <p>Approved</p>
  ) : status === 2 ? (
    <p>Shipped</p>  
  ) : 
    status === 3 ? (
      <p>Delivered</p>
    ): status === -1 ? (
      <p>Cancelled</p>
    ):
  (
    "Select Status"
  )}

          <ChevronDown className="h-4 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className='bg-white'>
        {statusOptions.length > 0 ? (
          statusOptions.map((option) => (
            <DropdownMenuItem 
              key={option.value}
              onClick={() => handleStatusSelect(option.value)}
            >
              {option.label}
            </DropdownMenuItem>
          ))
        ) : (
          <p className="px-2 py-1 text-gray-500">No options available</p>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  );
};

export default DropDown;