import React, { createContext, useContext, useEffect, useState } from "react";
import { OrderContext } from "../../Pages/ManageOrders";
import moment from "moment";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";
import OrderDetails from "./OrderDetails";
import { getOrders } from "../../Api/OrdersApi/OrdersApi"; // Make sure this path is correct

export const modalContext = createContext();

const OrderTable = () => {
  const { text, value, startDate, endDate } = useContext(OrderContext);

  const [allOrders, setAllOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderId, setOrderID] = useState();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders(5, text, value, startDate, endDate);
        const ordersWithUniqueIds = response.data.map((order, index) => ({
          ...order,
          id: order.id ?? `fallback-${index}`,
        }));
        setAllOrders(ordersWithUniqueIds);
      } catch (error) {
        console.log("Error Occurred:", error);
      }
    };
    fetchOrders();
  }, [text, value, startDate, endDate]);

  const handleModal = (orderId) => {
    setIsModalOpen(!isModalOpen);
    setOrderID(orderId);
  };

  return (
    <div className="w-full overflow-x-auto mt-10">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] text-left">Sl.</TableHead>
            <TableHead className="text-left">ID</TableHead>
            <TableHead className="text-left">Date</TableHead>
            <TableHead className="text-left">Name</TableHead>
            <TableHead className="text-left">Image</TableHead>
            <TableHead className="text-left">Status</TableHead>
            <TableHead className="text-center">View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allOrders.map((order, index) => (
            <TableRow key={order.id}>
              <TableCell className="text-left whitespace-nowrap">
                {index + 1}
              </TableCell>
              <TableCell className="text-left whitespace-nowrap">
                {order.order_id}
              </TableCell>
              <TableCell className="text-left whitespace-nowrap">
                {moment(order.date).format("YYYY-MM-DD")}
              </TableCell>
              <TableCell className="text-left whitespace-nowrap">
                {order.product_name.length > 100
                  ? `${order.product_name.substring(0, 50)}...`
                  : order.product_name}
              </TableCell>
              {isModalOpen && (
                <modalContext.Provider value={{ setIsModalOpen }}>
                  <OrderDetails orderId={orderId} />
                </modalContext.Provider>
              )}
              <TableCell className="text-left">
                <div className="flex items-center">
                  <img
                    src={order.productImage}
                    alt={order.product_name}
                    className="w-10 h-10 object-cover rounded"
                  />
                </div>
              </TableCell>
              <TableCell className="text-center whitespace-nowrap">
                <span>
                  {order.status === 0 ? (
                    <p className="bg-yellow-200 text-yellow-800 border rounded-full px-2 py-1">
                      Pending
                    </p>
                  ) : order.status === 1 ? (
                    <p className="bg-green-200 text-green-800 border rounded-full px-2 py-1">
                      Approved
                    </p>
                  ) : order.status === 2 ? (
                    <p className="bg-orange-200 text-orange-800 border rounded-full px-2 py-1">
                      Shipped
                    </p>
                  ) : order.status === 3 ? (
                    <p className="bg-purple-200 text-purple-800 border rounded-full px-2 py-1">
                      Delivered
                    </p>
                  ) : order.status === -1 ? (
                    <p className="bg-red-200 text-red-800 border rounded-full px-2 py-1">
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
