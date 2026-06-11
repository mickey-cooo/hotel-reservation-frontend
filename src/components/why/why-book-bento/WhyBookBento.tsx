import { Box, Container, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import NoEncryptionGmailerrorredIcon from '@mui/icons-material/NoEncryptionGmailerrorred';
import StarIcon from '@mui/icons-material/Star';
import styles from './WhyBookBento.module.scss';

const MEMBER_PERKS = [
  'Members-only exclusive rates',
  'Early check-in from 14:00',
  'Late check-out until 13:00',
  'Welcome gift on arrival',
];

export default function WhyBookBento() {
  return (
    <Box className={styles.section}>
      <Container maxWidth="lg">
        <Box className={styles.heading}>
          <Typography variant="caption" className={styles.label}>
            Direct Booking Benefits
          </Typography>
          <Typography variant="h3" className={styles.title}>
            Why book with Lumina Stay?
          </Typography>
        </Box>

        <Box className={styles.grid}>
          {/* Top-left: hotel image */}
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80"
            alt="Luxury hotel room"
            className={`${styles.cell} ${styles.imgCell}`}
          />

          {/* Top-center: Best service card */}
          <Box className={`${styles.cell} ${styles.serviceCard}`}>
            <CheckCircleOutlineIcon className={styles.serviceIcon} />
            <Typography className={styles.cardTitle}>
              Best Rate Guarantee
            </Typography>
            <Typography className={styles.cardDesc}>
              Book directly and we'll match any lower rate you find elsewhere —
              no questions asked.
            </Typography>
          </Box>

          {/* Top-right: 24/7 support dark card */}
          <Box className={`${styles.cell} ${styles.supportCard}`}>
            <SupportAgentIcon className={styles.supportIcon} />
            <Typography className={styles.supportTitle}>
              24/7 Premium Support
            </Typography>
            <Typography className={styles.supportDesc}>
              Dedicated concierge available around the clock, from booking to
              check-out.
            </Typography>
            <Box className={styles.ratingRow}>
              {[1, 2, 3, 4, 5].map((s) => (
                <StarIcon key={s} className={styles.star} />
              ))}
              <Typography className={styles.ratingText}>5.0</Typography>
            </Box>
          </Box>

          {/* Bottom-left: member benefits card */}
          <Box className={`${styles.cell} ${styles.memberCard}`}>
            <CardMembershipIcon className={styles.memberIcon} />
            <Typography className={styles.cardTitle}>
              Members-Only Perks
            </Typography>
            <Box className={styles.perkList}>
              {MEMBER_PERKS.map((perk) => (
                <Box key={perk} className={styles.perkRow}>
                  <Box className={styles.perkDot} />
                  <Typography className={styles.perkText}>{perk}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Bottom-center: no hidden fees card */}
          <Box className={`${styles.cell} ${styles.noFeesCard}`}>
            <NoEncryptionGmailerrorredIcon className={styles.noFeesIcon} />
            <Typography className={styles.cardTitle}>
              No Hidden Charges
            </Typography>
            <Typography className={styles.cardDesc}>
              Transparent pricing, secure payment, and instant confirmation —
              every time.
            </Typography>
          </Box>

          {/* Bottom-right: pool image */}
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80"
            alt="Luxury pool"
            className={`${styles.cell} ${styles.imgCell}`}
          />
        </Box>
      </Container>
    </Box>
  );
}
