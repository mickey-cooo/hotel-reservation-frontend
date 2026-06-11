import { Box, Button, Grid, Link, Typography } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutlined';
import styles from './BookingBottomCta.module.scss';

export default function BookingBottomCta() {
  return (
    <Grid container spacing={3} className={styles.wrapper}>
      <Grid size={{ xs: 12, md: 7 }}>
        <Box className={styles.eliteCard}>
          <Typography variant="h5" className={styles.eliteTitle}>
            Elevate Your Stay with Lumina Elite
          </Typography>
          <Typography className={styles.eliteDesc}>
            Unlock complimentary room upgrades, late check-outs, and private
            airport transfers on all your upcoming bookings.
          </Typography>
          <Button variant="outlined" className={styles.eliteBtn}>
            Explore Membership
          </Button>
        </Box>
      </Grid>

      <Grid size={{ xs: 12, md: 5 }}>
        <Box className={styles.assistCard}>
          <Box className={styles.assistIconWrapper}>
            <HelpOutlineIcon className={styles.assistIcon} />
          </Box>
          <Typography variant="h6" className={styles.assistTitle}>
            Need Assistance?
          </Typography>
          <Typography className={styles.assistDesc}>
            Our 24/7 dedicated concierge is ready to help with your
            reservations.
          </Typography>
          <Link underline="none" className={styles.assistLink}>
            Contact Support
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
}
