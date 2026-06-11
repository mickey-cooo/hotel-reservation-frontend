import { Box, Container, Divider, Grid, IconButton, Link, Typography } from '@mui/material';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SmartphoneOutlinedIcon from '@mui/icons-material/SmartphoneOutlined';
import styles from './Footer.module.scss';

const FOOTER_LINKS = ['Privacy Policy', 'Terms of Service', 'Help Center', 'Contact Us'] as const;

export default function Footer() {
  return (
    <Box component="footer" className={styles.footer}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" className={styles.brandName}>
              Lumina Stay
            </Typography>
            <Typography className={styles.brandDesc}>
              Redefining hotel booking meets our 150-point quality standard.
              Experience luxury as it was meant to be: personal, seamless, and
              extraordinary.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Box className={styles.socialRow}>
              <IconButton size="small" className={styles.socialBtn}>
                <SmartphoneOutlinedIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" className={styles.socialBtn}>
                <ShareOutlinedIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" className={styles.socialBtn}>
                <EmailOutlinedIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Divider className={styles.divider} />

        <Box className={styles.bottomRow}>
          <Box className={styles.linkList}>
            {FOOTER_LINKS.map((label) => (
              <Link key={label} underline="none" className={styles.footerLink}>
                {label}
              </Link>
            ))}
          </Box>
          <Typography className={styles.copyright}>
            © 2025 Lumina Stay. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
