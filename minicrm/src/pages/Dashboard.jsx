import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [totals, setTotals] = useState({
    customers: 0,
    orders: 0,
    audiences: 0,
    campaigns: 0,
    messages: {
        sent: 0,
        failed: 0,
    }
  });

  const fetchDashboardData = async () => {
    try {
        const customerTotal = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/dashboard/total/customers`,{
            credentials: 'include'
        });
        const orderTotal = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/dashboard/total/orders`,{
            credentials: 'include'
        });
        const audienceTotal = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/dashboard/total/audiences`,{
            credentials: 'include'
        });
        const campaignTotal = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/dashboard/total/campaigns`, { 
            credentials: 'include' 
        });
        const messageTotal = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/dashboard/total/messages`, { 
            credentials: 'include' 
        });
        const customers = await customerTotal.json();
        const orders = await orderTotal.json();
        const audiences = await audienceTotal.json();
        const campaigns = await campaignTotal.json();
        const messages = await messageTotal.json();

        setTotals({
            customers: customers.total,
            orders: orders.total,
            audiences: audiences.total,
            campaigns: campaigns.total,
            messages: {
                sent: messages.sent,
                failed: messages.failed
            }
        });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };
  
  
  useEffect(() => {
    fetchDashboardData();
  }, []); 

  return (
    <div className="container mx-auto px-6 mt-16 py-8">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
        </div>
         
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-xl font-medium">Total Customers</h3>
                <p className="text-2xl font-bold">{totals.customers}</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-xl font-medium">Total Orders</h3>
                <p className="text-2xl font-bold">{totals.orders}</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-xl font-medium">Total Audiences</h3>
                <p className="text-2xl font-bold">{totals.audiences}</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-xl font-medium">Total Campaigns</h3>
                <p className="text-2xl font-bold">{totals.campaigns}</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-xl font-medium">Total Messages</h3>
                <p className="text-2xl font-bold text-green-600">Sent: {totals.messages.sent}</p>
                <p className="text-2xl font-bold text-red-600">Failed: {totals.messages.failed}</p>
            </div>
        </div>
    </div>
  );
};

export default Dashboard;
