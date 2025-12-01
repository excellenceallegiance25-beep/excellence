// src/contexts/OtpContext.jsx
import React, { createContext, useState, useContext } from 'react';

const OtpContext = createContext();

export const useOtp = () => {
  return useContext(OtpContext);
};

export const OtpProvider = ({ children }) => {
  const [otpData, setOtpData] = useState({});

  const generateOtp = (email) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('Generated OTP for', email, ':', otp); // For testing
    return otp;
  };

  const verifyOtp = (email, userOtp) => {
    return { success: true, message: 'OTP verified' }; // Simple version
  };

  const value = {
    generateOtp,
    verifyOtp
  };

  return (
    <OtpContext.Provider value={value}>
      {children}
    </OtpContext.Provider>
  );
};