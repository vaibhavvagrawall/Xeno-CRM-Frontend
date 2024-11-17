import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";

function EditCustomer() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [totalSpending, setTotalSpending] = useState("");
    const [visitCount, setVisitCount] = useState("");
    const [lastVisit, setLastVisit] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCustomer = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5000/api/customers/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch customer details");
            }

            const customer = await response.json();
            setName(customer.name);
            setEmail(customer.email);
            setTotalSpending(customer.totalSpending);
            setVisitCount(customer.visitCount);
            setLastVisit(customer.lastVisit ? customer.lastVisit.split("T")[0] : "");
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
            email,
            totalSpending,
            visitCount,
            lastVisit,
        };

        try {
            const response = await fetch(`http://localhost:5000/api/customers/edit/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error("Failed to update customer");
            }
            navigate("/customers");
            alert("Customer updated successfully!");
        } catch (err) {
            alert(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomer();
    }, []);

    return (
        <div className="container mx-auto px-6 mt-16 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">Edit Customer</h1>
            </div>

            <form onSubmit={handleUpdate} className="bg-white p-8 shadow-lg rounded-lg">
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
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
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="totalSpending">Total Spending</label>
                    <input
                        type="number"
                        id="totalSpending"
                        value={totalSpending}
                        onChange={(e) => setTotalSpending(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                        disabled
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="visitCount">Visit Count</label>
                    <input
                        type="number"
                        id="visitCount"
                        value={visitCount}
                        onChange={(e) => setVisitCount(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastVisit">Last Visit</label>
                    <input
                        type="date"
                        id="lastVisit"
                        value={lastVisit}
                        onChange={(e) => setLastVisit(e.target.value)}
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
                        {loading ? "Updating..." : "Update Customer"}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default EditCustomer;
