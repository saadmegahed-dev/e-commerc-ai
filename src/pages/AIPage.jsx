import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  IconButton,
  Paper,
  Avatar,
} from '@mui/material';
import { SendIcon, AutoAwesomeIcon, DeleteOutlineIcon } from '../icons';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../components/common/AnimatedSection';
import { useAI } from '../hooks/useAI';

const MessageBubble = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          mb: 3,
          flexDirection: isUser ? 'row-reverse' : 'row',
        }}
      >
        <Avatar
          sx={{
            width: 36,
            height: 36,
            bgcolor: isUser ? 'secondary.main' : 'primary.main',
            color: isUser ? 'text.primary' : 'primary.contrastText',
            fontSize: '0.8rem',
          }}
        >
          {isUser ? 'You' : <AutoAwesomeIcon sx={{ fontSize: 18 }} />}
        </Avatar>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            maxWidth: '75%',
            bgcolor: isUser ? 'secondary.main' : 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
            {message.content}
          </Typography>
        </Paper>
      </Box>
    </motion.div>
  );
};

export default function AIPage() {
  const { messages, isTyping, send, clear } = useAI();
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    send(input.trim());
    setInput('');
  };

  const suggestions = [
    'Recommend a gift under $500',
    'Tell me about your watches',
    'What jewelry do you have?',
  ];

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, minHeight: '70vh' }}>
      <Container maxWidth="md">
        <AnimatedSection sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Personal Shopping
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.4rem' }, mb: 1 }}>
            AI Concierge
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Your personal guide to the AETHER collection
          </Typography>
        </AnimatedSection>

        <Paper
          elevation={0}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            flexDirection: 'column',
            height: { xs: '60vh', md: '65vh' },
          }}
        >
          <Box
            sx={{
              p: 2,
              borderBottom: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AutoAwesomeIcon sx={{ color: 'primary.main', fontSize: 20 }} />
              <Typography variant="button">AETHER Concierge</Typography>
            </Box>
            <IconButton size="small" onClick={clear} title="Clear chat">
              <DeleteOutlineIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>

          <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
            <AnimatePresence>
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
            </AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Typography variant="body2" color="text.secondary" sx={{ pl: 7 }}>
                  Concierge is typing...
                </Typography>
              </motion.div>
            )}
            <div ref={chatEndRef} />
          </Box>

          {messages.length <= 1 && (
            <Box sx={{ px: 3, pb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {suggestions.map((s) => (
                <Typography
                  key={s}
                  component="button"
                  onClick={() => send(s)}
                  variant="caption"
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    px: 2,
                    py: 0.75,
                    cursor: 'pointer',
                    bgcolor: 'transparent',
                    color: 'text.secondary',
                    transition: 'all 0.3s',
                    '&:hover': { borderColor: 'primary.main', color: 'primary.main' },
                  }}
                >
                  {s}
                </Typography>
              ))}
            </Box>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              p: 2,
              borderTop: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              gap: 1,
            }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Ask about products, gifts, or recommendations..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isTyping}
            />
            <IconButton
              type="submit"
              disabled={!input.trim() || isTyping}
              sx={{
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                borderRadius: 0,
                '&:hover': { bgcolor: 'primary.light' },
                '&.Mui-disabled': { bgcolor: 'secondary.main' },
              }}
            >
              <SendIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
