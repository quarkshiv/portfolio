'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { aiResponses } from '@/lib/data';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const quickQuestions = [
  'Who is Shivansh?',
  'Show projects',
  'Achievements',
  'Coding profiles',
  'Skills',
  'Contact',
];

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, value] of Object.entries(aiResponses)) {
    if (key === 'default') continue;
    const keywords = key.split(' ');
    if (keywords.some(k => lower.includes(k))) {
      return value;
    }
  }
  return aiResponses['default'];
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, text: 'Hello! I\'m Shivansh\'s AI assistant. Ask me anything about him!', isBot: true },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  let counter = useRef(1);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: counter.current++, text, isBot: false };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(text);
      const botMsg: Message = { id: counter.current++, text: response, isBot: true };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  return (
    <>
      {/* Floating trigger */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, #00d4ff, #8b5cf6)',
          boxShadow: '0 0 30px rgba(0, 212, 255, 0.4), 0 0 60px rgba(0, 212, 255, 0.1)',
        }}
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-24 right-6 z-40 w-[380px] max-w-[calc(100vw-3rem)] rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(10, 10, 30, 0.95)',
              border: '1px solid rgba(0, 212, 255, 0.2)',
              boxShadow: '0 0 60px rgba(0, 212, 255, 0.1), 0 20px 40px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Header */}
            <div className="p-4 border-b border-[rgba(0,212,255,0.1)] flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#8b5cf6] flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#f0f0ff]">Portfolio AI</div>
                <div className="text-xs text-[#06ffa5] flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#06ffa5] animate-pulse" />
                  Online
                </div>
              </div>
              {/* Scan line effect */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-50" />
            </div>

            {/* Messages */}
            <div className="h-[350px] overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.isBot ? '' : 'flex-row-reverse'}`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.isBot ? 'bg-gradient-to-br from-[#00d4ff] to-[#8b5cf6]' : 'bg-[rgba(255,255,255,0.1)]'
                  }`}>
                    {msg.isBot ? <Bot className="w-3 h-3 text-white" /> : <User className="w-3 h-3 text-[#8899aa]" />}
                  </div>
                  <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                    msg.isBot
                      ? 'bg-[rgba(0,212,255,0.05)] border border-[rgba(0,212,255,0.1)] text-[#c0c0c0]'
                      : 'bg-gradient-to-r from-[#00d4ff20] to-[#8b5cf620] border border-[rgba(139,92,246,0.2)] text-[#f0f0ff]'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#8b5cf6] flex items-center justify-center">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-[rgba(0,212,255,0.05)] border border-[rgba(0,212,255,0.1)]">
                    <div className="flex gap-1">
                      {[0, 1, 2].map(i => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                          className="w-2 h-2 rounded-full bg-[#00d4ff]"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick questions */}
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="px-3 py-1 text-xs font-mono rounded-full border border-[rgba(0,212,255,0.15)] text-[#8899aa] hover:text-[#00d4ff] hover:border-[rgba(0,212,255,0.3)] transition-colors cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[rgba(0,212,255,0.1)] flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                placeholder="Ask about Shivansh..."
                className="flex-1 bg-[rgba(255,255,255,0.03)] border border-[rgba(0,212,255,0.1)] rounded-xl px-4 py-2.5 text-sm text-[#f0f0ff] placeholder-[#667788] focus:outline-none focus:border-[rgba(0,212,255,0.3)] transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => sendMessage(input)}
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6] flex items-center justify-center cursor-pointer"
              >
                <Send className="w-4 h-4 text-white" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
