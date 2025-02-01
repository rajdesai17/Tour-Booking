import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';
import { User, Mail, Phone, Map, Calendar, Users, Plus, Edit, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState([]);
  const [tours, setTours] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    full_name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        setAdmin(user);
        setProfileData({
          full_name: user.name,
          email: user.email,
          phone: ''
        });

        // Fetch bookings with joins
        const { data: bookingsData, error: bookingsError } = await supabase
          .from('bookings')
          .select(`
            *,
            tours (
              name,
              date,
              price
            ),
            profiles:user_id (
              full_name,
              email
            )
          `)
          .eq('tours.created_by', user.id)
          .order('created_at', { ascending: false });

        if (bookingsError) throw bookingsError;
        setBookings(bookingsData);

      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleProfileUpdate = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profileData.full_name,
          phone: profileData.phone
        })
        .eq('id', admin.id);

      if (error) throw error;

      // Update local storage
      localStorage.setItem('user', JSON.stringify({
        ...admin,
        name: profileData.full_name
      }));

      toast.success('Profile updated successfully');
      setEditMode(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteTour = async (tourId) => {
    if (!window.confirm('Are you sure you want to delete this tour?')) return;

    try {
      const { error } = await supabase
        .from('tours')
        .delete()
        .eq('id', tourId);

      if (error) throw error;

      setTours(tours.filter(tour => tour.id !== tourId));
      toast.success('Tour deleted successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Profile Information</h2>
            <button
              onClick={() => setEditMode(!editMode)}
              className="text-orange-500 hover:text-orange-600"
            >
              {editMode ? 'Cancel' : 'Edit'}
            </button>
          </div>

          {editMode ? (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={profileData.full_name}
                  onChange={(e) => setProfileData({ ...profileData, full_name: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <button
                onClick={handleProfileUpdate}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
              >
                Save Changes
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <p><strong>Name:</strong> {admin.name}</p>
              <p><strong>Email:</strong> {admin.email}</p>
              <p><strong>Role:</strong> Tour Manager</p>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-gray-500 text-sm">{stat.title}</h3>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tours Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Your Tours</h2>
            <Link
              to="/admin/create-tour"
              className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Tour
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map(tour => (
              <div key={tour.id} className="border rounded-lg p-4">
                <img
                  src={tour.destinations.image_url}
                  alt={tour.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold mb-2">{tour.name}</h3>
                <p className="text-gray-600 mb-4">{tour.destinations.name}</p>
                <div className="flex justify-between items-center">
                  <span className="text-orange-500 font-bold">${tour.price}</span>
                  <div className="flex space-x-2">
                    <Link
                      to={`/admin/edit-tour/${tour.id}`}
                      className="p-2 text-blue-500 hover:text-blue-600"
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDeleteTour(tour.id)}
                      className="p-2 text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bookings Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
          <div className="overflow-x-auto">
            {bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-semibold">
                      {booking.tours?.name || 'Unnamed Tour'}
                    </h3>
                    <p>Booked by: {booking.profiles?.full_name}</p>
                    <p>Email: {booking.profiles?.email}</p>
                    <p>Date: {new Date(booking.tours?.date).toLocaleDateString()}</p>
                    <p>People: {booking.number_of_people}</p>
                    <p>Status: {booking.status}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No bookings found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;