import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const fetchCustomers = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/customers/list", {
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
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (customerId) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            try {
                const response = await fetch(`http://localhost:5000/api/customers/delete/${customerId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Failed to delete customer");
                }

                setCustomers(customers.filter((customer) => customer._id !== customerId));
            } catch (error) {
                alert(`Error deleting customer: ${error.message}`);
            }
        }
    };

    const handleEdit = (customerId) => {
        navigate(`/customers/edit/${customerId}`);
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <div className="container mx-auto px-6 mt-16 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">Customer List</h1>
                <Link to="/customers/create">
                    <Button className="bg-red-600 text-white px-6 py-3 font-semibold rounded-lg shadow-md hover:bg-red-700">
                        Add Customer
                    </Button>
                </Link>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-600">{error}</p>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow-lg">
                    <table className="min-w-full bg-white border-collapse">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-lg font-medium text-gray-600">Name</th>
                                <th className="px-6 py-4 text-left text-lg font-medium text-gray-600">Email</th>
                                <th className="px-6 py-4 text-left text-lg font-medium text-gray-600">Total Spending</th>
                                <th className="px-6 py-4 text-left text-lg font-medium text-gray-600">Visit Count</th>
                                <th className="px-6 py-4 text-left text-lg font-medium text-gray-600">Last Visit</th>
                                <th className="px-6 py-4 text-left text-lg font-medium text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer) => (
                                <tr key={customer._id} className="border-t border-gray-200">
                                    <td className="px-6 py-4 text-gray-700">{customer.name}</td>
                                    <td className="px-6 py-4 text-gray-700">{customer.email}</td>
                                    <td className="px-6 py-4 text-gray-700">${customer.totalSpending}</td>
                                    <td className="px-6 py-4 text-gray-700">{customer.visitCount}</td>
                                    <td className="px-6 py-4 text-gray-700">{new Date(customer.lastVisit).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 flex space-x-4">
                                        <Button
                                            className="bg-red-600 text-white px-6 py-3 font-semibold rounded-lg shadow-md hover:bg-red-700"
                                            onClick={() => handleEdit(customer._id)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            className="bg-red-600 text-white px-6 py-3 font-semibold rounded-lg shadow-md hover:bg-red-700"
                                            onClick={() => handleDelete(customer._id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default CustomerList;
