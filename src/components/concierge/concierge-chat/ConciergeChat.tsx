'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Chip,
  InputBase,
  Container,
  Tooltip,
} from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import styles from './ConciergeChat.module.scss';

interface Message {
  id: string;
  role: 'bot' | 'user';
  text: string;
  time: string;
}

const QUICK_ACTIONS = [
  'Cancel Booking',
  'Request Late Check-out',
  'Billing Inquiry',
  'Room Service',
];

const BOT_RESPONSES: Record<string, string> = {
  'Cancel Booking':
    "I can help you cancel your booking. Please share your booking reference number and I'll process the cancellation right away.",
  'Request Late Check-out':
    "Late check-out is subject to availability. Please share your booking ID and I'll check what options are available for your stay.",
  'Billing Inquiry':
    "Happy to help with your billing inquiry. Could you share your booking ID or describe the specific charge you're asking about?",
  'Room Service':
    'Room service is available 24/7 at all Lumina Stay properties. What would you like to order or request?',
};

const DEFAULT_BOT_RESPONSE =
  "Thank you for your message. Let me look into that for you — I'll have an answer shortly.";

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

const INITIAL_MESSAGE: Message = {
  id: '1',
  role: 'bot',
  text: 'Sawadee ka! Welcome to Lumina Stay Support. How can I assist you with your booking today?',
  time: '',
};

export default function ConciergeChat() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [sessionLabel] = useState(() => `Today, ${formatTime(new Date())}`);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idCounterRef = useRef(2);

  useEffect(() => {
    const el = messagesContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isBotTyping]);

  const hasUserSentMessage = messages.some((m) => m.role === 'user');

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isBotTyping) return;

    const now = new Date();
    const userMsg: Message = {
      id: String(idCounterRef.current++),
      role: 'user',
      text: trimmed,
      time: formatTime(now),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsBotTyping(true);

    setTimeout(() => {
      const botMsg: Message = {
        id: String(idCounterRef.current++),
        role: 'bot',
        text: BOT_RESPONSES[trimmed] ?? DEFAULT_BOT_RESPONSE,
        time: formatTime(new Date()),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsBotTyping(false);
    }, 1200);
  };

  const handleReset = () => {
    idCounterRef.current = 2;
    setMessages([INITIAL_MESSAGE]);
    setInput('');
    setIsBotTyping(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <Box className={styles.section}>
      <Container maxWidth="lg">
        <Box className={styles.wrapper}>
          <Box className={styles.container} role="region" aria-label="Lumina Concierge chat">
            {/* Header */}
            <Box className={styles.header}>
              <Box className={styles.avatar} aria-hidden="true">
                <SmartToyIcon className={styles.avatarIcon} />
              </Box>
              <Box className={styles.headerCenter}>
                <Typography className={styles.botName}>Lumina Concierge</Typography>
                <Box className={styles.onlineRow}>
                  <Box className={styles.onlineDot} aria-hidden="true" />
                  <Typography className={styles.onlineLabel}>Online</Typography>
                </Box>
              </Box>
              <Tooltip title="New conversation" placement="left">
                <IconButton
                  className={styles.resetBtn}
                  size="small"
                  onClick={handleReset}
                  aria-label="Start new conversation"
                >
                  <RefreshIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>

            {/* Messages */}
            <Box
              className={styles.messages}
              ref={messagesContainerRef}
              role="log"
              aria-live="polite"
              aria-label="Conversation messages"
            >
              <Box className={styles.timestampRow}>
                <Chip
                  label={sessionLabel}
                  className={styles.timestampChip}
                  size="small"
                />
              </Box>

              {messages.map((msg) =>
                msg.role === 'bot' ? (
                  <Box key={msg.id} className={styles.botBubbleWrap}>
                    <Box className={styles.botBubble}>
                      <Typography className={styles.botText}>{msg.text}</Typography>
                    </Box>
                    {msg.time && (
                      <Typography className={styles.bubbleTime}>{msg.time}</Typography>
                    )}
                  </Box>
                ) : (
                  <Box key={msg.id} className={styles.userBubbleWrap}>
                    <Box className={styles.userBubble}>
                      <Typography className={styles.userText}>{msg.text}</Typography>
                    </Box>
                    <Box className={styles.userMeta}>
                      <Typography className={styles.deliveredText}>Delivered</Typography>
                      {msg.time && (
                        <Typography className={styles.bubbleTimeUser}>{msg.time}</Typography>
                      )}
                    </Box>
                  </Box>
                ),
              )}

              {!hasUserSentMessage && !isBotTyping && (
                <Box className={styles.quickActions} role="group" aria-label="Quick actions">
                  {QUICK_ACTIONS.map((action, i) => (
                    <Chip
                      key={action}
                      label={action}
                      variant="outlined"
                      className={styles.quickChip}
                      onClick={() => sendMessage(action)}
                      style={{ animationDelay: `${i * 60}ms` }}
                    />
                  ))}
                </Box>
              )}

              {isBotTyping && (
                <Box className={styles.botBubbleWrap} aria-label="Lumina Concierge is typing">
                  <Box className={styles.typingBubble} aria-hidden="true">
                    <span className={styles.typingDot} />
                    <span className={styles.typingDot} />
                    <span className={styles.typingDot} />
                  </Box>
                </Box>
              )}
            </Box>

            {/* Input */}
            <Box className={styles.inputArea}>
              <Box className={styles.inputRow}>
                <IconButton className={styles.addBtn} size="small" aria-label="Attach file">
                  <AddCircleIcon />
                </IconButton>
                <Box className={styles.inputWrapper}>
                  <InputBase
                    className={styles.inputBase}
                    placeholder="Message Lumina Concierge…"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    inputRef={inputRef}
                    inputProps={{ 'aria-label': 'Chat message' }}
                  />
                  <IconButton
                    className={`${styles.sendBtn}${input.trim() && !isBotTyping ? ` ${styles.sendBtnActive}` : ''}`}
                    size="small"
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim() || isBotTyping}
                    aria-label="Send message"
                  >
                    <ArrowUpwardIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
              <Typography className={styles.poweredBy}>Powered by Lumina AI</Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
