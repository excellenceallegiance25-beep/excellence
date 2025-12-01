
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const OurService = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedService, setExpandedService] = useState(null);

  const services = [
    {
      id: 1,
      title: "Web Development",
      category: "development",
      icon: "💻",
      description: "Custom web applications built with modern technologies like React, Next.js, and Node.js",
      features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Secure", "Cross-Browser Compatible"],
      technologies: ["React", "Next.js", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
      details: "We create modern, responsive websites and web applications that provide exceptional user experiences. Our web development services include frontend and backend development, API integration, and performance optimization to ensure your digital presence stands out."
    },
    {
      id: 2,
      title: "Mobile App Development",
      category: "mobile", 
      icon: "📱",
      description: "Cross-platform mobile applications for iOS and Android using React Native and Flutter",
      features: ["Cross-Platform", "Native Performance", "Offline Support", "Push Notifications", "App Store Deployment"],
      technologies: ["React Native", "Flutter", "Firebase", "REST API", "Redux", "TypeScript"],
      details: "Build powerful mobile applications that work seamlessly across iOS and Android platforms. We focus on creating intuitive user interfaces and smooth performance to deliver exceptional mobile experiences."
    },
    {
      id: 3,
      title: "E-Commerce Solutions",
      category: "ecommerce",
      icon: "🛒",
      description: "Complete online store development with payment integration and inventory management",
      features: ["Payment Gateway", "Inventory Management", "Order Tracking", "Customer Portal", "Analytics Dashboard"],
      technologies: ["Shopify", "WooCommerce", "Stripe", "PayPal", "Magento", "Square"],
      details: "Launch your online store with our comprehensive e-commerce solutions. We handle everything from product catalog setup to payment integration and order management, ensuring a seamless shopping experience for your customers."
    },
    {
      id: 4,
      title: "Cloud Solutions",
      category: "cloud",
      icon: "☁️",
      description: "Scalable cloud infrastructure and deployment on AWS, Azure, and Google Cloud",
      features: ["Auto Scaling", "Load Balancing", "CDN", "Database Management", "Security", "Monitoring"],
      technologies: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "CI/CD"],
      details: "Migrate your applications to the cloud with our expert cloud solutions. We ensure scalability, security, and cost-effectiveness for your business with robust cloud infrastructure and deployment strategies."
    },
    {
      id: 5,
      title: "AI & ML Solutions",
      category: "ai",
      icon: "🤖",
      description: "Artificial Intelligence and Machine Learning solutions for business automation",
      features: ["Predictive Analytics", "Computer Vision", "NLP", "Automation", "Chatbots", "Recommendation Systems"],
      technologies: ["Python", "TensorFlow", "PyTorch", "OpenCV", "NLP", "Computer Vision"],
      details: "Leverage the power of AI and ML to automate processes, gain insights from data, and create intelligent applications that learn and adapt to your business needs."
    },
    {
      id: 6,
      title: "Digital Marketing",
      category: "marketing",
      icon: "📊",
      description: "Complete digital marketing strategies including SEO, SEM, and social media marketing",
      features: ["SEO Optimization", "PPC Campaigns", "Social Media", "Analytics Reports", "Content Strategy", "Conversion Optimization"],
      technologies: ["SEO", "Google Ads", "Facebook Ads", "Analytics", "Content Marketing", "Email Marketing"],
      details: "Boost your online presence with our data-driven digital marketing strategies. We help you reach your target audience and convert visitors into customers through comprehensive marketing campaigns."
    }
  ];

  const filters = [
    { key: 'all', label: 'All Services' },
    { key: 'development', label: 'Web Development' },
    { key: 'mobile', label: 'Mobile Apps' },
    { key: 'ecommerce', label: 'E-Commerce' },
    { key: 'cloud', label: 'Cloud Solutions' },
    { key: 'ai', label: 'AI & ML' },
    { key: 'marketing', label: 'Digital Marketing' }
  ];

  const filteredServices = activeFilter === 'all' 
    ? services 
    : services.filter(service => service.category === activeFilter);

  const toggleService = (id) => {
    setExpandedService(expandedService === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
            Comprehensive technology solutions to transform your business and drive exponential growth
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Started Today
            </Link>
            <a 
              href="#services" 
              className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-xl font-semibold transition-all duration-300"
            >
              Explore Services
            </a>
          </div>
        </div>
      </section>

      {/* Services Filter */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Expertise
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our comprehensive range of professional services designed to elevate your business
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeFilter === filter.key
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200 hover:border-blue-300'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div id="services" className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <div 
                key={service.id} 
                className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 overflow-hidden group"
              >
                <div className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="text-4xl transform group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.technologies.slice(0, 4).map((tech, index) => (
                      <span 
                        key={index} 
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-100"
                      >
                        {tech}
                      </span>
                    ))}
                    {service.technologies.length > 4 && (
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                        +{service.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => toggleService(service.id)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-center"
                    >
                      Learn More
                    </button>
                    <Link
                      to="/contact"
                      className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 text-center"
                    >
                      Get Quote
                    </Link>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedService === service.id && (
                  <div className="border-t border-gray-200 bg-gray-50">
                    <div className="p-8">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">Service Overview</h4>
                          <p className="text-gray-600 leading-relaxed">{service.details}</p>
                        </div>
                        
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">Ready to Start?</h4>
                          <p className="text-gray-600 mb-4">Let's discuss your project requirements and create a customized solution.</p>
                          <div className="flex flex-col space-y-3">
                            <Link
                              to="/contact"
                              className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300 text-center"
                            >
                              Start Project
                            </Link>
                            <a
                              href="tel:+916289534780"
                              className="border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 px-6 rounded-lg font-semibold transition-colors duration-300 text-center"
                            >
                              Call for Consultation
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredServices.length === 0 && (
            <div className="text-center py-16">
              <div className="text-8xl mb-6">🔍</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">No services found</h3>
              <p className="text-gray-600 text-lg mb-8">Try selecting a different service category</p>
              <button
                onClick={() => setActiveFilter('all')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors duration-300"
              >
                View All Services
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Let's collaborate to create innovative solutions that drive your business forward. 
            Our team is ready to bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-blue-600 px-10 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
            >
              Start Your Project
            </Link>
            <a
              href="tel:+916289534780"
              className="border-2 border-white text-white px-10 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 text-lg"
            >
              Schedule Call
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      
    </div>
  );
};

export default OurService;