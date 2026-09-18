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
import { useTranslation } from 'react-i18next';

interface Message {
  id: string;
  role: 'bot' | 'user';
  text: string;
  time: string;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export default function ConciergeChat() {
  const { t } = useTranslation('concierge');
  const actions = [
    ['cancelBooking', t('actions.cancelBooking')],
    ['lateCheckout', t('actions.lateCheckout')],
    ['billing', t('actions.billing')],
    ['roomService', t('actions.roomService')],
  ] as const;
  const responses = {
    [t('actions.cancelBooking')]: t('responses.cancelBooking'),
    [t('actions.lateCheckout')]: t('responses.lateCheckout'),
    [t('actions.billing')]: t('responses.billing'),
    [t('actions.roomService')]: t('responses.roomService'),
  };
  const initialMessage: Message = { id: '1', role: 'bot', text: t('initialMessage'), time: '' };
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [sessionLabel] = useState(() => t('sessionToday', { time: formatTime(new Date()) }));

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
        text: responses[trimmed] ?? t('defaultResponse'),
        time: formatTime(new Date()),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsBotTyping(false);
    }, 1200);
  };

  const handleReset = () => {
    idCounterRef.current = 2;
    setMessages([initialMessage]);
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
          <Box className={styles.container} role="region" aria-label={t('botName')}>
            {/* Header */}
            <Box className={styles.header}>
              <Box className={styles.avatar} aria-hidden="true">
                <SmartToyIcon className={styles.avatarIcon} />
              </Box>
              <Box className={styles.headerCenter}>
                <Typography className={styles.botName}>{t('botName')}</Typography>
                <Box className={styles.onlineRow}>
                  <Box className={styles.onlineDot} aria-hidden="true" />
                  <Typography className={styles.onlineLabel}>{t('online')}</Typography>
                </Box>
              </Box>
              <Tooltip title={t('newConversation')} placement="left">
                <IconButton
                  className={styles.resetBtn}
                  size="small"
                  onClick={handleReset}
                  aria-label={t('startNewConversation')}
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
              aria-label={t('conversationMessages')}
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
                    <Typography className={styles.deliveredText}>{t('delivered')}</Typography>
                      {msg.time && (
                        <Typography className={styles.bubbleTimeUser}>{msg.time}</Typography>
                      )}
                    </Box>
                  </Box>
                ),
              )}

              {!hasUserSentMessage && !isBotTyping && (
                <Box className={styles.quickActions} role="group" aria-label={t('quickActions')}>
                  {actions.map(([, action], i) => (
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
                <Box className={styles.botBubbleWrap} aria-label={t('typing')}>
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
                  placeholder={t('messagePlaceholder')}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    inputRef={inputRef}
                    inputProps={{ 'aria-label': t('chatMessage') }}
                  />
                  <IconButton
                    className={`${styles.sendBtn}${input.trim() && !isBotTyping ? ` ${styles.sendBtnActive}` : ''}`}
                    size="small"
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim() || isBotTyping}
                    aria-label={t('sendMessage')}
                  >
                    <ArrowUpwardIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
              <Typography className={styles.poweredBy}>{t('poweredBy')}</Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
