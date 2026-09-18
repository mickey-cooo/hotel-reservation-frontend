'use client';

import { Box, Container, Typography } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PhoneIcon from '@mui/icons-material/Phone';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import styles from './ConciergeOptions.module.scss';
import { useTranslation } from 'react-i18next';

const OPTIONS = [
  {
    Icon: MenuBookIcon,
    title: 'knowledgeTitle',
    desc: 'knowledgeDesc',
    label: 'knowledgeLabel',
  },
  {
    Icon: PhoneIcon,
    title: 'speakTitle',
    desc: 'speakDesc',
    label: 'speakLabel',
  },
  {
    Icon: VerifiedUserIcon,
    title: 'premiumTitle',
    desc: 'premiumDesc',
    label: 'premiumLabel',
  },
];

export default function ConciergeOptions() {
  const { t } = useTranslation('concierge');
  return (
    <Box className={styles.section}>
      <Container maxWidth="lg">
        <Box className={styles.grid} role="list">
          {OPTIONS.map(({ Icon, title, desc, label }) => (
            <Box
              key={title}
              className={styles.card}
              role="listitem"
              tabIndex={0}
              aria-label={t(`options.${label}`)}
            >
              <Box className={styles.iconWrap} aria-hidden="true">
                <Icon className={styles.icon} />
              </Box>
              <Typography className={styles.title}>{t(`options.${title}`)}</Typography>
              <Typography className={styles.desc}>{t(`options.${desc}`)}</Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
