import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";

function CustomerList(){
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCustomers = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/customers/list", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
    
            if (!response.ok) {
                throw new Error("Failed to fetch customers");
            }
    
            const data = await response.json();
            setCustomers(data)
        } catch (error) {
            console.error("Error fetching customers:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
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

            <div className="overflow-x-auto rounded-lg shadow-lg">
                <table className="min-w-full bg-white border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-left text-lg font-medium text-gray-600">Name</th>
                            <th className="px-6 py-4 text-left text-lg font-medium text-gray-600">Email</th>
                            <th className="px-6 py-4 text-left text-lg font-medium text-gray-600">Total Spending</th>
                            <th className="px-6 py-4 text-left text-lg font-medium text-gray-600">Visit Count</th>
                            <th className="px-6 py-4 text-left text-lg font-medium text-gray-600">Last Visit</th>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CustomerList;
