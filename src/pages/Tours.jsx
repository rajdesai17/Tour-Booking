import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';
import TourCard from '../components/TourCard';

const Tours = () => {
  const [searchParams] = useSearchParams();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const location = searchParams.get('location')?.toLowerCase();
        
        let query = supabase
          .from('tours')
          .select(`
            *,
            destinations (name, image_url)
          `)
          .order('created_at', { ascending: false });

        if (location) {
          query = query.ilike('destinations.name', `%${location}%`);
        }

        const { data, error } = await query;
        if (error) throw error;

        setTours(data.map(tour => ({
          ...tour,
          image: tour.destinations.image_url,
          location: tour.destinations.name
        })));

        // Fetch destinations for the filter
        const { data: destinationsData, error: destinationsError } = await supabase
          .from('destinations')
          .select('*');
        
        if (destinationsError) throw destinationsError;
        setDestinations(destinationsData);

      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [searchParams]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Available Tours</h2>
      
      {/* Destinations Filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        {destinations.map(dest => (
          <button
            key={dest.id}
            onClick={() => {
              const searchParams = new URLSearchParams(window.location.search);
              searchParams.set('location', dest.name);
              window.history.pushState({}, '', `?${searchParams.toString()}`);
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="px-4 py-2 rounded-full bg-gray-200 hover:bg-orange-500 hover:text-white transition-colors"
          >
            {dest.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map(tour => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </div>
  );
};

export default Tours; 