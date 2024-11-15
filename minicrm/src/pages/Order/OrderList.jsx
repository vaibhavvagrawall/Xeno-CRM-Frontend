import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";

function OrderList(){
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/orders/list", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
    
            if (!response.ok) {
                throw new Error("Failed to fetch orders");
            }
    
            const data = await response.json();
            setOrders(data)
        } catch (error) {
            console.error("Error fetching orders:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="container mx-auto px-6 mt-16 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">Order List</h1>
                <Link to="/orders/create">
                    <Button className="bg-red-600 text-white px-6 py-3 font-semibold rounded-lg shadow-md hover:bg-red-700">
                        Add Order
                    </Button>
                </Link>
            </div>

            <div className="overflow-x-auto rounded-lg shadow-lg">
                <table className="min-w-full bg-white border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-left text-lg font-medium text-gray-600">Name</th>
                            <th className="px-6 py-4 text-left text-lg font-medium text-gray-600">Amount</th>
                            <th className="px-6 py-4 text-left text-lg font-medium text-gray-600">Order Date</th>
                            <th className="px-6 py-4 text-left text-lg font-medium text-gray-600">Customer Name</th>
                            <th className="px-6 py-4 text-left text-lg font-medium text-gray-600">Customer Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className="border-t border-gray-200">
                                <td className="px-6 py-4 text-gray-700">{order.name}</td>
                                <td className="px-6 py-4 text-gray-700">{order.amount}</td>
                                <td className="px-6 py-4 text-gray-700">{new Date(order.orderDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-gray-700">{order.customerId?.name}</td>
                                <td className="px-6 py-4 text-gray-700">{order.customerId?.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OrderList;
