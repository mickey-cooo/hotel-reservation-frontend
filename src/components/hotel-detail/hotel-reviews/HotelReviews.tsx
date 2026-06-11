import NextLink from 'next/link';
import { Box, Grid, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import type { Review } from '@/lib/hotel-data';
import styles from './HotelReviews.module.scss';

interface HotelReviewsProps {
  reviews: Review[];
  reviewCount: number;
  hotelId: string;
}

const AVATAR_COLORS = ['#C5A059', '#3B82F6', '#10B981', '#8B5CF6', '#EF4444', '#F97316'];

export default function HotelReviews({ reviews, reviewCount, hotelId }: HotelReviewsProps) {
  return (
    <Box className={styles.section}>
      <Box className={styles.sectionHeader}>
        <Typography variant="h6" className={styles.sectionTitle}>
          Guest Reviews ({reviewCount})
        </Typography>
        <NextLink href={`/destinations/${hotelId}/reviews`} className={styles.seeAllLink}>
          See all &rsaquo;
        </NextLink>
      </Box>

      <Grid container spacing={2}>
        {reviews.slice(0, 4).map((review, index) => (
          <Grid key={review.id} size={{ xs: 12, sm: 6 }}>
            <Box className={styles.reviewCard}>
              <Box className={styles.reviewTop}>
                <Box
                  className={styles.avatar}
                  style={{ background: AVATAR_COLORS[index % AVATAR_COLORS.length] }}
                >
                  <Typography className={styles.avatarInitial}>
                    {review.author.charAt(0)}
                  </Typography>
                </Box>
                <Box className={styles.reviewMeta}>
                  <Typography className={styles.authorName}>{review.author}</Typography>
                  <Typography className={styles.reviewDate}>{review.date}</Typography>
                </Box>
              </Box>

              <Box className={styles.stars}>
                {Array.from({ length: review.rating }).map((_, i) => (
                  <StarIcon key={i} className={styles.starIcon} />
                ))}
              </Box>

              <Typography className={styles.reviewText}>{review.comment}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
