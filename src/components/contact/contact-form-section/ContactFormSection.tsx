'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
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
} from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import { useTranslation } from 'react-i18next';
import styles from './ContactFormSection.module.scss';

const SUBJECTS = [
  'General Inquiry',
  'Reservation Assistance',
  'Corporate Accounts',
  'Feedback',
] as const;

const HQ_INFO = [
  { Icon: LocationOnOutlinedIcon, labelKey: 'form.address', valueKey: 'form.addressValue' },
  { Icon: PhoneOutlinedIcon, labelKey: 'form.phone', value: '+1 (212) 555-0198' },
  { Icon: MailOutlinedIcon, labelKey: 'form.mail', value: 'concierge@luminastay.com' },
] as const;

type SubmitState = 'idle' | 'loading' | 'sent';

interface ContactFormValues {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactFormSection() {
  const { t } = useTranslation(['contact', 'common']);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  const { control, handleSubmit, reset } = useForm<ContactFormValues>({
    defaultValues: { fullName: '', email: '', subject: 'General Inquiry', message: '' },
  });

  const onSubmit = () => {
    setSubmitState('loading');
    setTimeout(() => {
      setSubmitState('sent');
      reset();
      setTimeout(() => setSubmitState('idle'), 3000);
    }, 1500);
  };

  return (
    <Box className={styles.root}>
      <Container maxWidth="lg">
        <Box className={styles.layout}>
          {/* Left: Form */}
          <Box className={styles.formCol}>
            <Box className={styles.formHeader}>
              <Typography className={styles.eyebrow}>{t('form.eyebrow')}</Typography>
              <Typography variant="h2" className={styles.heading}>
                {t('form.heading')}
              </Typography>
              <Box className={styles.accent} aria-hidden />
            </Box>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
              <Box className={styles.nameRow}>
                <Controller
                  name="fullName"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={t('form.fullName')}
                      placeholder={t('form.fullNamePlaceholder')}
                      fullWidth
                      className={styles.field}
                      slotProps={{
                        inputLabel: { className: styles.label },
                        input: { className: styles.input },
                      }}
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={t('form.email')}
                      type="email"
                      placeholder={t('form.emailPlaceholder')}
                      fullWidth
                      className={styles.field}
                      slotProps={{
                        inputLabel: { className: styles.label },
                        input: { className: styles.input },
                      }}
                    />
                  )}
                />
              </Box>

              <FormControl fullWidth className={styles.field}>
                <InputLabel className={styles.label}>{t('form.subject')}</InputLabel>
                <Controller
                  name="subject"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label={t('form.subject')} className={styles.select}>
                      {SUBJECTS.map((s) => (
                        <MenuItem key={s} value={s}>
                          {t(`form.subjects.${s}`)}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>

              <Controller
                name="message"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('form.message')}
                    placeholder={t('form.messagePlaceholder')}
                    multiline
                    rows={5}
                    fullWidth
                    className={styles.field}
                    slotProps={{
                      inputLabel: { className: styles.label },
                      input: { className: styles.input },
                    }}
                  />
                )}
              />

              <Button
                type="submit"
                disabled={submitState === 'loading' || submitState === 'sent'}
                className={`${styles.submitBtn}${submitState === 'sent' ? ` ${styles.submitBtnSent}` : ''}`}
                endIcon={submitState === 'sent' ? <CheckCircleOutlineIcon /> : <SendIcon />}
                disableElevation
              >
                {submitState === 'idle' && t('form.sendInquiry')}
                {submitState === 'loading' && t('form.sending')}
                {submitState === 'sent' && t('form.messageSent')}
              </Button>
            </Box>
          </Box>

          {/* Right: HQ info + map */}
          <Box className={styles.infoCol}>
            <Box className={styles.hqCard}>
              <Box className={styles.hqBlob} aria-hidden />
              <Typography className={styles.hqTitle}>{t('form.hqTitle')}</Typography>
              <Box className={styles.hqList}>
                {HQ_INFO.map(({ Icon, labelKey, ...rest }) => (
                  <Box key={labelKey} className={styles.hqItem}>
                    <Box className={styles.hqIconWrap}>
                      <Icon className={styles.hqIcon} />
                    </Box>
                    <Box>
                      <Typography className={styles.hqLabel}>{t(labelKey)}</Typography>
                      <Typography className={styles.hqValue}>
                        {'valueKey' in rest ? t(rest.valueKey) : rest.value}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box className={styles.mapWrap}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                alt={t('common:imageAlt.newYork')}
                className={styles.mapImg}
              />
              <Box className={styles.mapOverlay} aria-hidden />
              <Box className={styles.mapBadge}>
                <Box className={styles.mapDot} aria-hidden />
                {t('form.liveConcierge')}
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
