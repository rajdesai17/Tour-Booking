import React, { useState } from 'react';
import { MapPin, Users, Calendar } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';
import BookingForm from './BookingForm';

const TourCard = ({ tour }) => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleBooking = async (formData) => {
    try {
      if (!user) {
        toast.error('Please login to book a tour');
        return;
      }

      const bookingData = {
        tour_id: tour.id,
        user_id: user.id,
        leader_name: formData.leaderName,
        email: formData.email,
        phone: formData.phone,
        number_of_people: parseInt(formData.numberOfPeople),
        status: 'pending',
        created_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('bookings')
        .insert([bookingData]);

      if (error) throw error;

      toast.success('Booking submitted successfully!');
      setShowBookingForm(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
        <img 
          src={tour.image} 
          alt={tour.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{tour.name}</h3>
          
          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2 text-orange-500" />
              <span>{tour.location}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <Users className="w-4 h-4 mr-2 text-orange-500" />
              <span>Max: {tour.max_people} people</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2 text-orange-500" />
              <span>{new Date(tour.date).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-bold text-orange-500">
              ${tour.price}
            </span>
            <button 
              onClick={() => {
                if (!user) {
                  toast.error('Please login to book a tour');
                  return;
                }
                setShowBookingForm(true);
              }}
              className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {showBookingForm && (
        <BookingForm
          tourId={tour.id}
          tourName={tour.name}
          maxPeople={tour.max_people}
          onClose={() => setShowBookingForm(false)}
          onSubmit={handleBooking}
        />
      )}
    </>
  );
};

export default TourCard; 