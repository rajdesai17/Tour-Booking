import React, { useState } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { Plane, User, Menu, X } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isLoggedIn = !!user.email;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Plane className="h-6 w-6 text-orange-500" />
          <span className="text-xl font-bold">TRAVEL<span className="text-orange-500">WORLD</span></span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink to="/" activeClassName="text-orange-500" className="text-gray-600 hover:text-orange-500">Home</NavLink>
          <NavLink to="/about" activeClassName="text-orange-500" className="text-gray-600 hover:text-orange-500">About</NavLink>
          <NavLink to="/tours" activeClassName="text-orange-500" className="text-gray-600 hover:text-orange-500">Tours</NavLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 mt-4">
          <NavLink to="/" activeClassName="text-orange-500" className="text-gray-600 hover:text-orange-500">Home</NavLink>
          <NavLink to="/about" activeClassName="text-orange-500" className="text-gray-600 hover:text-orange-500">About</NavLink>
          <NavLink to="/tours" activeClassName="text-orange-500" className="text-gray-600 hover:text-orange-500">Tours</NavLink>
        </div>
      )}

      {/* Authentication Links / User Profile */}
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <Link to="/profile" className="flex items-center text-gray-600 hover:text-orange-500">
              <User className="w-5 h-5 mr-2" />
              <span>{user.name}</span>
            </Link>
            <button 
              onClick={handleLogout}
              className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-600 hover:text-orange-500">Login</Link>
            <Link 
              to="/register" 
              className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
