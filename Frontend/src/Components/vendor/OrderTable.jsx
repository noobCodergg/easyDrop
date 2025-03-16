import React from "react";
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
import Dropdown from "./Dropdown";

const OrderTable = () => {
  // Sample data (replace with your actual data source)
  const orders = [
    {
      id: "ORD001",
      orderedBy: "John Doe",
      date: "2025-03-15",
      productName: "Wireless Mouse",
      productImage: "https://imgs.search.brave.com/wPQ7o9ZICdDvyewMamcXWmJUkGg290stQRWmILMZsIQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTg2/ODU5MjI0L3Bob3Rv/L2hhbmRiYWcuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPVJi/dTJYMjFfWlBZM3Jh/WDZSdWxRVnoyYlBI/a2Q2SWhkNmRwT0Jq/VF9IYVk9",
      status: "Completed",
    },
    {
      id: "ORD002",
      orderedBy: "Jane Smith",
      date: "2025-03-16",
      productName: "Bluetooth Headphones",
      productImage: "https://imgs.search.brave.com/woftcEKRZJwwfU89W5pGCvffOGIKDIo0teNzMj8Pqh0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE2LzE1LzEz/LzM2MF9GXzIxNjE1/MTMzOV9PQWN1NjJK/TGQ2V0o3YzVqM2Fy/VXNUZVlvZGh4NDN2/SS5qcGc",
      status: "Pending",
    },
    {
      id: "ORD003",
      orderedBy: "Bob Johnson",
      date: "2025-03-17",
      productName: "USB-C Cable",
      productImage: "https://imgs.search.brave.com/pEovhI9NbghgYUva1aSIW3WlJER8dvtzrywciD5MSuc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAwLzE0LzQ5LzQy/LzM2MF9GXzE0NDk0/MjAxX1pZWDlLdkFo/T3A1YWVZMnAwZWZw/QkdCUUVaVVluTzhE/LmpwZw",
      status: "Cancelled",
    },
  ];

  const handleStatusChange = (orderId, newStatus) => {
    console.log(`Order ${orderId} status changed to: ${newStatus}`);
    // Add your status update logic here
  };

  return (
    <div className="w-full overflow-x-auto mt-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] text-left">Sl.</TableHead>
            <TableHead className="text-left">Order ID</TableHead>
            <TableHead className="text-left">Ordered By</TableHead>
            <TableHead className="text-left">Date</TableHead>
            <TableHead className="text-left">Product Name</TableHead>
            <TableHead className="text-left">Product Image</TableHead>
            <TableHead className="text-left">Status</TableHead>
            <TableHead className="text-center">View</TableHead>
            <TableHead className="text-center">Edit</TableHead>
            <TableHead className="text-center">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, index) => (
            <TableRow key={order.id}>
              <TableCell className="text-left">{index + 1}</TableCell>
              <TableCell className="text-left">{order.id}</TableCell>
              <TableCell className="text-left">{order.orderedBy}</TableCell>
              <TableCell className="text-left">{order.date}</TableCell>
              <TableCell className="text-left">{order.productName}</TableCell>
              <TableCell className="text-left">
                <div className="flex items-center">
                  <img
                    src={order.productImage}
                    alt={order.productName}
                    className="w-10 h-10 object-cover rounded"
                  />
                </div>
              </TableCell>
              <TableCell className="text-left">
                <Dropdown
                  initialStatus={order.status} // Pass the current status
                  onStatusChange={(newStatus) => handleStatusChange(order.id, newStatus)}
                />
              </TableCell>
              <TableCell className="text-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => console.log(`View ${order.id}`)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
              <TableCell className="text-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => console.log(`Edit ${order.id}`)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </TableCell>
              <TableCell className="text-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => console.log(`Delete ${order.id}`)}
                >
                  <Trash2 className="h-4 w-4" />
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
