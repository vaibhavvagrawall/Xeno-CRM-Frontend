import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";

function CampaignHistory() {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCampaigns = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/campaigns/history", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch campaigns");
            }

            const data = await response.json();
            setCampaigns(data);
        } catch (error) {
            setError(error.message);
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
                <h1 className="text-4xl font-bold text-gray-800">Campaign History</h1>
                <Link to="/campaigns/create">
                    <Button className="bg-red-600 text-white px-6 py-3 font-semibold rounded-lg shadow-md hover:bg-red-700">
                        Add Campaign
                    </Button>
                </Link>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="text-red-600">{error}</div>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow-lg">
                    <table className="min-w-full bg-white border-collapse">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-lg font-medium text-gray-600">Campaign Name</th>
                                <th className="px-6 py-4 text-left text-lg font-medium text-gray-600">Message</th>
                                <th className="px-6 py-4 text-left text-lg font-medium text-gray-600">Audience</th>
                                <th className="px-6 py-4 text-left text-lg font-medium text-gray-600">Date</th>
                                <th className="px-6 py-4 text-left text-lg font-medium text-gray-600"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {campaigns.map((campaign) => (
                                <tr key={campaign._id} className="border-t border-gray-200">
                                    <td className="px-6 py-4 text-gray-700">{campaign.name}</td>
                                    <td className="px-6 py-4 text-gray-700">{campaign.message}</td>
                                    <td className="px-6 py-4 text-gray-700">
                                        {campaign.audienceId?.name} (Size: {campaign.audienceId?.size})
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">{new Date(campaign.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">
                                        <Link to={`/campaigns/${campaign._id}`} className="text-blue-600 hover:underline">View Details</Link>
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

export default CampaignHistory;
