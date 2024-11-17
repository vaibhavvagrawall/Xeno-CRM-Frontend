import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkAuthStatus = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/login/success`, {
        method: 'GET',
        credentials: 'include',
      });
        
      if (response.ok) {
        const data = await response.json();

        if (data.user) {
          setIsAuthenticated(true);
          navigate('/dashboard');
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error checking authentication status:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const handleLogin = () => {
    window.open(`${import.meta.env.VITE_SERVER_URL}/auth/google`, '_self');
  };

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) {
      return;
    }
    try {
      await fetch(`${import.meta.env.VITE_SERVER_URL}/logout`, {
        method: 'GET',
        credentials: 'include',
      });
      setIsAuthenticated(false);
      navigate('/');
    } catch (error) {
      throw new Error("Error Logging Out");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-slate-200 h-[60px] shadow-lg flex items-center justify-between px-5 z-50">
      <Link to="/" className="font-semibold text-[#f56551] text-lg flex items-center gap-2">
        <h2 className="text-xl">Xeno Mini-CRM</h2>
      </Link>

      <nav className="flex-1 flex justify-center items-center gap-6">
        {isAuthenticated && (
          <>
            <Link to="/dashboard" className="text-red-600 hover:underline">
              Dashboard
            </Link>
            <Link to="/customers" className="text-red-600 hover:underline">
              Customers
            </Link>
            <Link to="/orders" className="text-red-600 hover:underline">
              Orders
            </Link>
            <Link to="/audiences" className="text-red-600 hover:underline">
              Audiences
            </Link>
            <Link to="/campaigns" className="text-red-600 hover:underline">
              Campaigns
            </Link>
            <Link to="/messages" className="text-red-600 hover:underline">
              Messages
            </Link>
          </>
        )}
      </nav>

      <div>
        {isAuthenticated ? (
          <Button variant="solid" className="text-white font-semibold bg-red-600 hover:bg-red-800" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button variant="solid" className="text-white font-semibold bg-red-600 hover:bg-red-800" onClick={handleLogin}>
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
