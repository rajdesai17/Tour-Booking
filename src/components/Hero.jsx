import React from 'react';
import SearchBar from './SearchBar';

const Hero = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2">
          <div className="inline-flex items-center bg-orange-100 px-4 py-2 rounded-full mb-6">
            <span className="text-orange-500 font-medium">Know Before You Go</span>
            <span className="ml-2">🌎</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Traveling opens the door to creating{' '}
            <span className="text-orange-500">memories</span>
          </h1>
          
          <p className="text-gray-600 mb-8">
            Discover amazing destinations around the world. From historic landmarks to 
            breathtaking landscapes, find your perfect adventure with our curated selection 
            of tours.
          </p>

          <SearchBar />
        </div>

        <div className="lg:w-1/2 flex gap-4">
          <img 
            src="https://images.unsplash.com/photo-1565836653595-2899d4e46d94?auto=format&fit=crop&w=600"
            alt="Louvre Museum"
            className="rounded-2xl object-cover h-96"
          />
          <div className="flex flex-col gap-4">
            <img 
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600"
              alt="Aerial view"
              className="rounded-2xl object-cover h-44"
            />
            <img 
              src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=600"
              alt="Mountain view"
              className="rounded-2xl object-cover h-48"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
