import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Header from './pages/Header';
import Dashboard from "./pages/Dashboard";
import CustomerList from './pages/Customer/CustomerList';
import AddCustomer from './pages/Customer/AddCustomer';
import OrderList from './pages/Order/OrderList';
import AddOrder from './pages/Order/AddOrder';
import AudienceList from './pages/Audience/AudienceList';
import AddAudience from './pages/Audience/AddAudience';
import AudienceView from './pages/Audience/AudienceView';
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers/create" element={<AddCustomer />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/orders/create" element={<AddOrder />} />
        <Route path="/audiences" element = {<AudienceList />} />
        <Route path="/audiences/create" element = {<AddAudience />} />
        <Route path="/audiences/:id" element = {<AudienceView />} />
        <Route path="*" element = {<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
