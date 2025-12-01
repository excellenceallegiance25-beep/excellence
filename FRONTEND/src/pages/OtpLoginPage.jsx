// src/pages/OtpLoginPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const OtpLoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">OTP Login</h1>
        <p className="text-gray-600 mb-6">This feature is coming soon!</p>
        <Link 
          to="/login"
          className="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Go to Regular Login
        </Link>
      </div>
    </div>
  );
};

export default OtpLoginPage;