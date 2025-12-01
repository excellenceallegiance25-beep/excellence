// src/pages/OtpLoginPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const OtpLoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">OTP Login</h2>
          <p className="text-gray-600 mt-2">Coming Soon!</p>
        </div>
        
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-700 text-sm">
              OTP login feature is under development. Please use password login for now.
            </p>
          </div>
          
          <Link 
            to="/login"
            className="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
          >
            Go to Password Login
          </Link>
          
          <Link 
            to="/"
            className="block w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OtpLoginPage;