import { Box, Container, Grid, Typography } from '@mui/material';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import FeatureItem from './FeatureItem';
import styles from './WhyLuminaSection.module.scss';

const GALLERY_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
    alt: 'Luxury bedroom',
    gridColumn: '1 / 2',
    gridRow: '1 / 2',
  },
  {
    src: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80',
    alt: 'Spa room',
    gridColumn: '2 / 3',
    gridRow: '1 / 2',
  },
  {
    src: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600&q=80',
    alt: 'City view at night',
    gridColumn: '1 / 3',
    gridRow: '2 / 3',
  },
] as const;

const FEATURES = [
  {
    icon: VerifiedOutlinedIcon,
    title: 'Verified Properties',
    description: 'Every property is hand-picked and physically inspected.',
  },
  {
    icon: SupportAgentIcon,
    title: '24/7 Priority Concierge',
    description: 'Expert assistance from booking to checkout.',
  },
] as const;

export default function WhyLuminaSection() {
  return (
    <Box className={styles.section}>
      <Container maxWidth="lg">
        <Grid container spacing={6} className={styles.gridRow}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography variant="caption" className={styles.sectionLabel}>
              The Lumina Difference
            </Typography>
            <Typography variant="h3" className={styles.sectionTitle}>
              Elevated Stays for the Discerning Traveler
            </Typography>
            <Typography className={styles.sectionBody}>
              We curate only the most exceptional properties, ensuring every
              booking meets our 150-point quality standard. Experience luxury as
              it was meant to be: personal, seamless, and unforgettable.
            </Typography>

            <Box className={styles.featureList}>
              {FEATURES.map(({ icon, title, description }) => (
                <FeatureItem key={title} icon={icon} title={title} description={description} />
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Box className={styles.gallery}>
              {GALLERY_IMAGES.map((img) => (
                <Box
                  key={img.alt}
                  component="img"
                  src={img.src}
                  alt={img.alt}
                  className={styles.galleryImg}
                  style={{ gridColumn: img.gridColumn, gridRow: img.gridRow }}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
