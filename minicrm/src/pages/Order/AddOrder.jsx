import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

function AddOrder() {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [orderName, setOrderName] = useState("");
    const [amount, setAmount] = useState("");
    const [orderDate, setOrderDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const fetchCustomers = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/customers/list`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch customers");
            }

            const data = await response.json();
            setCustomers(data);
        } catch (error) {
            console.error("Error fetching customers:", error);
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const orderData = {
            email: selectedCustomer,
            name: orderName,
            amount,
            orderDate,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                throw new Error("Failed to create order");
            }

            navigate("/orders");
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-6 mt-16 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">Create New Order</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-lg">
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customer">
                        Select Customer (Email)
                    </label>
                    <select
                        id="customer"
                        value={selectedCustomer}
                        onChange={(e) => setSelectedCustomer(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                    >
                        <option value="" disabled>
                            Select a customer
                        </option>
                        {customers.map((customer) => (
                            <option key={customer._id} value={customer.email}>
                                {customer.email}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="orderName">
                        Order Name
                    </label>
                    <input
                        type="text"
                        id="orderName"
                        value={orderName}
                        onChange={(e) => setOrderName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                        Amount
                    </label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="orderDate">
                        Order Date
                    </label>
                    <input
                        type="date"
                        id="orderDate"
                        value={orderDate}
                        onChange={(e) => setOrderDate(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                    />
                </div>

                <div className="flex justify-end">
                    <Button
                        variant="solid"
                        className="bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md"
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Order"}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default AddOrder;
