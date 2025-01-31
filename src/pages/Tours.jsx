import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import TourCard from '../components/TourCard';

const defaultTours = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1565836653595-2899d4e46d94',
    name: 'Paris Adventure',
    location: 'Paris, France',
    price: 1299,
    maxPeople: 12,
    date: '2024-06-15'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1533050487297-09b450131914',
    name: 'Tokyo Explorer',
    location: 'Tokyo, Japan',
    price: 1599,
    maxPeople: 10,
    date: '2024-07-20'
  },
  // Add 8 more tours here...
];

const Tours = () => {
  const [searchParams] = useSearchParams();
  const [filteredTours, setFilteredTours] = useState(defaultTours);

  useEffect(() => {
    const location = searchParams.get('location')?.toLowerCase();
    setFilteredTours(
      location
        ? defaultTours.filter(tour => tour.location.toLowerCase().includes(location))
        : defaultTours
    );
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Available Tours</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTours.map(tour => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </div>
  );
};

export default Tours;
