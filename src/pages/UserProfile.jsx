import React from 'react';
import { User, MapPin, Calendar } from 'lucide-react';

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{"name": "Guest", "email": "guest@example.com"}');
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Info Card */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-orange-100 p-4 rounded-full">
                  <User className="w-12 h-12 text-orange-500" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center mb-4">{user.name}</h2>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="text-gray-600">
                  <strong>Member Since:</strong> {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Bookings Section */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
            <div className="space-y-4">
              {bookings.length > 0 ? (
                bookings.map((booking, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{booking.tourName}</h3>
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-600">
                            <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                            <span>{booking.location}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                            <span>Booked on: {new Date().toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        Confirmed
                      </span>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-semibold mb-2">Booking Details:</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-600">
                            <strong>Leader:</strong> {booking.leaderName}
                          </p>
                          <p className="text-gray-600">
                            <strong>Email:</strong> {booking.email}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">
                            <strong>Phone:</strong> {booking.phone}
                          </p>
                          <p className="text-gray-600">
                            <strong>Status:</strong> Payment Verified
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <p className="text-gray-600">No bookings found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
