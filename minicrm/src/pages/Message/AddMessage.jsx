import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

function AddMessage() {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [campaigns, setCampaigns] = useState([]);
    const [selectedCampaign, setSelectedCampaign] = useState("");
    const navigate = useNavigate();

    const fetchCampaigns = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/campaigns/history`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch campaigns");
            }

            const data = await response.json();
            setCampaigns(data);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleCampaignChange = (e) => {
        setSelectedCampaign(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const messageData = {
            message,
            campaignId: selectedCampaign,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/messages/send`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(messageData),
            });

            if (!response.ok) {
                throw new Error("Failed to send messages");
            }

            navigate("/messages");
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, []);

    return (
        <div className="container mx-auto px-6 mt-16 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">Send Message</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-lg">
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="campaign">
                        Select Campaign
                    </label>
                    <select
                        id="campaign"
                        value={selectedCampaign}
                        onChange={handleCampaignChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        required
                    >
                        <option value="">Select a Campaign</option>
                        {campaigns.map((campaign) => (
                            <option key={campaign._id} value={campaign._id}>
                                {campaign.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                        Message
                    </label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>

                <Button
                    variant="solid"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md"
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Send Message"}
                </Button>
            </form>
        </div>
    );
}

export default AddMessage;
