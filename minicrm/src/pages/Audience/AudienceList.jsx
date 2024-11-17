import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "../../components/ui/button";

function AudienceList() {
    const [audiences, setAudiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    
    const fetchAudiences = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/audiences/list", {
                method: 'GET',
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
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (audienceId) => {
        if (window.confirm("Are you sure you want to delete this audience?")) {
            try {
                const response = await fetch(`http://localhost:5000/api/audiences/delete/${audienceId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Failed to delete audience");
                }

                setAudiences(audiences.filter((audience) => audience._id !== audienceId));
            } catch (error) {
                alert(`Error deleting audience: ${error.message}`);
            }
        }
    };

    const handleEdit = (audienceId) => {
        navigate(`/audiences/edit/${audienceId}`);
    };

    useEffect(() =>{
        fetchAudiences();
    },[]);

    return (
    <div className="container mx-auto px-6 mt-16 py-8">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Audience List</h1>
            <Link to="/audiences/create">
                <Button className="bg-red-600 text-white px-6 py-3 font-semibold rounded-lg shadow-md hover:bg-red-700">
                    Create Audience
                </Button>
            </Link>
        </div>
        <div className="overflow-x-auto rounded-lg shadow-lg">
                <table className="min-w-full bg-white border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-left text-lg font-medium text-gray-600">Name</th>
                            <th className="px-6 py-4 text-left text-lg font-medium text-gray-600">Conditions</th>
                            <th className="px-6 py-4 text-left text-lg font-medium text-gray-600">Size</th>
                            <th className="px-6 py-4 text-left text-lg font-medium text-gray-600">Details</th>
                            <th className="px-6 py-4 text-left text-lg font-medium text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {audiences.map((audience) => (
                            <tr key={audience._id} className="border-t border-gray-200">
                                <td className="px-6 py-4 text-gray-700">{audience.name}</td>
                                <td className="px-6 py-4 text-gray-700">
                                    {audience.conditions.map((condition, index) => (
                                        <p key={index}>
                                            {condition.field} {condition.operator} {condition.value}
                                        </p>
                                    ))}
                                </td>
                                <td className="px-6 py-4 text-gray-700">{audience.size}</td>
                                <td className="px-6 py-4 text-gray-700">
                                    <Link to={`/audiences/${audience._id}`}>
                                        <Button variant="outlined" className="text-blue-600 hover:underline">View Details</Button>
                                    </Link>
                                </td>
                                <td className="px-6 py-4 flex space-x-4">
                                    <Button
                                        className="bg-red-600 text-white px-6 py-3 font-semibold rounded-lg shadow-md hover:bg-red-700"
                                        onClick={() => handleEdit(audience._id)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        className="bg-red-600 text-white px-6 py-3 font-semibold rounded-lg shadow-md hover:bg-red-700"
                                        onClick={() => handleDelete(audience._id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AudienceList;
