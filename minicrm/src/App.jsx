import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Header from './pages/Header';
import Dashboard from "./pages/Dashboard";
import CustomerList from './pages/Customer/CustomerList';
import AddCustomer from './pages/Customer/AddCustomer';
import PageNotFound from "./pages/PageNotFound"
import OrderList from './pages/Order/OrderList';
import AddOrder from './pages/Order/AddOrder';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/create-customer" element={<AddCustomer />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/create-order" element={<AddOrder />} />
        <Route path = "*" element = {<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
