import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

function AddCampaign() {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [audiences, setAudiences] = useState([]);
    const [audienceId, setAudienceId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const fetchAudiences = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/audiences/list", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch audiences");
            }

            const data = await response.json();
            setAudiences(data);
        } catch (error) {
            console.error("Error fetching audiences:", error);
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchAudiences();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const campaignData = {
            name,
            message,
            audienceId,
        };

        try {
            const response = await fetch("http://localhost:5000/api/campaigns", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(campaignData),
            });

            if (!response.ok) {
                throw new Error("Failed to create campaign");
            }

            navigate("/campaigns");
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-6 mt-16 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">Create Campaign</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-lg">
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="campaignName">
                        Campaign Name
                    </label>
                    <input
                        type="text"
                        id="campaignName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                        Message
                    </label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="audience">
                        Select Audience
                    </label>
                    <select
                        id="audience"
                        value={audienceId}
                        onChange={(e) => setAudienceId(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                    >
                        <option value="" disabled>
                            Select an audience
                        </option>
                        {audiences.map((audience) => (
                            <option key={audience._id} value={audience._id}>
                                {audience.name} (Size: {audience.size})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-end">
                    <Button
                        variant="solid"
                        className="bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md"
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Campaign"}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default AddCampaign;
