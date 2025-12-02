// pages/RegisterPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Popup from '../components/Popup';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [popupState, setPopupState] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    onConfirm: null,
    showCancel: false,
    confirmText: 'OK',
    cancelText: 'Cancel'
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [pendingRegistration, setPendingRegistration] = useState(null);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  
  const navigate = useNavigate();
  const { register, isUserRegistered } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  // Mock OTP service for development
  const mockSendOtp = (email, userName) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store in localStorage for verification
    localStorage.setItem(`reg_otp_${email}`, otp);
    localStorage.setItem(`reg_otp_expiry_${email}`, Date.now() + 10 * 60 * 1000);
    
    console.log(`📧 [REGISTER] OTP for ${email}: ${otp}`);
    console.log(`👤 User: ${userName}`);
    console.log(`🔑 Verification Code: ${otp}`);
    
    return {
      success: true,
      message: 'OTP sent successfully. Check console for OTP (dev mode).',
      otp: otp
    };
  };

  const mockVerifyOtp = (email, otp) => {
    const storedOtp = localStorage.getItem(`reg_otp_${email}`);
    const expiry = localStorage.getItem(`reg_otp_expiry_${email}`);
    
    if (!storedOtp) {
      return { success: false, message: 'No OTP found. Please request a new one.' };
    }
    
    if (Date.now() > parseInt(expiry)) {
      localStorage.removeItem(`reg_otp_${email}`);
      localStorage.removeItem(`reg_otp_expiry_${email}`);
      return { success: false, message: 'OTP has expired. Please request a new one.' };
    }
    
    if (storedOtp === otp) {
      localStorage.removeItem(`reg_otp_${email}`);
      localStorage.removeItem(`reg_otp_expiry_${email}`);
      return { success: true, message: 'Email verified successfully!' };
    } else {
      return { success: false, message: 'Invalid OTP. Please try again.' };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Validation
      if (!formData.name.trim()) {
        throw new Error('Name is required');
      }

      if (!formData.email.trim()) {
        throw new Error('Email is required');
      }

      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (isUserRegistered(formData.email)) {
        throw new Error('An account already exists with this email');
      }

      // Store registration data temporarily
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password
      };

      setPendingRegistration(userData);
      
      // Send OTP for email verification
      setOtpLoading(true);
      const otpResult = mockSendOtp(formData.email, formData.name);
      
      if (otpResult.success) {
        setOtpSent(true);
        setResendTimer(60); // 60 seconds cooldown
        setResendDisabled(true);
        
        // Start timer for resend
        const timer = setInterval(() => {
          setResendTimer(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              setResendDisabled(false);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        setPopupState({
          isOpen: true,
          title: '📧 Verification Code Sent',
          message: `A 6-digit verification code has been sent to ${formData.email}. Please check your email and enter the code below.`,
          type: 'info',
          showCancel: false,
          confirmText: 'Got it',
          onConfirm: () => setPopupState(prev => ({ ...prev, isOpen: false }))
        });
      } else {
        throw new Error(otpResult.message);
      }
      
    } catch (err) {
      setError(err.message);
      setPopupState({
        isOpen: true,
        title: '❌ Registration Failed',
        message: err.message,
        type: 'error',
        showCancel: false,
        confirmText: 'Try Again',
        onConfirm: () => setPopupState(prev => ({ ...prev, isOpen: false }))
      });
    } finally {
      setIsLoading(false);
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!pendingRegistration || !otpInput) {
      setError('Please enter the verification code');
      return;
    }

    if (otpInput.length !== 6) {
      setError('Verification code must be 6 digits');
      return;
    }

    setOtpLoading(true);
    const verificationResult = mockVerifyOtp(pendingRegistration.email, otpInput);
    
    if (verificationResult.success) {
      // OTP verified successfully - Complete registration
      register(pendingRegistration);
      
      // Set success state
      setRegistrationSuccess(true);
      
      // Show success popup
      setPopupState({
        isOpen: true,
        title: '🎉 Registration Successful!',
        message: `Congratulations ${pendingRegistration.name}! Your account has been created successfully. You can now login with your credentials.`,
        type: 'success',
        showCancel: false,
        confirmText: 'Go to Login',
        confirmButtonClass: 'bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700',
        onConfirm: () => {
          setPopupState(prev => ({ ...prev, isOpen: false }));
          navigate('/login');
        },
        showCloseButton: false,
        autoClose: false
      });
      
      // Also show a smaller success message on the page
      setTimeout(() => {
        setPopupState(prev => ({
          ...prev,
          message: 'Redirecting to login page in 5 seconds...'
        }));
      }, 2000);
      
      // Auto redirect after 5 seconds
      setTimeout(() => {
        if (popupState.isOpen) {
          setPopupState(prev => ({ ...prev, isOpen: false }));
        }
        navigate('/login');
      }, 5000);
      
    } else {
      setError(verificationResult.message || 'Invalid verification code');
      setPopupState({
        isOpen: true,
        title: '❌ Verification Failed',
        message: verificationResult.message || 'Invalid code. Please try again.',
        type: 'error',
        showCancel: false,
        confirmText: 'Retry',
        onConfirm: () => setPopupState(prev => ({ ...prev, isOpen: false }))
      });
    }
    
    setOtpLoading(false);
  };

  const handleResendOtp = async () => {
    if (!pendingRegistration || resendDisabled) return;
    
    setResendDisabled(true);
    setResendTimer(60);
    setOtpLoading(true);
    
    const otpResult = mockSendOtp(pendingRegistration.email, pendingRegistration.name);
    
    if (otpResult.success) {
      // Start timer for resend
      const timer = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      setPopupState({
        isOpen: true,
        title: '🔄 Code Resent',
        message: `A new verification code has been sent to ${pendingRegistration.email}.`,
        type: 'success',
        showCancel: false,
        confirmText: 'OK',
        onConfirm: () => setPopupState(prev => ({ ...prev, isOpen: false }))
      });
    } else {
      setError(otpResult.message);
      setResendDisabled(false);
    }
    
    setOtpLoading(false);
  };

  const handleBackToForm = () => {
    setOtpSent(false);
    setOtpInput('');
    setPendingRegistration(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative overflow-hidden">
     
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-24 h-24 bg-blue-300 rounded-full opacity-30 animate-bounce" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-20 right-16 w-20 h-20 bg-purple-300 rounded-full opacity-40 animate-ping" style={{animationDuration: '4s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-pink-300 rounded-full opacity-25 animate-pulse" style={{animationDuration: '2s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-16 h-16 bg-cyan-300 rounded-full opacity-35 animate-bounce" style={{animationDuration: '5s'}}></div>
      </div>

      <Navbar />
      
      <div className="pt-24 pb-12 relative z-10">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Registration Success Banner */}
          {registrationSuccess && (
            <div className="mb-6 p-4 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg shadow-lg animate-fade-in">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">🎉</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-bold">Registration Complete!</h3>
                  <p className="text-sm opacity-90">
                    Your account has been created. You can now login.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className={`bg-white rounded-lg shadow-md border border-gray-200 p-8 transition-all duration-300 ${
            registrationSuccess ? 'border-green-300 shadow-green-100' : ''
          }`}>
            
            <div className="text-center mb-8">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                registrationSuccess 
                  ? 'bg-gradient-to-r from-green-400 to-blue-500 animate-pulse'
                  : otpSent 
                    ? 'bg-gradient-to-r from-blue-400 to-purple-500'
                    : 'bg-gradient-to-r from-green-400 to-blue-500'
              }`}>
                {registrationSuccess ? (
                  <span className="text-2xl text-white">✓</span>
                ) : otpSent ? (
                  <span className="text-2xl text-white">📧</span>
                ) : (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {registrationSuccess 
                  ? 'Account Created Successfully!'
                  : otpSent 
                    ? 'Verify Your Email'
                    : 'Create Account'}
              </h2>
              <p className="text-gray-600 mt-2">
                {registrationSuccess 
                  ? 'You can now login to your account'
                  : otpSent 
                    ? 'Enter the verification code sent to your email'
                    : 'Join Excellence Allegiance today'}
              </p>
              
              {otpSent && pendingRegistration && (
                <div className="mt-4 p-3 bg-blue-50 rounded-md">
                  <p className="text-sm text-gray-700">
                    Code sent to: <span className="font-semibold">{pendingRegistration.email}</span>
                  </p>
                </div>
              )}
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md animate-shake">
                {error}
              </div>
            )}

            {!registrationSuccess ? (
              !otpSent ? (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-10"
                        placeholder="Enter your password (min 6 characters)"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? '🙈' : '👁️'}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Must be at least 6 characters
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <input
                      name="confirmPassword"
                      type="password"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex items-start">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      required
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                      I agree to the{' '}
                      <Link to="/terms-of-service" className="text-blue-600 hover:text-blue-800">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy-policy" className="text-blue-600 hover:text-blue-800">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 px-4 rounded-md font-medium transition-all duration-300 ${
                      isLoading 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-1'
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Verification Code...
                      </div>
                    ) : (
                      'Continue to Verification'
                    )}
                  </button>

                  <div className="text-center">
                    <p className="text-gray-600">
                      Already have an account?{' '}
                      <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-gray-600 mb-4">
                      Please check your email <span className="font-semibold">{pendingRegistration?.email}</span> for the 6-digit verification code.
                    </p>
                    <p className="text-sm text-gray-500 mb-6">
                      Enter the code below to verify your email address and complete registration.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      6-Digit Verification Code
                    </label>
                    <input
                      type="text"
                      maxLength="6"
                      value={otpInput}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                        setOtpInput(value);
                      }}
                      className="w-full px-3 py-3 text-center text-2xl font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 tracking-widest"
                      placeholder="000000"
                    />
                    <div className="flex justify-between mt-2">
                      <p className="text-xs text-gray-500">
                        Code expires in 10 minutes
                      </p>
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={resendDisabled || otpLoading}
                        className="text-xs text-blue-600 hover:text-blue-800 disabled:text-gray-400"
                      >
                        {resendDisabled ? `Resend in ${resendTimer}s` : 'Resend Code'}
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleVerifyOtp}
                      disabled={otpLoading || otpInput.length !== 6}
                      className={`flex-1 py-3 rounded-md font-medium transition-all duration-300 ${
                        otpLoading || otpInput.length !== 6
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-1'
                      }`}
                    >
                      {otpLoading ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Verifying...
                        </div>
                      ) : 'Verify & Create Account'}
                    </button>
                  </div>

                  <button
                    onClick={handleBackToForm}
                    className="w-full py-2 text-blue-600 hover:text-blue-800 font-medium hover:underline"
                  >
                    ← Back to Registration Form
                  </button>

                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-sm text-yellow-800">
                      <span className="font-semibold">Development Note:</span> Check browser console for the verification code.
                    </p>
                  </div>
                </div>
              )
            ) : (
              <div className="text-center space-y-6 animate-fade-in">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <span className="text-3xl">🎉</span>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Welcome to Excellence Allegiance!
                  </h3>
                  <p className="text-gray-600">
                    Your account has been successfully created.
                  </p>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Account Details:</span>
                  </p>
                  <div className="mt-2 space-y-1 text-left">
                    <p className="text-sm"><span className="font-medium">Name:</span> {pendingRegistration?.name}</p>
                    <p className="text-sm"><span className="font-medium">Email:</span> {pendingRegistration?.email}</p>
                    <p className="text-sm"><span className="font-medium">Status:</span> <span className="text-green-600 font-semibold">Verified ✓</span></p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => navigate('/login')}
                    className="flex-1 py-3 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Go to Login
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-md border border-gray-300 transition-colors"
                  >
                    Back to Home
                  </button>
                </div>

                <div className="text-sm text-gray-500">
                  <p>You will be redirected to login page in a few seconds...</p>
                </div>
              </div>
            )}
          </div>

          {/* Security Information */}
          {!registrationSuccess && (
            <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Secure Registration Process</h3>
              <ul className="text-xs text-gray-600 space-y-1">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Two-step verification with email OTP
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Passwords encrypted and securely stored
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Email verification prevents unauthorized access
                </li>
              </ul>
            </div>
          )}

          {/* Development Help */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-center">
            <p className="text-xs text-blue-800">
              <span className="font-semibold">For Development:</span> Check browser console (F12) for OTP codes
            </p>
          </div>
        </div>
      </div>

      <Popup {...popupState} onClose={() => setPopupState(prev => ({ ...prev, isOpen: false }))} />
      

    </div>
  );
};

export default RegisterPage;