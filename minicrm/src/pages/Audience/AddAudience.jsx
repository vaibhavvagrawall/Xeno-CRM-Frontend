import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

function AddAudience() {
    const [name, setName] = useState("");
    const [conditions, setConditions] = useState([{ field: "", operator: "", value: "" }]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleAddCondition = () => {
        setConditions([...conditions, { field: "", operator: "", value: "" }]);
    };

    const handleRemoveCondition = (index) => {
        const newConditions = conditions.filter((_, i) => i !== index);
        setConditions(newConditions);
    };

    const handleChangeCondition = (index, field, value) => {
        const newConditions = [...conditions];
        newConditions[index][field] = value;
        setConditions(newConditions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const audienceData = {
            name,
            conditions,
        };

        try {
            const response = await fetch("http://localhost:5000/api/audiences", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(audienceData),
            });

            if (!response.ok) {
                throw new Error("Failed to create audience");
            }

            navigate("/audiences");
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-6 mt-16 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">Create New Audience</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-lg">
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2">Audience Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                        placeholder="Enter audience name"
                        required
                    />
                </div>

                {conditions.map((condition, index) => (
                    <div key={index} className="mb-6">
                        <div className="flex space-x-4 items-center">
                            <select
                                value={condition.field}
                                onChange={(e) => handleChangeCondition(index, "field", e.target.value)}
                                className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                            >
                                <option value="" disabled>Select Condition</option>
                                <option value="totalSpending">Total Spending</option>
                                <option value="visitCount">Visit Count</option>
                                <option value="lastVisit">Last Visit</option>
                            </select>
                            <select
                                value={condition.operator}
                                onChange={(e) => handleChangeCondition(index, "operator", e.target.value)}
                                className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                            >
                                <option value="" disabled>Select Operator</option>
                                <option value=">">Greater than</option>
                                <option value=">=">Greater than and Equal to</option>
                                <option value="<">Less than</option>
                                <option value="<=">Less than and Equal to</option>
                                <option value="!=">Not Equal to</option>
                                <option value="=">Equal to</option>
                            </select>
                            <input
                                type="text"
                                value={condition.value}
                                onChange={(e) => handleChangeCondition(index, "value", e.target.value)}
                                className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                                placeholder="Value"
                            />
                            {conditions.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemoveCondition(index)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                <div className="flex justify-between mb-6">
                    <Button
                        variant="outline"
                        className="border-gray-600 text-gray-600 hover:bg-gray-100"
                        type="button"
                        onClick={handleAddCondition}
                    >
                        Add Condition
                    </Button>
                    <Button
                        variant="solid"
                        className="bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md"
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Audience"}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default AddAudience;
