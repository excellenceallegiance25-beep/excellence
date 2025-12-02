import React, { useState, useEffect, useRef } from 'react';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hello! I'm Excellence AI Assistant. How can I help you today? You can ask about our services, pricing, process, or anything else!",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

 
  const aiKnowledge = {
    greeting: [
      "Hello! 👋 How can I assist you today?",
      "Hi there! Ready to help with Excellence IT Solutions.",
      "Welcome! Ask me anything about our services."
    ],
    services: [
      "We provide: 🔹 Web Development 🔹 Mobile Apps 🔹 E-commerce 🔹 Cloud Services 🔹 AI/ML Solutions 🔹 IT Consulting",
      "Our services include custom software development, website creation, mobile applications, cloud solutions, and AI integration.",
      "We offer end-to-end IT solutions from planning to deployment and maintenance."
    ],
    pricing: [
      "💰 Pricing varies by project. We offer: 1) Fixed Price 2) Hourly Rates 3) Monthly Retainers. Contact for detailed quote.",
      "Our rates are competitive. Small projects start at $500, medium $2000+, enterprise solutions custom priced.",
      "We provide transparent pricing with no hidden costs. Get a free quote based on your requirements."
    ],
    timeline: [
      "⏱️ Timeline depends on complexity: Simple website: 1-2 weeks, E-commerce: 2-4 weeks, Custom app: 1-3 months.",
      "We follow agile methodology. Typical delivery: Discovery (1 week), Design (2 weeks), Development (3-8 weeks), Testing (1-2 weeks).",
      "Project duration varies. We provide detailed timeline during planning phase."
    ],
    technology: [
      "🛠️ Tech stack: React, Vue, Angular, Node.js, Python, PHP, React Native, Flutter, PostgreSQL, MongoDB, AWS, Firebase",
      "We use modern technologies based on project needs including MERN stack, Python Django, and cloud platforms.",
      "Our expertise includes latest frameworks and tools for scalable and secure applications."
    ],
    contact: [
      "📞 Contact: Phone: +91 6289 534 780, Email: contact@excellence.com, Website: www.excellence.com",
      "Reach us at: Office: Kolkata, India. Email: info@excellence.com. WhatsApp: +91 6289 534 780",
      "Connect: Call us directly or fill contact form on website. Response within 2 hours."
    ],
    experience: [
      "🏆 10+ years experience, 200+ projects, 50+ clients globally across various industries.",
      "We have extensive experience in healthcare, education, retail, finance, and enterprise solutions.",
      "Our team has delivered successful projects for startups, SMEs, and large enterprises."
    ],
    process: [
      "📋 Our process: 1) Requirement Analysis 2) Planning 3) Design 4) Development 5) Testing 6) Deployment 7) Support",
      "We follow agile methodology with sprints, daily updates, and regular client demos.",
      "Process includes discovery workshop, prototyping, development sprints, QA testing, and launch."
    ],
    support: [
      "🔧 We provide 6 months free support, then optional maintenance packages with 24/7 availability.",
      "Support includes bug fixes, updates, security patches, performance monitoring, and technical assistance.",
      "Our maintenance packages: Bronze (basic), Silver (standard), Gold (premium with SLA)."
    ],
    default: [
      "I'm still learning! Can you rephrase or ask about our services, pricing, or process?",
      "For detailed information, please contact our team directly or check our website.",
      "I understand you're asking about our company. Visit our website for comprehensive details."
    ]
  }
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };


  const generateAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
  
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return aiKnowledge.greeting[Math.floor(Math.random() * aiKnowledge.greeting.length)];
    }
    else if (lowerMessage.includes('service') || lowerMessage.includes('offer') || lowerMessage.includes('do')) {
      return aiKnowledge.services[Math.floor(Math.random() * aiKnowledge.services.length)];
    }
    else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
      return aiKnowledge.pricing[Math.floor(Math.random() * aiKnowledge.pricing.length)];
    }
    else if (lowerMessage.includes('time') || lowerMessage.includes('how long') || lowerMessage.includes('duration')) {
      return aiKnowledge.timeline[Math.floor(Math.random() * aiKnowledge.timeline.length)];
    }
    else if (lowerMessage.includes('tech') || lowerMessage.includes('stack') || lowerMessage.includes('framework')) {
      return aiKnowledge.technology[Math.floor(Math.random() * aiKnowledge.technology.length)];
    }
    else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
      return aiKnowledge.contact[Math.floor(Math.random() * aiKnowledge.contact.length)];
    }
    else if (lowerMessage.includes('experience') || lowerMessage.includes('year') || lowerMessage.includes('background')) {
      return aiKnowledge.experience[Math.floor(Math.random() * aiKnowledge.experience.length)];
    }
    else if (lowerMessage.includes('process') || lowerMessage.includes('method') || lowerMessage.includes('work')) {
      return aiKnowledge.process[Math.floor(Math.random() * aiKnowledge.process.length)];
    }
    else if (lowerMessage.includes('support') || lowerMessage.includes('maintain') || lowerMessage.includes('help')) {
      return aiKnowledge.support[Math.floor(Math.random() * aiKnowledge.support.length)];
    }
    else {
      return aiKnowledge.default[Math.floor(Math.random() * aiKnowledge.default.length)];
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    const userMsg = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage("");
    setIsTyping(true);

   
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      
      const botMsg = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
   
    setTimeout(() => {
      const fakeEvent = { preventDefault: () => {} };
      setInputMessage(question);
      setTimeout(() => {
        handleSendMessage(fakeEvent);
      }, 100);
    }, 100);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: "👋 Hello! I'm Excellence AI Assistant. How can I help you today?",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <>
      
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 animate-pulse"
      >
        {isOpen ? (
          <span className="text-2xl">✕</span>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            <span className="text-sm font-semibold">AI Assistant</span>
          </div>
        )}
      </button>

      
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col">
          
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <span className="text-xl">🤖</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Excellence AI Assistant</h3>
                  <p className="text-sm text-cyan-100">Online • 24/7 Support</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={clearChat}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  title="Clear chat"
                >
                  🔄
                </button>
                <button
                  onClick={toggleChat}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  title="Close chat"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>

          
          <div className="p-3 bg-gray-50 border-b">
            <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {[
                "Services?",
                "Pricing?",
                "Timeline?",
                "Contact?"
              ].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickQuestion(q)}
                  className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm hover:bg-cyan-50 hover:border-cyan-300 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

         
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-br-none'
                      : 'bg-white border border-gray-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-cyan-100' : 'text-gray-500'}`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none p-3 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          
          <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your question here..."
                className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(e)}
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-3 rounded-xl hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span className="text-lg">🚀</span>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Ask about services, pricing, process, or anything else!
            </p>
          </form>
        </div>
      )}

      
      {!isOpen && (
        <div className="fixed bottom-20 right-5 w-3 h-3 bg-red-500 rounded-full animate-ping z-50"></div>
      )}
    </>
  );
};

export default AIChatbot;