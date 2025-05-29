import React, { useState, useEffect, useRef } from 'react';
import { FaComments, FaTimes, FaPaperPlane, FaSpinner } from 'react-icons/fa';
import { GoogleGenerativeAI } from '@google/generative-ai';

const Chatbot = () => {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const messagesEndRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Check for mobile view on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize Gemini with the provided API key
  const genAI = new GoogleGenerativeAI("AIzaSyBYPXCPMeIsR2d_6yVB4mkSSF0zGdFPx8Y");
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  // Predefined contact option
  const contactOption = "Contact our team";

  // Enhanced predefined questions
  const quickQuestions = [
    "What is housing data?",
    "Tell me about tenant rights",
    "Housing affordability",
    "Indigenous housing"
  ];

  const keywordMap = [
    {
      keywords: ["housing data", "hous dat", "housng data", "house info", "housing information", "housing stats", "housing statistics", "housing numbers", "housing figures", "house data", "housing dataset"],
      answer: "Housing data includes information on affordability, rental rates, homeownership, and construction. It helps governments and organizations plan better housing strategies. CMHC and Statistics Canada are leading sources of housing datasets in Canada. These sources allow access to national and regional breakdowns. Visit <a href='https://www.cmhc-schl.gc.ca/' target='_blank'>CMHC</a> and <a href='https://www.statcan.gc.ca/en/subjects-start/housing' target='_blank'>Statistics Canada</a> for more details."
    },
    {
      keywords: ["housing affordability", "affortability", "afforatibility", "affort housing", "afford house", "afford home", "affordable housing", "affordable house", "affordable home", "housing cost", "house cost", "home cost", "expensive housing", "housing prices", "house prices", "home prices"],
      answer: "Housing affordability refers to whether people can afford their housing without financial strain. According to CMHC data, spending over 30% of income on shelter is considered unaffordable. In many Canadian cities, over 35% of households face affordability issues. Federal and provincial governments use subsidies and strategies like the Canada Housing Benefit to improve this. <a href='https://www.cmhc-schl.gc.ca/en/professionals/housing-markets-data-and-research/housing-research/research-reports/housing-finance/housing-affordability' target='_blank'>CMHC</a> and Statistics Canada track affordability trends."
    },
    {
      keywords: ["indigenous housing", "first nations", "inuit", "on reserve", "indigenous communities", "native housing", "aboriginal housing", "first nation housing", "metis housing", "métis housing", "reserve housing", "native communities"],
      answer: "Indigenous housing includes homes for First Nations, Métis, and Inuit people. Based on CMHC research, many communities face challenges like overcrowding, unsafe conditions, and lack of infrastructure. The federal government invests in Indigenous-led housing programs through CMHC initiatives. Efforts are being made to ensure cultural relevance and safety. See <a href='https://www.cmhc-schl.gc.ca/en/professionals/industry-innovation-and-leadership/industry-expertise/indigenous-housing' target='_blank'>CMHC Indigenous Housing</a> for reports and data."
    },
    {
      keywords: ["tenant rights", "rent laws", "eviction", "renter protection", "renter rights", "tenant law", "tenant protection", "renting rights", "renters rights", "tenant legal", "rental law", "rental laws", "lease rights", "leasing rights", "tenancy rights", "tenancy laws", "landlord tenant"],
      answer: "Tenant rights are legal protections for renters across Canada. According to CMHC resources, these include the right to a safe home, privacy, and fair eviction notices. Each province has its own rental rules and dispute processes. Tenants should always check their local housing authority's guidelines. Visit provincial websites or <a href='https://www.cmhc-schl.gc.ca/en/consumers/renting-a-home' target='_blank'>CMHC's rental resources</a> to learn more about specific protections in your region."
    },
    {
      keywords: ["contact", "email", "talk to team", "talk to real person", "real person", "contact team", "human", "agent", "speak to someone", "real human", "representative", "support team", "help desk", "customer service", "customer support", "reach out", "get in touch"],
      answer: "Would you like to talk to a real person from our team?"
    },
    {
      keywords: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "greetings", "howdy", "hiya", "what's up", "sup", "yo", "hola", "bonjour"],
      answer: "Hi there! I'm your Housing Assistant bot. You can ask about topics like affordability, rental laws, housing starts, or Indigenous housing. I can provide information from CMHC and Statistics Canada resources. If I don't know something, I'll help you contact a real team member. Just type your question below."
    },
    {
      keywords: ["help", "support", "i need help", "assist", "assistance", "what can you do", "what do you do", "how does this work", "how to use", "capabilities", "features", "functions", "purpose", "how can you help"],
      answer: "I'm here to support you with Canadian housing data and questions based on CMHC and Statistics Canada information. You can ask about affordability, construction, tenant rights, or government programs. I'll give you answers sourced from official Canadian housing resources. If I can't help, I'll let you message a real person. Just type your question to begin."
    },
    {
      keywords: ["cmhc", "canada mortgage", "mortgage housing", "cmhc.ca", "canada mortgage and housing", "housing corporation", "cmch", "cmhc website", "schl", "mortgage housing corporation", "housing agency", "federal housing agency", "national housing agency", "what is cmhc", "who is cmhc"],
      answer: "CMHC (Canada Mortgage and Housing Corporation) is Canada's national housing agency. They provide mortgage loan insurance, housing market research, and funding for housing programs. CMHC offers valuable data on housing trends, market analysis, and affordability indicators. Their website (<a href='https://www.cmhc-schl.gc.ca/' target='_blank'>https://www.cmhc-schl.gc.ca/</a>) contains reports, statistics, and tools for both consumers and housing professionals."
    },
    {
      keywords: ["housing market", "real estate market", "property market", "home market", "market conditions", "market trends", "buying market", "sellers market", "buyers market", "hot market", "cooling market", "market forecast", "housing forecast", "market outlook", "housing outlook"],
      answer: "According to CMHC data, the Canadian housing market varies significantly by region. Major urban centers like Toronto and Vancouver typically experience higher prices and demand. CMHC provides quarterly Housing Market Assessment reports analyzing overvaluation and overbuilding risks. Statistics Canada and local real estate boards offer monthly statistics on sales volume and pricing trends. Visit <a href='https://www.cmhc-schl.gc.ca/en/professionals/housing-markets-data-and-research' target='_blank'>CMHC's market research</a> for detailed analysis."
    },
    {
      keywords: ["mortgage", "home loan", "house loan", "financing", "interest rates", "down payment", "downpayment", "mortgage rates", "pre approval", "preapproval", "mortgage insurance", "cmhc insurance", "mortgage stress test", "qualifying", "amortization", "mortgage term"],
      answer: "CMHC data shows Canadian mortgages typically require at least 5% down payment, with CMHC insurance required for down payments under 20%. The mortgage stress test ensures borrowers can handle higher interest rates. Fixed and variable rate options are available with various term lengths. First-time homebuyers may access special programs like the First-Time Home Buyer Incentive. Check <a href='https://www.cmhc-schl.gc.ca/en/consumers/home-buying' target='_blank'>CMHC's homebuyer resources</a> for more information."
    },
    {
      keywords: ["statistics canada", "statcan", "stats can", "statscan", "stat can", "statistics", "canadian statistics", "census housing", "housing census", "household statistics", "housing survey"],
      answer: "Statistics Canada (StatCan) is Canada's national statistical agency that collects and analyzes data on housing, among many other topics. They conduct the Census of Population which includes housing data, and specialized surveys like the Canadian Housing Survey. StatCan provides valuable information on housing conditions, ownership rates, and shelter costs across different demographics. Visit <a href='https://www.statcan.gc.ca/en/subjects-start/housing' target='_blank'>Statistics Canada's housing portal</a> for comprehensive datasets and analysis."
    },
    {
      keywords: ["thank you", "thanks", "bye", "see ya", "see you", "thank"],
      answer: "No problem! Let me know if you need anything else."
    }
  ];

  // Check for keyword matches - case insensitive
  const checkKeywords = (input) => {
    const lowerInput = input.toLowerCase();
    for (const item of keywordMap) {
      for (const keyword of item.keywords) {
        if (lowerInput.includes(keyword.toLowerCase())) {
          return item.answer;
        }
      }
    }
    return null;
  };

  // Call Gemini API for fallback responses
  const fetchGeminiResponse = async (query) => {
    try {
      const prompt = `Act as a Canadian housing expert assistant. Answer the following question concisely in 2-3 sentences with factual information about Canadian housing, referencing CMHC (Canada Mortgage and Housing Corporation) or Statistics Canada data where appropriate. Focus on being accurate and helpful: ${query}`;
      
      const generationConfig = {
        temperature: 0.2,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 200,
      };
      
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig,
      });
      
      const response = result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API error:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      // If Gemini fails, offer to connect with a team member
      return "Sorry, I'm having trouble finding that information. Would you like to talk to a real person from our team?";
    }
  };

  // Handle sending messages
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userText = inputValue.trim();
    const userMessage = { text: userText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Check for "talk to real person" specifically
    if (userText.toLowerCase().includes("talk to real person")) {
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate typing delay
      setMessages(prev => [...prev, { 
        text: "Would you like to talk to a real person from our team?", 
        sender: 'bot',
        showButtons: true 
      }]);
      setIsTyping(false);
      return;
    }
    
    // Check for keyword match first
    const keywordResponse = checkKeywords(userText);
    
    if (keywordResponse) {
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate typing delay
      if (keywordResponse.includes("Would you like to talk to a real person")) {
        setMessages(prev => [...prev, { 
          text: keywordResponse, 
          sender: 'bot',
          showButtons: true 
        }]);
      } else {
        setMessages(prev => [...prev, { 
          text: keywordResponse, 
          sender: 'bot',
          isHTML: true // Flag for HTML content
        }]);
      }
    } else {
      // No keyword match, use Gemini API
      try {
        setIsTyping(true);
        const geminiResponse = await fetchGeminiResponse(userText);
        if (geminiResponse.includes("Would you like to talk to a real person")) {
          setMessages(prev => [...prev, { 
            text: geminiResponse, 
            sender: 'bot',
            showButtons: true 
          }]);
        } else {
          setMessages(prev => [...prev, { text: geminiResponse, sender: 'bot' }]);
        }
      } catch (error) {
        console.error("Error with Gemini response:", error);
        console.error("Error details:", JSON.stringify(error, null, 2));
        // If Gemini fails completely, fall back to a generic response
        setMessages(prev => [...prev, { 
          text: "Sorry, I'm having trouble understanding. Would you like to talk to a real person from our team?", 
          sender: 'bot',
          showButtons: true
        }]);
      }
    }
    
    setIsTyping(false);
  };

  // Handle quick replies
  const handleQuickReply = (text) => {
    setMessages(prev => [...prev, { text, sender: 'user' }]);
    
    if (text.toLowerCase() === "talk to real person") {
      setMessages(prev => [...prev, { 
        text: "Would you like to talk to a real person from our team?", 
        sender: 'bot',
        showButtons: true 
      }]);
      return;
    }
    
    if (text.toLowerCase() === 'yes') {
      setShowEmailForm(true);
    } else if (text.toLowerCase() === 'no') {
      setMessages(prev => [...prev, { text: "No problem! Let me know if you need anything else.", sender: 'bot' }]);
    } else {
      // For predefined questions, check keywords
      const keywordResponse = checkKeywords(text);
      if (keywordResponse) {
        if (keywordResponse.includes("Would you like to talk to a real person")) {
          setMessages(prev => [...prev, { 
            text: keywordResponse, 
            sender: 'bot',
            showButtons: true 
          }]);
        } else {
          setMessages(prev => [...prev, { 
            text: keywordResponse, 
            sender: 'bot',
            isHTML: true 
          }]);
        }
      }
    }
  };

  // Handle email form submission
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      await fetch("https://formspree.io/f/mkgrpjok", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });
      setMessages(prev => [...prev, { text: "Thanks! Your message has been sent to our team. We'll respond soon.", sender: 'bot' }]);
      setShowEmailForm(false);
    } catch (error) {
      setMessages(prev => [...prev, { text: "Failed to send your message. Please try again later.", sender: 'bot' }]);
    }
  };

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = "Hi there! I'm your Housing Assistant bot. Ask me anything about Canadian housing data from CMHC or Statistics Canada.";
      setMessages([{ text: greeting, sender: "bot", showContactOption: true }]);
    }
  }, [isOpen]);

  // Enhanced responsive styles
  const styles = {
    container: {
      position: 'fixed',
      bottom: isMobile ? '16px' : '24px',
      right: isMobile ? '16px' : '24px',
      zIndex: 50
    },
    toggleButton: {
      width: isMobile ? '48px' : '56px',
      height: isMobile ? '48px' : '56px',
      borderRadius: '50%',
      backgroundColor: '#2563eb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      border: 'none',
      outline: 'none'
    },
    toggleButtonHover: {
      backgroundColor: '#1d4ed8'
    },
    chatWindow: {
      position: 'fixed',
      bottom: isMobile ? '72px' : '80px',
      right: isMobile ? '16px' : '24px',
      width: isMobile ? 'calc(100% - 32px)' : '400px',
      height: isMobile ? '60vh' : '500px',
      maxHeight: isMobile ? 'none' : '70vh',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      border: '1px solid #e5e7eb'
    },
    header: {
      backgroundColor: '#2563eb',
      color: 'white',
      padding: isMobile ? '10px 12px' : '12px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: isMobile ? '14px' : '16px'
    },
    chatBody: {
      flex: 1,
      padding: isMobile ? '12px' : '16px',
      overflowY: 'auto',
      backgroundColor: '#f9fafb',
      maxHeight: 'calc(100% - 120px)'
    },
    suggestionContainer: {
      marginTop: isMobile ? '8px' : '12px',
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? '6px' : '8px'
    },
    suggestionTitle: {
      fontSize: isMobile ? '12px' : '14px',
      color: '#6b7280',
      marginBottom: '4px'
    },
    suggestionBubble: {
      backgroundColor: '#e0f2fe',
      color: '#0369a1',
      borderRadius: '18px',
      padding: isMobile ? '6px 12px' : '8px 16px',
      marginBottom: isMobile ? '6px' : '8px',
      display: 'inline-block',
      wordBreak: 'break-word',
      cursor: 'pointer',
      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
      fontSize: isMobile ? '12px' : '14px'
    },
    suggestionGrid: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: isMobile ? '6px' : '8px'
    },
    messageContainer: {
      marginBottom: isMobile ? '8px' : '12px'
    },
    userMessage: {
      display: 'inline-block',
      padding: isMobile ? '8px 12px' : '12px',
      backgroundColor: '#dbeafe',
      color: '#1e40af',
      borderRadius: '12px',
      maxWidth: '85%',
      wordBreak: 'break-word',
      marginLeft: 'auto',
      borderBottomRightRadius: '4px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
      fontSize: isMobile ? '14px' : '16px',
      lineHeight: '1.4'
    },
    botMessage: {
      display: 'inline-block',
      padding: isMobile ? '8px 12px' : '12px',
      backgroundColor: 'white',
      color: '#1f2937',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      maxWidth: '85%',
      wordBreak: 'break-word',
      borderBottomLeftRadius: '4px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
      fontSize: isMobile ? '14px' : '16px',
      lineHeight: '1.4'
    },
    inputContainer: {
      borderTop: '1px solid #e5e7eb',
      padding: isMobile ? '8px' : '12px',
      backgroundColor: 'white',
      position: 'sticky',
      bottom: 0
    },
    inputForm: {
      display: 'flex',
      gap: isMobile ? '6px' : '8px'
    },
    textInput: {
      flex: 1,
      padding: isMobile ? '8px 10px' : '10px 12px',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      outline: 'none',
      fontSize: isMobile ? '14px' : '16px',
      minHeight: isMobile ? '40px' : 'auto'
    },
    sendButton: {
      backgroundColor: '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: isMobile ? '0 12px' : '0 16px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: isMobile ? '40px' : 'auto'
    },
    emailForm: {
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? '6px' : '8px'
    },
    formInput: {
      padding: isMobile ? '8px 10px' : '10px 12px',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      fontSize: isMobile ? '14px' : '16px',
      outline: 'none'
    },
    formTextarea: {
      padding: isMobile ? '8px 10px' : '10px 12px',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      fontSize: isMobile ? '14px' : '16px',
      outline: 'none',
      minHeight: '80px',
      resize: 'vertical'
    },
    formButtons: {
      display: 'flex',
      gap: isMobile ? '6px' : '8px'
    },
    formButton: {
      flex: 1,
      padding: isMobile ? '8px' : '10px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontSize: isMobile ? '14px' : '16px'
    },
    cancelButton: {
      backgroundColor: '#e5e7eb',
      color: '#4b5563'
    },
    submitButton: {
      backgroundColor: '#2563eb',
      color: 'white'
    },
    typingIndicator: {
      display: 'inline-block',
      padding: isMobile ? '6px 10px' : '8px 12px',
      backgroundColor: 'white',
      color: '#6b7280',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      fontSize: isMobile ? '12px' : '14px'
    },
    replyButton: {
      backgroundColor: '#2563eb', 
      color: 'white', 
      border: 'none', 
      borderRadius: '6px', 
      padding: isMobile ? '4px 8px' : '4px 12px', 
      fontSize: isMobile ? '12px' : '14px',
      cursor: 'pointer'
    },
    cancelReplyButton: {
      backgroundColor: '#e5e7eb', 
      color: '#4b5563', 
      border: 'none', 
      borderRadius: '6px', 
      padding: isMobile ? '4px 8px' : '4px 12px', 
      fontSize: isMobile ? '12px' : '14px',
      cursor: 'pointer'
    }
  };

  // Safe HTML rendering
  const createMarkup = (html) => {
    return { __html: html };
  };

  return (
    <div style={styles.container}>
      <button 
        style={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.toggleButtonHover.backgroundColor}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = styles.toggleButton.backgroundColor}
      >
        {isOpen ? (
          <FaTimes style={{ color: 'white', fontSize: isMobile ? '18px' : '20px' }} />
        ) : (
          <FaComments style={{ color: 'white', fontSize: isMobile ? '18px' : '20px' }} />
        )}
      </button>

      {isOpen && (
        <div style={styles.chatWindow}>
          <div style={styles.header}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaComments style={{ fontSize: isMobile ? '16px' : '18px' }} />
              <span style={{ fontWeight: '600' }}>Housing Assistant</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
            >
              <FaTimes style={{ fontSize: isMobile ? '16px' : '18px' }} />
            </button>
          </div>

          <div style={styles.chatBody}>
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                style={{ 
                  ...styles.messageContainer, 
                  textAlign: msg.sender === 'user' ? 'right' : 'left',
                  marginLeft: msg.sender === 'user' ? 'auto' : '0',
                  marginRight: msg.sender === 'user' ? '0' : 'auto'
                }}
              >
                {msg.sender === 'user' ? (
                  <div style={styles.userMessage}>{msg.text}</div>
                ) : (
                  <div style={styles.botMessage}>
                    {msg.isHTML ? (
                      <div dangerouslySetInnerHTML={createMarkup(msg.text)} />
                    ) : (
                      msg.text
                    )}
                  </div>
                )}

                {/* Show contact option and quick questions after greeting */}
                {msg.showContactOption && (
                  <div style={styles.suggestionContainer}>
                    <div style={styles.suggestionTitle}>Suggested questions:</div>
                    <div style={styles.suggestionGrid}>
                      {quickQuestions.map((question, i) => (
                        <div 
                          key={i}
                          style={styles.suggestionBubble}
                          onClick={() => handleQuickReply(question)}
                        >
                          {question}
                        </div>
                      ))}
                      <div 
                        style={styles.suggestionBubble}
                        onClick={() => handleQuickReply("talk to real person")}
                      >
                        {contactOption}
                      </div>
                    </div>
                  </div>
                )}

                {/* Real person buttons */}
                {msg.showButtons && (
                  <div style={{ display: 'flex', gap: isMobile ? '6px' : '8px', marginTop: isMobile ? '6px' : '8px', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                    <button 
                      onClick={() => handleQuickReply("Yes")}
                      style={styles.replyButton}
                    >
                      Yes
                    </button>
                    <button 
                      onClick={() => handleQuickReply("No")}
                      style={styles.cancelReplyButton}
                    >
                      No
                    </button>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div style={{ textAlign: 'left', marginBottom: isMobile ? '8px' : '12px' }}>
                <div style={styles.typingIndicator}>
                  <FaSpinner style={{ animation: 'spin 1s linear infinite', marginRight: '8px' }} />
                  Typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={styles.inputContainer}>
            {showEmailForm ? (
              <form onSubmit={handleEmailSubmit} style={styles.emailForm}>
                <input 
                  name="name" 
                  type="text" 
                  placeholder="Your Name" 
                  required 
                  style={styles.formInput}
                />
                <input 
                  name="email" 
                  type="email" 
                  placeholder="Your Email" 
                  required 
                  style={styles.formInput}
                />
                <textarea 
                  name="message" 
                  placeholder="Your Question" 
                  required 
                  style={styles.formTextarea}
                />
                <div style={styles.formButtons}>
                  <button 
                    type="button" 
                    onClick={() => setShowEmailForm(false)}
                    style={{ ...styles.formButton, ...styles.cancelButton }}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    style={{ ...styles.formButton, ...styles.submitButton }}
                  >
                    Send
                  </button>
                </div>
              </form>
            ) : (
              <div style={styles.inputForm}>
                <input 
                  type="text" 
                  value={inputValue} 
                  onChange={(e) => setInputValue(e.target.value)} 
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about housing data..."
                  style={styles.textInput}
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  style={{ 
                    ...styles.sendButton,
                    opacity: inputValue.trim() ? 1 : 0.7,
                    cursor: inputValue.trim() ? 'pointer' : 'not-allowed'
                  }}
                >
                  <FaPaperPlane style={{ fontSize: isMobile ? '14px' : '16px' }} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        a {
          color: #2563eb;
          text-decoration: underline;
        }
        a:hover {
          text-decoration: none;
        }
      `}</style>
    </div>
  );
};

export default Chatbot;