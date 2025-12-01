import React, { useState, useEffect } from 'react';
import ReviewForm from './ReviewForm';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const defaultTestimonials = [
    {
      id: 1,
      name: "Rajesh Sharma",
      company: "TechNova Solutions",
      role: "CEO",
      content: "Excellence Allegiance transformed our outdated systems into modern, efficient platforms. Their team delivered exceptional results ahead of schedule.",
      rating: 5,
      avatarColor: "bg-gradient-to-br from-blue-500 to-cyan-400",
      initials: "RS",
      date: "2024-01-15"
    },
    {
      id: 2,
      name: "Priya Patel", 
      company: "Global Retail Inc",
      role: "Operations Manager",
      content: "The e-commerce solution they built increased our sales by 200% within 3 months. Simply outstanding performance!",
      rating: 5,
      avatarColor: "bg-gradient-to-br from-purple-500 to-pink-400",
      initials: "PP",
      date: "2024-01-10"
    },
    {
      id: 3,
      name: "Amit Kumar",
      company: "FinTech Innovations",
      role: "CTO",
      content: "Their cloud migration expertise saved us 40% in infrastructure costs while improving performance significantly.",
      rating: 5,
      avatarColor: "bg-gradient-to-br from-green-500 to-emerald-400",
      initials: "AK",
      date: "2024-01-05"
    },
    {
      id: 4,
      name: "Sneha Gupta",
      company: "HealthCare Plus",
      role: "IT Director",
      content: "The mobile app they developed has revolutionized how our patients interact with our services. Highly recommended!",
      rating: 5,
      avatarColor: "bg-gradient-to-br from-orange-500 to-amber-400",
      initials: "SG",
      date: "2024-01-20"
    }
  ];

  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    
    const approvedReviews = savedReviews
      .filter(review => review.status === 'approved')
      .map(review => ({
        id: review.id,
        name: review.name,
        company: review.company,
        role: 'Client',
        content: review.review,
        rating: parseInt(review.rating),
        avatarColor: "bg-gradient-to-br from-indigo-500 to-blue-400",
        initials: review.name.split(' ').map(n => n[0]).join('').toUpperCase(),
        date: review.date
      }));

    const allTestimonials = [...approvedReviews, ...defaultTestimonials];
    setTestimonials(allTestimonials);
  }, []);

  useEffect(() => {
    let interval;
    if (testimonials.length > 0 && isAutoPlaying) {
      interval = setInterval(() => {
        handleNext();
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [testimonials.length, isAutoPlaying]);

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      setIsAnimating(false);
    }, 300);
  };

  const handlePrev = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsAnimating(false);
    }, 300);
  };

  const handleDotClick = (index) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentTestimonial(index);
      setIsAnimating(false);
    }, 300);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  if (testimonials.length === 0) {
    return null;
  }

  const currentTestimonialData = testimonials[currentTestimonial];

  return (
    <section className="py-24 bg-gradient-to-b from-white via-blue-50/30 to-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-r from-cyan-200/20 to-teal-200/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with animation */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 font-semibold animate-bounce">
              <svg className="w-5 h-5 mr-2 animate-spin" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Trusted by 50+ Companies
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
            Client Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in">
            Discover why businesses trust us with their digital transformation journey
          </p>
        </div>

        {/* Main testimonial card with animations */}
        <div className="relative max-w-5xl mx-auto">
          {/* Floating quote marks */}
          <div className="absolute -top-8 -left-8 text-8xl text-blue-100/50 font-serif">"</div>
          <div className="absolute -bottom-12 -right-8 text-8xl text-blue-100/50 font-serif">"</div>

          {/* Testimonial card */}
          <div className={`
            bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl shadow-blue-100/50 
            border border-white/20 p-8 md:p-12 relative overflow-hidden
            transition-all duration-500 transform ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
          `}>
            {/* Animated background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
            
            <div className="relative z-10">
              {/* Rating stars with animation */}
              <div className="flex justify-center mb-8">
                {[...Array(5)].map((_, i) => (
                  <span 
                    key={i} 
                    className={`
                      text-3xl mx-1 transform transition-all duration-500
                      ${i < currentTestimonialData.rating 
                        ? 'text-yellow-400 scale-110 drop-shadow-lg' 
                        : 'text-gray-300'
                      }
                      ${i < currentTestimonialData.rating ? 'animate-bounce' : ''}
                    `}
                    style={{animationDelay: `${i * 100}ms`}}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Testimonial text with typing animation */}
              <div className="text-center mb-10 relative">
                <div className="absolute -left-4 top-1/2 -translate-y-1/2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                </div>
                
                <p className="text-2xl md:text-3xl text-gray-700 leading-relaxed font-light">
                  <span className="relative">
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50 to-transparent animate-shine"></span>
                    "{currentTestimonialData.content}"
                  </span>
                </p>
                
                <div className="absolute -right-4 top-1/2 -translate-y-1/2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '500ms'}}></div>
                </div>
              </div>

              {/* Client info with hover effects */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-6 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-2xl backdrop-blur-sm">
                {/* Animated avatar */}
                <div className={`
                  relative w-20 h-20 rounded-2xl ${currentTestimonialData.avatarColor} 
                  flex items-center justify-center text-white text-2xl font-bold
                  shadow-lg transform transition-all duration-500 hover:scale-110 hover:rotate-12
                  ${isAnimating ? 'animate-spin' : ''}
                `}>
                  {currentTestimonialData.initials}
                  <div className="absolute inset-0 border-2 border-white/30 rounded-2xl animate-pulse"></div>
                </div>

                {/* Client details */}
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1 animate-fade-in-up">
                    {currentTestimonialData.name}
                  </h3>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 text-gray-600">
                    <span className="font-semibold text-blue-600">{currentTestimonialData.role}</span>
                    <span className="hidden md:inline">•</span>
                    <span className="text-gray-700">{currentTestimonialData.company}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-gray-400">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    {new Date(currentTestimonialData.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation buttons with hover effects */}
          <button 
            onClick={handlePrev}
            className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-xl shadow-blue-100/50 border border-white/20 hover:bg-white hover:scale-110 hover:shadow-2xl transition-all duration-300 group"
          >
            <svg className="w-8 h-8 text-gray-600 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button 
            onClick={handleNext}
            className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-xl shadow-blue-100/50 border border-white/20 hover:bg-white hover:scale-110 hover:shadow-2xl transition-all duration-300 group"
          >
            <svg className="w-8 h-8 text-gray-600 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Control buttons */}
          <div className="flex justify-center items-center gap-6 mt-10">
            <button
              onClick={toggleAutoPlay}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isAutoPlaying ? (
                <>
                  <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                  Pause Auto-Play
                </>
              ) : (
                <>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  Play Auto-Play
                </>
              )}
            </button>
          </div>

          {/* Progress dots with animation */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className="relative group"
              >
                <div className={`
                  w-3 h-3 rounded-full transition-all duration-500
                  ${index === currentTestimonial 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 w-8 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                  }
                `}></div>
                <div className={`
                  absolute -top-2 -left-2 -right-2 -bottom-2 rounded-full border-2 
                  ${index === currentTestimonial 
                    ? 'border-blue-200 animate-ping' 
                    : 'border-transparent'
                  }
                `}></div>
              </button>
            ))}
          </div>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          {[
            { label: 'Client Satisfaction', value: '98%', color: 'from-green-400 to-emerald-500' },
            { label: 'Projects Delivered', value: '150+', color: 'from-blue-400 to-cyan-500' },
            { label: 'Support Rating', value: '4.9/5', color: 'from-purple-400 to-pink-500' },
            { label: 'Repeat Clients', value: '85%', color: 'from-orange-400 to-amber-500' }
          ].map((stat, index) => (
            <div 
              key={index}
              className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500"
              style={{animationDelay: `${index * 200}ms`}}
            >
              <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Review form section */}
        <div className="mt-24 max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: '500ms'}}>
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Share Your Experience</h3>
            <p className="text-gray-600">Help others by sharing your success story with us</p>
          </div>
          <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-3xl p-8 shadow-xl border border-white/20">
            <ReviewForm />
          </div>
        </div>
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-shine {
          animation: shine 2s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;