import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../components/ui/button';

function CampaignView() {
    const { campaignId } = useParams();
    const [campaign, setCampaign] = useState(null);
    const [communicationLogs, setCommunicationLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCampaignDetails = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/campaigns/${campaignId}`, {
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
            setCampaign(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchCommunicationLogs = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/campaigns/${campaignId}/logs`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to fetch communication logs');
            }

            const data = await response.json();
            setCommunicationLogs(data);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchCampaignDetails();
        fetchCommunicationLogs();
    }, [campaignId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto px-6 mt-16 py-8">
            <h1 className="text-4xl font-bold text-gray-800">{campaign.name}</h1>
            <p className="mt-4">{campaign.message}</p>
            <h2 className="mt-6 text-2xl font-semibold">Audience</h2>
            <p>{campaign.audienceId?.name} (Size: {campaign.audienceId?.size})</p>

            <h2 className="mt-6 text-2xl font-semibold">Communication Logs</h2>
            <div className="overflow-x-auto rounded-lg shadow-lg">
                <table className="min-w-full bg-white border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-left text-lg font-medium text-gray-600">Log ID</th>
                            <th className="px-6 py-4 text-left text-lg font-medium text-gray-600">Status</th>
                            <th className="px-6 py-4 text-left text-lg font-medium text-gray-600">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {communicationLogs.map((log) => (
                            <tr key={log._id} className="border-t border-gray-200">
                                <td className="px-6 py-4 text-gray-700">{log._id}</td>
                                <td className="px-6 py-4 text-gray-700">{log.status}</td>
                                <td className="px-6 py-4 text-gray-700">{new Date(log.timestamp).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CampaignView;
