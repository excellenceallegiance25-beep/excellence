import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "How long does it take to complete a project?",
      answer: "Typically, we complete projects within 3-5 working days. Complex projects may require additional time depending on the requirements."
    },
    {
      question: "What is the cost for website development?",
      answer: "Project costs depend on the requirements. Basic websites start from ₹10,000, e-commerce sites start from ₹25,000, and custom web applications are priced based on features."
    },
    {
      question: "Do you provide support after project delivery?",
      answer: "Yes, we provide 6 months of free support for all projects. After that, we offer continued support at reasonable rates."
    },
    {
      question: "What is your payment system?",
      answer: "We require 50% advance payment and 50% upon delivery. For larger projects, we can arrange payment in 3-4 installments."
    },
    {
      question: "Which technologies do you use?",
      answer: "We use modern technologies including React, Node.js, Python, MongoDB, MySQL, AWS, Firebase, WordPress, and other industry-standard tools."
    },
    {
      question: "Do you provide revisions?",
      answer: "Yes, we offer 3 free revisions within 15 days of project delivery to ensure complete satisfaction."
    },
    {
      question: "Do you provide hosting services?",
      answer: "Yes, we offer domain and hosting services. Quality hosting starts from ₹2,000 - ₹5,000 per year depending on requirements."
    },
    {
      question: "Can you work with existing websites?",
      answer: "Absolutely! We can redesign, update, or add new features to your existing website. We work with all types of platforms and technologies."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-600 text-center mb-12">
          Find answers to common questions about our services
        </p>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-lg font-semibold text-gray-800 flex-1 text-left">
                  {faq.question}
                </span>
                <span className={`text-xl font-bold text-blue-600 transition-transform duration-300 flex-shrink-0 ${
                  activeIndex === index ? 'rotate-180' : ''
                }`}>
                  {activeIndex === index ? '−' : '+'}
                </span>
              </button>

              <div
                className={`transition-all duration-300 overflow-hidden ${
                  activeIndex === index
                    ? 'max-h-48 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5">
                  <div className="w-12 h-1 bg-blue-600 rounded-full mb-4"></div>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? Please contact our team.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;