import React, { useState, useEffect } from 'react';
import { Users, Map, Calendar } from 'lucide-react';

const AdminDashboard = () => {
  const [admin, setAdmin] = useState({ name: 'Admin' }); // Default fallback
  const [stats, setStats] = useState([
    { title: 'Your Tours', value: '12', icon: Map, color: 'bg-blue-500' },
    { title: 'Bookings Received', value: '48', icon: Calendar, color: 'bg-green-500' },
    { title: 'Total Customers', value: '156', icon: Users, color: 'bg-purple-500' }
  ]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser.name) setAdmin(storedUser);

    // TODO: Fetch real stats from backend instead of using hardcoded values
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, {admin.name}!
          </h1>
          <p className="text-gray-600">Here's what's happening with your tours today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">{stat.title}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                </div>
                <div className={`${stat.color} p-3 rounded-full`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
          <table className="w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Booking ID</th>
                <th className="border p-2 text-left">Customer</th>
                <th className="border p-2 text-left">Tour</th>
                <th className="border p-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {/* Sample data */}
              <tr>
                <td className="border p-2">#001</td>
                <td className="border p-2">John Doe</td>
                <td className="border p-2">Paris Trip</td>
                <td className="border p-2">2025-02-15</td>
              </tr>
              <tr>
                <td className="border p-2">#002</td>
                <td className="border p-2">Jane Smith</td>
                <td className="border p-2">Rome Adventure</td>
                <td className="border p-2">2025-02-20</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
