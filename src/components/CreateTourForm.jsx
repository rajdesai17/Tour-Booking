import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateTourForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    maxPeople: '',
    date: '',
    price: '',
    image: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Tour created:', formData);
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Create New Tour</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Tour Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-2 border rounded-lg focus:border-orange-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              className="w-full p-2 border rounded-lg focus:border-orange-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Maximum People</label>
            <input
              type="number"
              value={formData.maxPeople}
              onChange={(e) => setFormData(prev => ({ ...prev, maxPeople: e.target.value }))}
              className="w-full p-2 border rounded-lg focus:border-orange-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Tour Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="w-full p-2 border rounded-lg focus:border-orange-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Price</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              className="w-full p-2 border rounded-lg focus:border-orange-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Image URL</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              className="w-full p-2 border rounded-lg focus:border-orange-500 outline-none"
              required
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
            >
              Create Tour
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/dashboard')}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTourForm;
