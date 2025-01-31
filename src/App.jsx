import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Login from './pages/Login';
import Register from './pages/Register';
import Tours from './pages/Tours';
import AdminDashboard from './components/AdminDashboard';
import UserProfile from './pages/UserProfile';
import CreateTourForm from './components/CreateTourForm';
import EditTourForm from './components/EditTourForm';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/create-tour" element={<CreateTourForm />} />
          <Route path="/admin/edit-tour/:id" element={<EditTourForm />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
