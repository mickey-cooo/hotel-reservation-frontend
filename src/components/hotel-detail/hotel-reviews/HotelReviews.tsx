'use client';

import NextLink from 'next/link';
import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import InitialAvatar from '@/components/ui/initial-avatar/InitialAvatar';
import Rating from '@/components/ui/rating/Rating';
import type { Review } from '@/models/entity/hotel-review/hotel-review.model';
import styles from './HotelReviews.module.scss';

interface HotelReviewsProps {
  reviews: Review[];
  reviewCount: number;
  hotelId: string;
}

const AVATAR_COLORS = ['#C5A059', '#3B82F6', '#10B981', '#8B5CF6', '#EF4444', '#F97316'];

export default function HotelReviews({ reviews, reviewCount, hotelId }: HotelReviewsProps) {
  const { t } = useTranslation('hotelDetail');

  return (
    <Box className={styles.section}>
      <Box className={styles.sectionHeader}>
        <Typography variant="h6" className={styles.sectionTitle}>
          {t('reviewsSection.title', { n: reviewCount })}
        </Typography>
        <NextLink href={`/destinations/${hotelId}/reviews`} className={styles.seeAllLink}>
          {t('reviewsSection.seeAll')}
        </NextLink>
      </Box>

      <Grid container spacing={2}>
        {reviews.slice(0, 4).map((review, index) => (
          <Grid key={review.id} size={{ xs: 12, sm: 6 }}>
            {(() => {
              const author = t(`reviewAuthor.${review.author}`, { defaultValue: review.author });
              return (
            <Box className={styles.reviewCard}>
              <Box className={styles.reviewTop}>
                <InitialAvatar
                  name={author}
                  color={AVATAR_COLORS[index % AVATAR_COLORS.length]}
                  size={40}
                  className={styles.avatar}
                />
                <Box className={styles.reviewMeta}>
                  <Typography className={styles.authorName}>{author}</Typography>
                  <Typography className={styles.reviewDate}>{review.date}</Typography>
                </Box>
              </Box>

              <Rating
                value={review.rating}
                variant="stars"
                className={styles.stars}
                iconClassName={styles.starIcon}
              />

              <Typography className={styles.reviewText}>{review.comment}</Typography>
            </Box>
              );
            })()}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
