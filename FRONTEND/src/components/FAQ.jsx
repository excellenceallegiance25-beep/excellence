import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState("General Questions");
  const [openItems, setOpenItems] = useState([]);

  const faqData = [
    {
      id: "general",
      category: "General Questions",
      icon: "🌐",
      questions: [
        {
          question: "What services do you offer?",
          answer: "We offer web development, mobile app development, e-commerce solutions, cloud services, AI/ML solutions, and IT consulting services.",
          tags: ["services", "overview"]
        },
        {
          question: "Where is your company located?",
          answer: "We are based in Kolkata, West Bengal, India, but we serve clients worldwide.",
          tags: ["location", "global"]
        },
        {
          question: "Do you work with international clients?",
          answer: "Yes, we have experience working with clients from USA, UK, Canada, Australia, and Middle Eastern countries.",
          tags: ["international", "clients"]
        }
      ]
    },
    {
      id: "project",
      category: "Project & Development",
      icon: "🚀",
      questions: [
        {
          question: "What is your development process?",
          answer: "Our process includes: 1) Requirement Analysis, 2) Planning & Design, 3) Development, 4) Testing, 5) Deployment, and 6) Support.",
          tags: ["process", "methodology"]
        },
        {
          question: "Do you provide project timelines?",
          answer: "Yes, we provide detailed project timelines and regular progress updates throughout the development process.",
          tags: ["timeline", "progress"]
        },
        {
          question: "Can you work with our existing team?",
          answer: "Absolutely! We can collaborate with your in-house team and work as an extension of your development department.",
          tags: ["collaboration", "team"]
        }
      ]
    },
    {
      id: "pricing",
      category: "Pricing & Payment",
      icon: "💰",
      questions: [
        {
          question: "What are your payment terms?",
          answer: "We require 50% advance and 50% on delivery. For larger projects, we offer flexible payment plans with milestones.",
          tags: ["payment", "terms"]
        },
        {
          question: "Do you offer maintenance packages?",
          answer: "Yes, we offer monthly and yearly maintenance packages that include updates, security patches, and technical support.",
          tags: ["maintenance", "support"]
        },
        {
          question: "Are there any hidden costs?",
          answer: "No, we provide transparent pricing with no hidden costs. All charges are discussed and approved before starting.",
          tags: ["transparency", "costs"]
        }
      ]
    }
  ];

  const toggleItem = (category, index) => {
    const itemId = `${category}-${index}`;
    setOpenItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-600">
            FAQ
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Frequently Asked Questions about our services
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {faqData.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.category)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeCategory === category.category
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                    : 'bg-white border border-gray-300 text-gray-700 hover:border-cyan-300'
                }`}
              >
                {category.icon} {category.category}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqData
                .find(c => c.category === activeCategory)
                ?.questions.map((faq, index) => {
                  const itemId = `${activeCategory}-${index}`;
                  const isOpen = openItems.includes(itemId);
                  
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(activeCategory, index)}
                        className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50"
                      >
                        <span className="text-lg font-semibold text-gray-800">
                          {faq.question}
                        </span>
                        <span className="text-xl text-cyan-600">
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-5">
                          <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>

          {/* AI Assistant Notice */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-2xl p-8 inline-block">
              <p className="text-gray-700 mb-4">
                <span className="text-2xl">🤖</span> Can't find your answer? 
                <br />Ask our <span className="font-bold text-cyan-600">AI Assistant</span> at the bottom right corner!
              </p>
              <p className="text-sm text-gray-500">
                Click the blinking button to chat with our AI assistant
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQPage;