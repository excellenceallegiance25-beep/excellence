import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Logo */}
        <div className="text-4xl font-bold text-blue-600 mb-4">
          Excellence Allegiance
        </div>
        
        {/* Spinner */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        {/* Loading Text */}
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;