import { createSlice } from '@reduxjs/toolkit';

const aiResponses = {
  greeting: [
    'Welcome to AETHER. I can help you discover our curated collection, suggest gifts, or answer questions about any piece.',
    'Good evening. How may I assist you in finding something exceptional today?',
  ],
  watches: [
    'Our timepieces combine Swiss precision with contemporary design. The Obsidian Chronograph is our bestseller — titanium case, automatic movement. The Celestial Automatic features a rare meteorite dial, limited to 50 pieces.',
    'For everyday elegance, I recommend the Obsidian Chronograph. For collectors, the Celestial Automatic with moonphase is extraordinary.',
  ],
  jewelry: [
    'Our jewelry collection features 18K gold and platinum pieces. The Aurum Signet Ring makes a powerful statement, while the Luna Pendant offers delicate sophistication.',
  ],
  gift: [
    'For a memorable gift under $500, consider Midnight Essence or Velvet Noir fragrances. For something truly exceptional, the Aurum Signet Ring or Obsidian Chronograph never disappoint.',
    'Tell me about the recipient — their style, the occasion — and I will suggest the perfect AETHER piece.',
  ],
  default: [
    'That is a wonderful question. Our collection spans timepieces, jewelry, accessories, and fragrance — each piece selected for exceptional quality and timeless design.',
    'I would be happy to help you explore further. You can browse our Shop, or tell me what you are looking for.',
  ],
};

const getAIResponse = (message) => {
  const lower = message.toLowerCase();
  if (/hello|hi|hey|welcome/.test(lower)) {
    return aiResponses.greeting[Math.floor(Math.random() * aiResponses.greeting.length)];
  }
  if (/watch|timepiece|chronograph/.test(lower)) {
    return aiResponses.watches[Math.floor(Math.random() * aiResponses.watches.length)];
  }
  if (/jewel|ring|pendant|gold/.test(lower)) {
    return aiResponses.jewelry[0];
  }
  if (/gift|present|recommend|suggest/.test(lower)) {
    return aiResponses.gift[Math.floor(Math.random() * aiResponses.gift.length)];
  }
  return aiResponses.default[Math.floor(Math.random() * aiResponses.default.length)];
};

const aiSlice = createSlice({
  name: 'ai',
  initialState: {
    messages: [
      {
        id: 'welcome',
        role: 'assistant',
        content:
          'Welcome to AETHER Concierge. I am here to help you discover exceptional pieces from our collection. How may I assist you?',
        timestamp: Date.now(),
      },
    ],
    isTyping: false,
  },
  reducers: {
    sendMessage: (state, action) => {
      const userMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: action.payload,
        timestamp: Date.now(),
      };
      state.messages.push(userMessage);
      state.isTyping = true;
    },
    receiveResponse: (state, action) => {
      const response = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: action.payload || getAIResponse(
          state.messages[state.messages.length - 1]?.content || ''
        ),
        timestamp: Date.now(),
      };
      state.messages.push(response);
      state.isTyping = false;
    },
    setTyping: (state, action) => {
      state.isTyping = action.payload;
    },
    clearChat: (state) => {
      state.messages = [
        {
          id: 'welcome',
          role: 'assistant',
          content:
            'Welcome to AETHER Concierge. I am here to help you discover exceptional pieces from our collection. How may I assist you?',
          timestamp: Date.now(),
        },
      ];
      state.isTyping = false;
    },
  },
});

export const { sendMessage, receiveResponse, setTyping, clearChat } =
  aiSlice.actions;

export const selectAIMessages = (state) => state.ai.messages;
export const selectAIIsTyping = (state) => state.ai.isTyping;

export default aiSlice.reducer;
