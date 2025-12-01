import React, { useState, useEffect } from 'react';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [testimonials, setTestimonials] = useState([]);

  // Default testimonials if no reviews
  const defaultTestimonials = [
    {
      id: 1,
      name: "Rajesh Sharma",
      company: "TechNova Solutions",
      role: "CEO",
      content: "Excellence Allegiance transformed our outdated systems into modern, efficient platforms.",
      rating: 5,
      image: "👨‍💼",
      date: "2024-01-15"
    },
    {
      id: 2,
      name: "Priya Patel", 
      company: "Global Retail Inc",
      role: "Operations Manager",
      content: "The e-commerce solution they built increased our sales by 200%.",
      rating: 5,
      image: "👩‍💼",
      date: "2024-01-10"
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
        image: "😊",
        date: review.date
      }));

  
    const allTestimonials = [...approvedReviews, ...defaultTestimonials];
    setTestimonials(allTestimonials);
  }, []);

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real feedback from our valued clients
          </p>
        </div>

       
        <div className="relative max-w-4xl mx-auto">
          
        
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
            
            <div className="relative z-10">
             
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-2xl">⭐</span>
                ))}
              </div>

              
              <div className="text-center mb-8">
                <p className="text-xl md:text-2xl text-gray-700 italic leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-6xl mb-4">{testimonials[currentTestimonial].image}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {testimonials[currentTestimonial].name}
                </h3>
                <div className="text-blue-600 font-semibold mb-1">
                  {testimonials[currentTestimonial].role}
                </div>
                <div className="text-gray-500">
                  {testimonials[currentTestimonial].company}
                </div>
                <div className="text-gray-400 text-sm mt-2">
                  {new Date(testimonials[currentTestimonial].date).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

         
          <button onClick={prevTestimonial} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-50">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button onClick={nextTestimonial} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-50">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? 'bg-blue-600 w-8' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

     
        <div className="mt-16 max-w-2xl mx-auto">
          <ReviewForm />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;