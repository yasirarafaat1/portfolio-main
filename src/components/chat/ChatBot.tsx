import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, X, Send, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string | Date;
}

// Mock responses for development
const MOCK_RESPONSES = [
  "I'm a mock response. To get real responses, set VITE_MOCK_MODE=false in your .env file.",
  "This is a test response. The real API would provide more detailed answers.",
  "Mock response: I'm here to help! In production, I'd connect to the real AI service.",
  "Thanks for your message! This is a mock response for development.",
  "I'm currently in mock mode. Set VITE_MOCK_MODE=false to use the real AI service."
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('chatMessages');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        text: "Hi! I'm Yasir's AI assistant. I can help you learn more about his work, skills, and experience. What would you like to know?",
        isUser: false,
        timestamp: new Date().toISOString(),
      },
    ];
  });
  
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [retryAfter, setRetryAfter] = useState<number | null>(null);
  const retryTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastRequestTime = useRef<number>(0);
  const isMounted = useRef(true);

  // Check if we're in mock mode
  const isMockMode = import.meta.env.VITE_MOCK_MODE === 'true';
  const MOCK_DELAY = 500; // ms

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
      if (retryTimerRef.current) {
        clearTimeout(retryTimerRef.current);
      }
    };
  }, []);

  // Handle rate limiting
  useEffect(() => {
    if (isRateLimited && retryAfter) {
      retryTimerRef.current = setTimeout(() => {
        if (isMounted.current) {
          setIsRateLimited(false);
          setRetryAfter(null);
        }
      }, retryAfter * 1000);
      
      return () => {
        if (retryTimerRef.current) {
          clearTimeout(retryTimerRef.current);
        }
      };
    }
  }, [isRateLimited, retryAfter]);

  const generateMockResponse = useCallback(async (userMessage: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    
    // Return a random mock response
    return MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
  }, []);

  const sendMessage = useCallback(async () => {
    if (!inputMessage.trim() || isLoading || isRateLimited) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      let aiResponse: string;
      
      if (isMockMode) {
        // Use mock response
        aiResponse = await generateMockResponse(inputMessage);
      } else {
        // Real API call
        const now = Date.now();
        const timeSinceLastRequest = now - lastRequestTime.current;
        const minDelay = 1000; // 1 second minimum between requests
        
        // Enforce rate limiting
        if (timeSinceLastRequest < minDelay) {
          await new Promise(resolve => setTimeout(resolve, minDelay - timeSinceLastRequest));
        }
        
        lastRequestTime.current = Date.now();
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: 'You are a helpful AI assistant for Yasir, a software developer. You can answer questions about his skills, experience, and projects.'
              },
              ...messages
                .filter(m => !m.isUser)
                .map(m => ({
                  role: 'assistant' as const,
                  content: m.text
                })),
              {
                role: 'user',
                content: inputMessage
              }
            ],
            max_tokens: 300,
            temperature: 0.7
          })
        });

        if (response.status === 429) {
          const retryAfter = parseInt(response.headers.get('Retry-After') || '60', 10);
          setIsRateLimited(true);
          setRetryAfter(retryAfter);
          
          // Auto-retry after delay
          setTimeout(() => {
            if (isMounted.current) {
              setIsRateLimited(false);
              setRetryAfter(null);
            }
          }, retryAfter * 1000);
          
          throw new Error(`Rate limited. Please try again in ${retryAfter} seconds.`);
        }

        if (!response.ok) {
          throw new Error('Failed to get response from AI');
        }

        const data = await response.json();
        aiResponse = data.choices[0]?.message?.content || "I'm sorry, I couldn't process that request.";
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      let errorMessage = 'Failed to get response from AI. ';
      
      if (isRateLimited && retryAfter !== null) {
        errorMessage = `Rate limited. Please wait ${retryAfter} seconds before trying again.`;
        toast({
          title: 'Rate Limited',
          description: errorMessage,
          variant: 'destructive',
        });
      } else if (!isMockMode) {
        errorMessage += 'Please try again later.';
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });
        
        const errorMessageObj: Message = {
          id: (Date.now() + 1).toString(),
          text: "Sorry, I'm having trouble responding right now. Please try again later.",
          isUser: false,
          timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, errorMessageObj]);
      }
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  }, [inputMessage, isLoading, isRateLimited, isMockMode, messages, retryAfter, generateMockResponse]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const formatTime = (timestamp: string | Date) => {
    const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-primary text-primary-foreground rounded-full p-4 shadow-lg hover:bg-primary/90 transition-colors"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100%-2rem)] sm:w-full max-w-sm h-[70vh] max-h-[500px] sm:max-h-[600px] flex flex-col bg-background rounded-lg shadow-xl overflow-hidden z-50">
      <div className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
        <h3 className="font-semibold">
          {isMockMode ? 'AI Assistant (Mock Mode)' : 'AI Assistant'}
        </h3>
        <button
          onClick={toggleChat}
          className="text-primary-foreground hover:text-primary-foreground/80"
          aria-label="Close chat"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg px-4 py-2 break-words ${
                message.isUser
                  ? 'bg-primary text-primary-foreground rounded-br-none'
                  : 'bg-muted text-foreground rounded-bl-none'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className="text-xs opacity-70 mt-1 text-right">
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted text-foreground rounded-lg px-4 py-2 rounded-bl-none">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          </div>
        )}
        {isRateLimited && retryAfter !== null && (
          <div className="flex items-center justify-start mb-4">
            <div className="bg-destructive/10 text-destructive rounded-lg px-4 py-2 rounded-bl-none flex items-center space-x-2 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>Rate limited. Please try again in {retryAfter} seconds.</span>
            </div>
          </div>
        )}
      </div>

      <div className="border-t p-4">
        <div className="flex items-end gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              isMockMode 
                ? 'Mock mode enabled - type a message...' 
                : 'Type your message...'
            }
            className="flex-1"
            disabled={isLoading || isRateLimited}
          />
          <Button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading || isRateLimited}
            size="icon"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
        {isMockMode && (
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Running in mock mode. Set VITE_MOCK_MODE=false in .env to use the real AI.
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
