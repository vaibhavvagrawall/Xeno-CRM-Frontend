import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CampaignView() {
    const { id } = useParams();
    const [campaignDetails, setCampaignDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCampaignDetails = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/campaigns/${id}/details`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to fetch campaign details');
            }

            const data = await response.json();
            setCampaignDetails(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCampaignDetails();
    }, [id]);

    return (
        <div className="container mx-auto px-6 mt-16 py-8">
            <h1 className="text-4xl font-bold mb-6">{campaignDetails.campaignName}</h1>
            <p className="text-lg mb-4">{campaignDetails.message}</p>
            <p className="text-lg mb-4">Audience Size: {campaignDetails.audienceSize}</p>
            <h2 className="text-2xl font-bold mt-8">Communication Logs</h2>
            <div className="overflow-x-auto rounded-lg shadow-lg mt-4">
                <table className="min-w-full bg-white border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-left text-lg font-medium text-gray-600">Customer Name</th>
                            <th className="px-6 py-4 text-left text-lg font-medium text-gray-600">Customer Email</th>
                            <th className="px-6 py-4 text-left text-lg font-medium text-gray-600">Message</th>
                            <th className="px-6 py-4 text-left text-lg font-medium text-gray-600">Status</th>
                            <th className="px-6 py-4 text-left text-lg font-medium text-gray-600">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaignDetails.logs.map((log) => (
                            <tr key={log._id} className="border-t border-gray-200">
                                <td className="px-6 py-4 text-gray-700">{log.customerName}</td>
                                <td className="px-6 py-4 text-gray-700">{log.customerEmail}</td>
                                <td className="px-6 py-4 text-gray-700">{log.message}</td>
                                <td className="px-6 py-4 text-gray-700">{log.status}</td>
                                <td className="px-6 py-4 text-gray-700">
                                    {new Date(log.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CampaignView;
