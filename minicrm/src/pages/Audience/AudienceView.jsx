import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function AudienceView() {
    const { id } = useParams();
    const [audience, setAudience] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAudience = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/audiences/${id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch audience details");
            }

            const data = await response.json();
            setAudience(data);
            setCustomers(data.customers || []);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAudience();
    }, [id]);

    if(loading){return <div></div>}

    return (
        <div className="container mx-auto px-6 mt-16 py-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">{audience.name}</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Audience Size: {audience.size}</h2>

            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Conditions:</h2>
            <ul className="mb-8">
                {audience.conditions.map((condition, index) => (
                    <li key={index} className="mb-2">
                        {condition.field} {condition.operator} {condition.value}
                    </li>
                ))}
            </ul>

            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Customers:</h2>
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
                                <td className="px-6 py-4 text-gray-700">{customer.totalSpending}</td>
                                <td className="px-6 py-4 text-gray-700">{customer.visitCount}</td>
                                <td className="px-6 py-4 text-gray-700">{customer.lastVisit}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AudienceView;
