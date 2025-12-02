import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/AboutPage';
import Services from './pages/OurService';
import Contact from './pages/ContactPage';
import FAQ from './pages/FAQPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { OtpProvider } from './contexts/OtpContext'; 
import AdminDashboard from './pages/AdminDashboard';
import CreateProject from './pages/CreateProject';
import CookiePolicy from './pages/CookiePolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Testimonials from './components/Testimonials';
import AIChatbot from './components/AIChatbot';
import './App.css';

const FallbackHome = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
    <div className="text-center text-white">
      <h1 className="text-5xl font-bold mb-4">Excellence Allegiance</h1>
      <p className="text-xl mb-8">Your Trusted IT Solutions Partner</p>
      <div className="space-x-4">
        <a href="/about" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
          Learn More
        </a>
        <a href="/contact" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600">
          Contact Us
        </a>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <OtpProvider> 
        <Router>
          <div className="App">
            {/* Navbar সবসময় উপরে থাকবে */}
            <Navbar />
            
            {/* Main Content */}
            <main className="relative">
              {/* AI Chatbot - এটা সবসময় দেখাবে (floating) */}
              <AIChatbot />
              
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/projects/new" element={<CreateProject />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="*" element={<FallbackHome />} />
              </Routes>
            </main>
            
            {/* Footer সবসময় নিচে থাকবে */}
            <Footer />
          </div>
        </Router>
      </OtpProvider>
    </AuthProvider>
  );
}

export default App;