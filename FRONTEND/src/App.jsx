// src/App.jsx
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
import CookiePolicy from './pages/CookiePolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Testimonials from './components/Testimonials';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <OtpProvider> 
        <Router>
          <div className="App">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/login" element={<LoginPage />} />
                
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/testimonials" element={<Testimonials />} />
                
                
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </OtpProvider>
    </AuthProvider>
  );
}

export default App;