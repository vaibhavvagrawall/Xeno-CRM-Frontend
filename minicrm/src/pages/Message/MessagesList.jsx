import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

function MessagesList() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMessages = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/messages", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch messages");
            }

            const data = await response.json();
            setMessages(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <div className="container mx-auto px-6 mt-16 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">Message History</h1>
                <Link to="/messages/send">
                    <Button className="bg-red-600 text-white px-6 py-3 font-semibold rounded-lg shadow-md hover:bg-red-700">
                        Send Message
                    </Button>
                </Link>
            </div>

            <div className="overflow-x-auto rounded-lg shadow-lg">
                <table className="min-w-full bg-white border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-left text-lg font-medium text-gray-600">Campaign</th>
                            <th className="px-6 py-4 text-left text-lg font-medium text-gray-600">Message</th>
                            <th className="px-6 py-4 text-left text-lg font-medium text-gray-600">Status</th>
                            <th className="px-6 py-4 text-left text-lg font-medium text-gray-600">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map((message) => (
                            <tr key={message._id} className="border-t border-gray-200">
                                <td className="px-6 py-4 text-gray-700">{message.campaignName}</td>
                                <td className="px-6 py-4 text-gray-700">{message.message}</td>
                                <td className="px-6 py-4 text-gray-700">{message.status}</td>
                                <td className="px-6 py-4 text-gray-700">{new Date(message.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MessagesList;
