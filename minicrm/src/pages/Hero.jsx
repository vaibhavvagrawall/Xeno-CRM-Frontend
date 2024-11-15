import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';

function Hero() {
    const handleGetStarted = () => {
        window.open(`${import.meta.env.VITE_SERVER_URL}/auth/google`, "_self");
    };

  return (
    <div className='mx-auto'>
      <section className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-24 px-6 text-center">
        <div className="max-w-5xl m-auto">
          <h1 className="text-4xl font-semibold mb-4">Welcome to Your CRM & Campaign Management</h1>
          <p className="text-lg mb-8">Streamline your campaigns, manage audiences, and track your success all in one place.</p>
          <div className="flex justify-center gap-6">
            <Button onClick={handleGetStarted} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg shadow-md">Get Started</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
