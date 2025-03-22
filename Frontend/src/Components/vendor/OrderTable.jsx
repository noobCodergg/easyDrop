import React, { createContext, useContext, useEffect, useState } from "react";
import { OrderContext } from "../../Pages/ManageOrders";
import { getOrders } from "../../Api/OrdersApi/OrdersApi";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";
import DropDown from "./DropDown";
import OrderDetails from "./OrderDetails";

export const modalContext = createContext();
const OrderTable = () => {
  const statusOption = [
    { value: 0, label: "Completed" },
    { value: 1, label: "Pending" },
    { value: 2, label: "Cancelled" },
  ];
  const { text, value, startDate, endDate } = useContext(OrderContext);

  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [editMode, setEditMode] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderId, setOrderID] = useState();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders(5);

        const ordersWithUniqueIds = response.data.map((order, index) => ({
          ...order,
          id: order.id ?? `fallback-${index}`,
        }));
        setAllOrders(ordersWithUniqueIds);
        setFilteredOrders(ordersWithUniqueIds);
      } catch (error) {
        console.log("Error Occurred:", error);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    let filtered = [...allOrders];
    if (text) {
      filtered = filtered.filter((order) => {
        const lowerText = text.toLowerCase();
        return (
          (order.order_id &&
            String(order.order_id).toLowerCase().includes(lowerText)) ||
          (order.product_name &&
            order.product_name.toLowerCase().includes(lowerText))
        );
      });
    }

    if (value) {
      filtered = filtered.filter((order) => order.status === value);
    }

    const formattedStartDate = startDate
      ? format(startDate, "yyyy-MM-dd")
      : null;
    const formattedEndDate = endDate ? format(endDate, "yyyy-MM-dd") : null;
    if (formattedStartDate) {
      filtered = filtered.filter((order) => order.date >= formattedStartDate);
    }
    if (formattedEndDate) {
      filtered = filtered.filter((order) => order.date <= formattedEndDate);
    }
    setFilteredOrders(filtered);
  }, [text, value, startDate, endDate, allOrders]);

  const handleModal = (orderId) => {
    console.log("Hi", orderId);
    setIsModalOpen(!isModalOpen);
    setOrderID(orderId);
  };

  return (
    <div className="w-full overflow-x-auto mt-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] text-left">Sl.</TableHead>
            <TableHead className="text-left">Order ID</TableHead>
            <TableHead className="text-left">Date</TableHead>
            <TableHead className="text-left">Product Name</TableHead>
            <TableHead className="text-left">Image</TableHead>
            <TableHead className="text-left">Status</TableHead>
            <TableHead className="text-center">View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order, index) => (
            <TableRow key={order.id}>
              <TableCell className="text-left">{index + 1}</TableCell>
              <TableCell className="text-left">{order.order_id}</TableCell>
              <TableCell className="text-left">{order.date}</TableCell>
              <TableCell className="text-left">{order.product_name}</TableCell>
              <TableCell className="text-left">
                {isModalOpen && (
                  <modalContext.Provider value={{ setIsModalOpen }}>
                    <OrderDetails orderId={orderId} />
                  </modalContext.Provider>
                )}
                <div className="flex items-center">
                  <img
                    src={order.productImage}
                    alt={order.product_name}
                    className="w-10 h-10 object-cover rounded"
                  />
                </div>
              </TableCell>
              <TableCell className="text-left">
                <span>
                  {order.status === 0 ? (
                    <p className="bg-yellow-200 flex items-center justify-center text-yellow-800 border rounded-full">
                      Pending
                    </p>
                  ) : order.status === 1 ? (
                    <p className="bg-green-200 flex items-center justify-center text-green-800 border rounded-full">
                      Approved
                    </p>
                  ) : order.status === 2 ? (
                    <p className="bg-orange-200 flex items-center justify-center text-orange-800 border rounded-full">
                      Shipped
                    </p>
                  ) : order.status === 3 ? (
                    <p className="bg-purple-200 flex items-center justify-center text-purple-800 border rounded-full">
                      Delivered
                    </p>
                  ) : order.id === -1 ? (
                    <p className="bg-red-200 flex items-center justify-center text-red-800 border rounded-full">
                      Cancelled
                    </p>
                  ) : null}
                </span>
              </TableCell>
              <TableCell className="text-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleModal(order.order_id)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderTable;
