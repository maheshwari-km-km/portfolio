import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Minimize, Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

const GEMINI_API_KEY = "AIzaSyAZnoSfDXCB2lDPd7Fu03bg9QYPvbvRn-M";

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '🚧 Coming Soon! 🚧\n\nI\'m still learning to be the best assistant for Maheshwari. Check back later! 😊',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [messageInput, setMessageInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current;
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [messages]);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!messageInput.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageInput,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessageInput('');
    setIsTyping(true);
    
    try {
      // Use Gemini API for more intelligent responses
      const response = await fetchGeminiResponse(messageInput);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error with Gemini API:', error);
      
      // Fallback to simple responses
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble connecting to my knowledge base. Please try again later.",
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      toast({
        title: "Connection Error",
        description: "Could not connect to the assistant. Using fallback responses.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };
  
  const fetchGeminiResponse = async (userInput: string): Promise<string> => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `You are Maheshwari's portfolio assistant. Respond to this message as if you're Maheshwari's personal AI assistant for a portfolio website. Keep responses concise (under 100 words). User message: ${userInput}
                  
                  Context about Maheshwari: 
                  - Junior Software Engineer
                  - Full-stack engineer focused on delivering efficient, maintainable code
                  - Contact: maheshwari.km.km@gmail.com, +91-8870800928
                  - LinkedIn: https://linkedin.com/in/maheshwari-km`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 200,
          }
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch response from Gemini API');
      }
      
      const data = await response.json();
      return data.candidates[0].content.parts[0].text || "I couldn't generate a response at this time.";
    } catch (error) {
      console.error('Error with Gemini API:', error);
      return generateFallbackResponse(userInput);
    }
  };
  
  const generateFallbackResponse = (userInput: string): string => {
    // Simple bot response logic based on user input
    const input = userInput.toLowerCase();
    
    if (input.includes('hi') || input.includes('hello') || input.includes('hey')) {
      return 'Hello! How can I help you learn more about Maheshwari?';
    }
    
    if (input.includes('experience') || input.includes('work')) {
      return 'Maheshwari is a Junior Software Engineer with a focus on full-stack development. She specializes in delivering efficient, maintainable code and seamless user experiences.';
    }
    
    if (input.includes('contact') || input.includes('email') || input.includes('reach')) {
      return 'You can contact Maheshwari via email at maheshwari.km.km@gmail.com or phone at +91-8870800928. You can also connect with her on LinkedIn: https://linkedin.com/in/maheshwari-km';
    }
    
    if (input.includes('resume') || input.includes('cv')) {
      return 'Maheshwari\'s resume is coming soon! Stay tuned for updates.';
    }
    
    return 'I understand you\'re interested in Maheshwari\'s portfolio. Could you please be more specific about what you\'d like to know? I can tell you about her experience, skills, projects, or how to contact her.';
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm">
      <Card className="shadow-xl border-portfolio-purple/20 animate-scale-in">
        <CardHeader className="bg-portfolio-purple text-white p-4 flex flex-row items-center justify-between">
          <h3 className="font-medium">Chat with Maheshwari's Assistant</h3>
          <div className="flex items-center space-x-2">
            {isMinimized ? (
              <Button variant="ghost" size="icon" onClick={() => setIsMinimized(false)} className="h-7 w-7 text-white hover:text-white hover:bg-portfolio-purple/80 transition-transform duration-300 hover:scale-110">
                <Maximize size={16} />
              </Button>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setIsMinimized(true)} className="h-7 w-7 text-white hover:text-white hover:bg-portfolio-purple/80 transition-transform duration-300 hover:scale-110">
                <Minimize size={16} />
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={onClose} className="h-7 w-7 text-white hover:text-white hover:bg-portfolio-purple/80 transition-transform duration-300 hover:scale-110">
              <X size={16} />
            </Button>
          </div>
        </CardHeader>
        
        {!isMinimized && (
          <>
            <CardContent className="p-0">
              <ScrollArea className="h-80 p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === 'user' 
                            ? 'bg-portfolio-purple text-white' 
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p>{message.text}</p>
                        <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start animate-fade-in">
                      <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 text-gray-800">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-portfolio-purple/60 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                          <div className="w-2 h-2 bg-portfolio-purple/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-portfolio-purple/60 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
            
            <CardFooter className="p-3 border-t">
              <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                <Input 
                  placeholder="Type your message..." 
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  className="bg-portfolio-purple hover:bg-portfolio-purple/90 transition-transform duration-300 hover:scale-110"
                  disabled={isTyping || !messageInput.trim()}
                >
                  <Send size={16} />
                </Button>
              </form>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
};

export default ChatBot;
