import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const services = [
    {
      icon: "💻",
      title: "Web Development",
      description: "Modern websites and web applications"
    },
    {
      icon: "📱", 
      title: "Mobile Apps",
      description: "iOS & Android applications"
    },
    {
      icon: "☁️",
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure"
    },
    {
      icon: "🤖",
      title: "AI Solutions",
      description: "AI & Machine Learning"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section - With Background Image */}
      <section 
        className="pt-32 pb-20 text-white relative overflow-hidden min-h-screen flex items-center"
        style={{
          backgroundImage: 'url("/next.avif")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Excellence Allegiance
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
            We build digital solutions that transform businesses
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Start Project
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              View Services
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We provide comprehensive technology solutions for your business
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - With Background Image */}
      <section 
        className="py-20 text-white relative"
        style={{
          backgroundImage: 'url("/office.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl font-bold mb-6">
            About Excellence Allegiance
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            We are a passionate team of technology experts dedicated to transforming businesses through innovative digital solutions.
          </p>
        </div>
      </section>

      {/* Stats Section - Simple */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Our Achievements
              </h2>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">50+</div>
                  <div className="text-gray-600 font-medium">Projects Completed</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">25+</div>
                  <div className="text-gray-600 font-medium">Happy Clients</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">5+</div>
                  <div className="text-gray-600 font-medium">Years Experience</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">15+</div>
                  <div className="text-gray-600 font-medium">Team Members</div>
                </div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md">
                <img 
                  src="/achiv.avif" 
                  alt="Our Team Achievements"
                  className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to get started?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Let's discuss your project and create something amazing
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Get Free Consultation
          </button>
        </div>
      </section>

    
    </div>
  );
};

export default Home;