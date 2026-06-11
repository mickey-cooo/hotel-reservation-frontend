import { Box, Container, Divider, Typography } from '@mui/material';
import styles from './TrustBar.module.scss';

const PRESS_MENTIONS = ['Forbes', 'Vogue', 'Traveler'] as const;

export default function TrustBar() {
  return (
    <Box className={styles.trustBar}>
      <Container maxWidth="lg">
        <Box className={styles.innerRow}>
          <Box className={styles.avatarGroup}>
            <Box className={styles.avatarPrimary}>
              <Typography className={styles.avatarLabel}>TP</Typography>
            </Box>
            <Box className={styles.avatarSecondary}>
              <Typography className={styles.avatarLabel}>★</Typography>
            </Box>
            <Typography className={styles.trustText}>
              Trusted by 500,000+ travelers worldwide
            </Typography>
          </Box>

          <Divider orientation="vertical" flexItem className={styles.divider} />

          <Box className={styles.pressRow}>
            {PRESS_MENTIONS.map((name) => (
              <Typography key={name} className={styles.pressName}>
                {name}
              </Typography>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
