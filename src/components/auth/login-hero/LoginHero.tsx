import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import styles from './LoginHero.module.scss';

const PERKS = [
  'Exclusive member rates — up to 40% off',
  '500+ curated luxury properties worldwide',
  'Bespoke concierge & priority check-in',
];

export default function LoginHero() {
  return (
    <Box className={styles.hero}>
      <Image
        src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80"
        alt="Lumina Stay luxury interior"
        fill
        className={styles.image}
        sizes="400px"
      />
      <Box className={styles.overlay} />
      <Box className={styles.content}>
        <Box className={styles.brandArea}>
          <Typography className={styles.eyebrow}>WELCOME TO</Typography>
          <Typography variant="h4" className={styles.brand}>
            Lumina Stay
          </Typography>
          <Box className={styles.goldDivider} />
        </Box>
        <Box className={styles.perks}>
          {PERKS.map((perk) => (
            <Box key={perk} className={styles.perkItem}>
              <Box className={styles.perkDot} />
              <Typography className={styles.perkText}>{perk}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
