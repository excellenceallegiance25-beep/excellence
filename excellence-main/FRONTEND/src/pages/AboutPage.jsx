import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Amit Sharma",
      role: "CEO & Founder",
      description: "15+ years in software architecture and business transformation",
      image: "👨‍💼"
    },
    {
      name: "Priya Patel",
      role: "CTO",
      description: "Expert in cloud technologies and scalable system design",
      image: "👩‍💻"
    },
    {
      name: "Rajesh Kumar",
      role: "Lead Developer",
      description: "Full-stack development specialist with 10+ years experience",
      image: "👨‍🔧"
    },
    {
      name: "Sneha Singh",
      role: "UI/UX Designer",
      description: "Creative designer focused on user experience and modern interfaces",
      image: "👩‍🎨"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative overflow-hidden">
   
      <div className="absolute inset-0 overflow-hidden">
        
        <div className="absolute top-10 left-10 w-24 h-24 bg-blue-300 rounded-full opacity-30 animate-bounce" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-20 right-16 w-20 h-20 bg-purple-300 rounded-full opacity-40 animate-ping" style={{animationDuration: '4s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-pink-300 rounded-full opacity-25 animate-pulse" style={{animationDuration: '2s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-16 h-16 bg-cyan-300 rounded-full opacity-35 animate-bounce" style={{animationDuration: '5s'}}></div>
        
        
        <div className="absolute top-1/3 left-1/4 w-12 h-12 bg-yellow-300 rounded-lg opacity-30 animate-spin" style={{animationDuration: '8s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-14 h-14 bg-green-300 rounded-lg opacity-25 animate-pulse" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-3/4 left-1/3 w-10 h-10 bg-red-300 rounded-full opacity-40 animate-bounce" style={{animationDuration: '6s'}}></div>
        
      
        <div className="absolute top-0 left-0 w-full h-2 bg-blue-200 opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-purple-200 opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <Navbar />
      
      
      <section className="pt-32 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">About Us </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto">
              We are a passionate team of technology experts dedicated to transforming businesses through innovative digital solutions.
            </p>
          </div>
        </div>
      </section>

      
      <section className="py-16 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-white/30">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
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
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/30">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                To empower businesses with cutting-edge technology solutions that drive growth, 
                enhance efficiency, and create sustainable competitive advantages in the digital era.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/30">
              <div className="text-4xl mb-4">🔭</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                To be the most trusted technology partner for businesses worldwide, 
                known for innovation, reliability, and exceptional value delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Passionate professionals dedicated to delivering exceptional results
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 border border-white/30">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <div className="text-cyan-600 font-semibold mb-3">{member.role}</div>
                <p className="text-gray-700 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-lg text-center p-6 rounded-2xl shadow-lg border border-white/30">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-700">We constantly explore new technologies and approaches to deliver cutting-edge solutions.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-lg text-center p-6 rounded-2xl shadow-lg border border-white/30">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Collaboration</h3>
              <p className="text-gray-700">We work closely with our clients as partners in their success journey.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-lg text-center p-6 rounded-2xl shadow-lg border border-white/30">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Excellence</h3>
              <p className="text-gray-700">We strive for perfection in every project, ensuring the highest quality standards.</p>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default AboutPage;