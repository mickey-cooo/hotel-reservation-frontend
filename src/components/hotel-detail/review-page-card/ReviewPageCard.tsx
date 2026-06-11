import { Box, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import type { Review } from '@/lib/hotel-data';
import styles from './ReviewPageCard.module.scss';

interface ReviewPageCardProps {
  review: Review;
  avatarColor: string;
}

export default function ReviewPageCard({ review, avatarColor }: ReviewPageCardProps) {
  return (
    <Box className={styles.card}>
      <Box className={styles.header}>
        <Box className={styles.avatar} style={{ background: avatarColor }}>
          <Typography className={styles.avatarInitial}>{review.author.charAt(0)}</Typography>
        </Box>

        <Box className={styles.meta}>
          <Typography className={styles.authorName}>{review.author}</Typography>
          <Box className={styles.metaRow}>
            <Typography className={styles.stayDate}>Stayed in {review.date}</Typography>
            <Box className={styles.verifiedBadge}>
              <Typography className={styles.verifiedText}>VERIFIED STAY</Typography>
            </Box>
          </Box>
        </Box>

        <Box className={styles.stars}>
          {Array.from({ length: 5 }).map((_, i) =>
            i < review.rating ? (
              <StarIcon key={i} className={styles.starFilled} />
            ) : (
              <StarBorderIcon key={i} className={styles.starEmpty} />
            ),
          )}
        </Box>
      </Box>

      <Typography className={styles.comment}>{review.comment}</Typography>

      {review.photos && review.photos.length > 0 && (
        <Box className={styles.photos}>
          {review.photos.map((src, i) => (
            <Box
              key={i}
              component="img"
              src={src}
              alt={`Review photo ${i + 1}`}
              className={styles.photo}
            />
          ))}
        </Box>
      )}

      <Box className={styles.actions}>
        <Box className={styles.actionBtn}>
          <ThumbUpOutlinedIcon className={styles.actionIcon} />
          <Typography className={styles.actionLabel}>
            Helpful ({review.helpfulCount ?? 0})
          </Typography>
        </Box>
        <Box className={styles.actionBtn}>
          <ChatBubbleOutlineIcon className={styles.actionIcon} />
          <Typography className={styles.actionLabel}>Comment</Typography>
        </Box>
      </Box>
    </Box>
  );
}
