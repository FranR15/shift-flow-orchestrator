
import React, { useState } from 'react';
import { Bot, User, SendHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  type: 'user' | 'bot';
  timestamp: Date;
}

interface Suggestion {
  id: string;
  employeeName: string;
  score: number;
  distance: string;
  restHours: number;
  category: string;
}

export const BotInterface: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I can help you find replacement workers and manage shifts. How can I assist you today?',
      type: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      type: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    
    // Check if the message is a replacement request
    const isReplacementRequest = inputValue.toLowerCase().includes('replacement') || 
                                 inputValue.toLowerCase().includes('replace') ||
                                 inputValue.toLowerCase().includes('substitute');
    
    setTimeout(() => {
      if (isReplacementRequest) {
        // Generate suggestion response
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: 'Based on your request, I found these potential replacements:',
          type: 'bot',
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, botMessage]);
        
        // Generate dummy suggestions
        const dummySuggestions: Suggestion[] = [
          {
            id: 's1',
            employeeName: 'Ana Garcia',
            score: 95,
            distance: '3.2 km',
            restHours: 12,
            category: 'Operations',
          },
          {
            id: 's2',
            employeeName: 'Roberto Alvarez',
            score: 85,
            distance: '5.7 km',
            restHours: 15,
            category: 'Operations',
          },
          {
            id: 's3',
            employeeName: 'Lucia Mendez',
            score: 75,
            distance: '2.1 km',
            restHours: 10,
            category: 'Operations',
          }
        ];
        
        setSuggestions(dummySuggestions);
        setShowSuggestions(true);
      } else {
        // Standard response
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: 'I understand you need assistance with scheduling. Could you provide more details or specify if you need a replacement for a specific shift?',
          type: 'bot',
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, botMessage]);
      }
    }, 1000);
    
    setInputValue('');
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const handleSelectSuggestion = (suggestion: Suggestion) => {
    const botMessage: Message = {
      id: Date.now().toString(),
      content: `I've selected ${suggestion.employeeName} as a replacement. Would you like me to notify them now?`,
      type: 'bot',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, botMessage]);
    setShowSuggestions(false);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle>ShiftMaster Assistant</CardTitle>
          <CardDescription>
            Ask for help with shift management, finding replacements, and scheduling.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3 max-w-[80%]",
                message.type === 'user' ? "ml-auto" : "mr-auto"
              )}
            >
              {message.type === 'bot' && (
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
                  <Bot size={20} className="text-brand-700" />
                </div>
              )}
              
              <div
                className={cn(
                  "rounded-lg px-4 py-2 text-sm",
                  message.type === 'user' ? "bg-brand-600 text-white" : "bg-gray-100 text-gray-800"
                )}
              >
                <div>{message.content}</div>
                <div className={cn(
                  "text-xs mt-1",
                  message.type === 'user' ? "text-brand-200" : "text-gray-500"
                )}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
              
              {message.type === 'user' && (
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
                  <User size={20} className="text-brand-700" />
                </div>
              )}
            </div>
          ))}
          
          {showSuggestions && (
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">
                Suggested Replacements:
              </div>
              
              <div className="space-y-2">
                {suggestions.map((suggestion) => (
                  <div 
                    key={suggestion.id}
                    className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleSelectSuggestion(suggestion)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">{suggestion.employeeName}</div>
                      <div className="text-xs px-2 py-1 bg-brand-100 text-brand-800 rounded-full">
                        Match Score: {suggestion.score}%
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <span>Distance:</span>
                        <span className="font-medium">{suggestion.distance}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>Rest Hours:</span>
                        <span className="font-medium">{suggestion.restHours}h</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>Category:</span>
                        <span className="font-medium">{suggestion.category}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="p-4 border-t">
          <div className="relative w-full flex items-center">
            <Input
              placeholder="Type your message..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="pr-12"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-1" 
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
            >
              <SendHorizontal size={18} />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
