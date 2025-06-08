
import React, { createContext, useContext, useState, ReactNode } from 'react';
import ChatBot from './ChatBot';

interface ChatBotContextType {
  isOpen: boolean;
  openChatBot: () => void;
  closeChatBot: () => void;
  toggleChatBot: () => void;
}

const ChatBotContext = createContext<ChatBotContextType | undefined>(undefined);

export const useChatBot = () => {
  const context = useContext(ChatBotContext);
  if (!context) {
    throw new Error('useChatBot must be used within a ChatBotProvider');
  }
  return context;
};

interface ChatBotProviderProps {
  children: ReactNode;
}

export const ChatBotProvider: React.FC<ChatBotProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const openChatBot = () => setIsOpen(true);
  const closeChatBot = () => setIsOpen(false);
  const toggleChatBot = () => setIsOpen(prev => !prev);
  
  return (
    <ChatBotContext.Provider value={{ isOpen, openChatBot, closeChatBot, toggleChatBot }}>
      {children}
      <ChatBot isOpen={isOpen} onClose={closeChatBot} />
    </ChatBotContext.Provider>
  );
};
