'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import styles from './ContactFormSection.module.scss';

const SUBJECTS = [
  'General Inquiry',
  'Reservation Assistance',
  'Corporate Accounts',
  'Feedback',
] as const;

const HQ_INFO = [
  {
    Icon: LocationOnOutlinedIcon,
    label: 'Address',
    value: '1100 Avenue of the Americas\nNew York, NY 10036, USA',
  },
  { Icon: PhoneOutlinedIcon, label: 'Phone', value: '+1 (212) 555-0198' },
  { Icon: MailOutlinedIcon, label: 'Email', value: 'concierge@luminastay.com' },
] as const;

type SubmitState = 'idle' | 'loading' | 'sent';

export default function ContactFormSection() {
  const [subject, setSubject] = useState<string>('General Inquiry');
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  function handleSubjectChange(e: SelectChangeEvent<string>) {
    setSubject(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitState('loading');
    setTimeout(() => {
      setSubmitState('sent');
      (e.target as HTMLFormElement).reset();
      setSubject('General Inquiry');
      setTimeout(() => setSubmitState('idle'), 3000);
    }, 1500);
  }

  return (
    <Box className={styles.root}>
      <Container maxWidth="lg">
        <Box className={styles.layout}>
          {/* Left: Form */}
          <Box className={styles.formCol}>
            <Box className={styles.formHeader}>
              <Typography className={styles.eyebrow}>Reach Out</Typography>
              <Typography variant="h2" className={styles.heading}>
                Send a Message
              </Typography>
              <Box className={styles.accent} aria-hidden />
            </Box>

            <Box component="form" onSubmit={handleSubmit} className={styles.form}>
              <Box className={styles.nameRow}>
                <TextField
                  label="Full Name"
                  placeholder="John Doe"
                  fullWidth
                  className={styles.field}
                  slotProps={{
                    inputLabel: { className: styles.label },
                    input: { className: styles.input },
                  }}
                />
                <TextField
                  label="Email Address"
                  type="email"
                  placeholder="john@example.com"
                  fullWidth
                  className={styles.field}
                  slotProps={{
                    inputLabel: { className: styles.label },
                    input: { className: styles.input },
                  }}
                />
              </Box>

              <FormControl fullWidth className={styles.field}>
                <InputLabel className={styles.label}>Subject</InputLabel>
                <Select
                  value={subject}
                  label="Subject"
                  onChange={handleSubjectChange}
                  className={styles.select}
                >
                  {SUBJECTS.map((s) => (
                    <MenuItem key={s} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Message"
                placeholder="How can we assist you today?"
                multiline
                rows={5}
                fullWidth
                className={styles.field}
                slotProps={{
                  inputLabel: { className: styles.label },
                  input: { className: styles.input },
                }}
              />

              <Button
                type="submit"
                disabled={submitState === 'loading' || submitState === 'sent'}
                className={`${styles.submitBtn}${submitState === 'sent' ? ` ${styles.submitBtnSent}` : ''}`}
                endIcon={submitState === 'sent' ? <CheckCircleOutlineIcon /> : <SendIcon />}
                disableElevation
              >
                {submitState === 'idle' && 'Send Inquiry'}
                {submitState === 'loading' && 'Sending…'}
                {submitState === 'sent' && 'Message Sent'}
              </Button>
            </Box>
          </Box>

          {/* Right: HQ info + map */}
          <Box className={styles.infoCol}>
            <Box className={styles.hqCard}>
              <Box className={styles.hqBlob} aria-hidden />
              <Typography className={styles.hqTitle}>Lumina Stay Global Headquarters</Typography>
              <Box className={styles.hqList}>
                {HQ_INFO.map(({ Icon, label, value }) => (
                  <Box key={label} className={styles.hqItem}>
                    <Box className={styles.hqIconWrap}>
                      <Icon className={styles.hqIcon} />
                    </Box>
                    <Box>
                      <Typography className={styles.hqLabel}>{label}</Typography>
                      <Typography className={styles.hqValue}>{value}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box className={styles.mapWrap}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                alt="New York City aerial view"
                className={styles.mapImg}
              />
              <Box className={styles.mapOverlay} aria-hidden />
              <Box className={styles.mapBadge}>
                <Box className={styles.mapDot} aria-hidden />
                Live Concierge Available
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
