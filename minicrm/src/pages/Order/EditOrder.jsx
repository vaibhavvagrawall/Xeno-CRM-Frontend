import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";

function EditOrder() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [orderDate, setOrderDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchOrder = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch order details");
            }

            const order = await response.json();

            setName(order.name);
            setAmount(order.amount);
            setOrderDate(order.orderDate.slice(0, 10));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        const updatedData = {
            name,
            amount,
            orderDate,
        };

        try {
            const response = await fetch(`http://localhost:5000/api/orders/edit/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error("Failed to update order");
            }

            alert("Order updated successfully!");
            navigate("/orders");
        } catch (err) {
            alert(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, [id]);

    return (
        <div className="container mx-auto px-6 mt-16 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">Edit Order</h1>
            </div>

            <form onSubmit={handleUpdate} className="bg-white p-8 shadow-lg rounded-lg">
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Order Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        {loading ? "Updating..." : "Update Order"}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default EditOrder;
