import { useContext, useEffect, useState } from "react";
import { modalContext } from "./OrderTable";
import { getOrderDetails } from "../../Api/OrdersApi/OrdersApi";

function OrderDetails({ orderId }) {
  const { setIsModalOpen } = useContext(modalContext);
  const [data, setData] = useState(null);

  const modalClose = () => {
    setIsModalOpen(false);
  };

  const fetchOrderDetails = async () => {
    try {
      const response = await getOrderDetails(orderId);
      if (response.data.length > 0) {
        setData(response.data[0]);
      } else {
        console.log("No order details found.");
      }
    } catch (error) {
      console.log("Error fetching order details:", error);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500/20 px-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl transform scale-100 transition-all">
        {data ? (
          <>
            {/* Header Section */}
            <div className="mb-6 text-center border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
              <p className="text-gray-500 text-sm">Order ID: <span className="font-semibold">{data.order_id}</span></p>
            </div>

            {/* Product Details */}
            <div className="mb-6 flex gap-6 items-center border-b pb-4">
              <img 
                src="https://imgs.search.brave.com/5Um9ZEGHcPxv4Pd4TWuGpdRU3zKASUb5PT6B4piL94I/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTg2/ODU5MjI0L3Bob3Rv/L2hhbmRiYWcuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPVJi/dTJYMjFfWlBZM3Jh/WDZSdWxRVnoyYlBI/a2Q2SWhkNmRwT0Jq/VF9IYVk9"
                alt={data.product_name} 
                className="w-24 h-24 rounded-lg object-cover shadow-md"
              />
              <div>
                <h3 className="text-lg font-semibold">{data.product_name}</h3>
                <p className="text-gray-600">Quantity: <span className="font-medium">{data.quantity}</span></p>
                <p className="text-gray-600">Total: <span className="font-medium">{data.total} Tk.</span></p>
              </div>
            </div>

            {/* Order Info */}
            <div className="grid grid-cols-2 gap-6 mb-6 border-b pb-4">
              <div>
                <p className="text-gray-600">Category: <span className="font-medium">{data.category_id}</span></p>
                <p className="text-gray-600">Resell Price: <span className="font-medium">{data.resell_price} Tk.</span></p>
              </div>
              <div>
                <p className="text-gray-600">Variant: <span className="font-medium">{data.variant_id}</span></p>
                <p className="text-gray-600">Retail Price: <span className="font-medium">{data.retail_price ? data.retail_price : "0"} Tk.</span></p>
              </div>
            </div>

            {/* Customer Info */}
            <div className="mb-6 border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-800">Customer Details</h3>
              <p className="text-gray-600">Name: <span className="font-medium">{data.customer_name}</span></p>
              <p className="text-gray-600">Phone: <span className="font-medium">{data.number}</span></p>
              <p className="text-gray-600">Address: <span className="font-medium">{data.street}, {data.city}, {data.district}</span></p>
              <p className="text-gray-600">Remarks: <span className="font-medium">{data.remarks || "None"}</span></p>
            </div>

            {/* Status Section */}
            <div className="grid grid-cols-2 gap-6 mb-6 border-b pb-4">
              <div>
                <p className="text-gray-600">Status: <span className="font-semibold">{data.status}</span></p>
                <p className="text-gray-600">Shipped: <span className="font-medium">{data.shipped ? "Yes" : "No"}</span></p>
                <p className="text-gray-600">Printed: <span className="font-medium">{data.printed ? "Yes" : "No"}</span></p>
              </div>
              <div>
                <p className="text-gray-600">Cancelled: <span className="font-medium">{data.cancelled ? "Yes" : "No"}</span></p>
                <p className="text-gray-600">Cancel Reason: <span className="font-medium">{data.cancel_details || "N/A"}</span></p>
                <p className="text-gray-600">Cancellation Fee: <span className="font-medium">{data.cancellation_charged} Tk.</span></p>
              </div>
            </div>

            {/* Payment & Updates */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-gray-600">Advance Paid: <span className="font-medium">{data.advance} Tk.</span></p>
                <p className="text-gray-600">Delivery Charge: <span className="font-medium">{data.delivery_charge} Tk.</span></p>
                <p className="text-gray-600">Discount: <span className="font-medium">{data.discount} Tk.</span></p>
                <p className="text-gray-600">Paid Amount: <span className="font-medium">{data.paid} Tk.</span></p>
              </div>
              <div>
                <p className="text-gray-600">Stock Updated: <span className="font-medium">{data.stock_updated ? "Yes" : "No"}</span></p>
                <p className="text-gray-600">Updated By: <span className="font-medium">{data.updated_by}</span></p>
                <p className="text-gray-600">Last Updated: <span className="font-medium">{data.updated_at}</span></p>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">Loading order details...</p>
        )}

        {/* Close Button */}
        <div className="text-center mt-6">
          <button
            onClick={modalClose}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
