import { Box, Container, Typography } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PhoneIcon from '@mui/icons-material/Phone';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { ElementType } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
import styles from './ConciergeOptions.module.scss';

interface Option {
  Icon: ElementType<SvgIconProps>;
  title: string;
  desc: string;
  label: string;
}

const OPTIONS: Option[] = [
  {
    Icon: MenuBookIcon,
    title: 'Knowledge Base',
    desc: 'Find answers to common questions about policies and amenities.',
    label: 'Browse Knowledge Base',
  },
  {
    Icon: PhoneIcon,
    title: 'Speak to Concierge',
    desc: 'Prefer a human touch? Our global team is just a phone call away.',
    label: 'Call Concierge',
  },
  {
    Icon: VerifiedUserIcon,
    title: 'Premium Support',
    desc: 'Dedicated priority handling for our Lumina Gold members.',
    label: 'Access Premium Support',
  },
];

export default function ConciergeOptions() {
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
              aria-label={label}
            >
              <Box className={styles.iconWrap} aria-hidden="true">
                <Icon className={styles.icon} />
              </Box>
              <Typography className={styles.title}>{title}</Typography>
              <Typography className={styles.desc}>{desc}</Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
