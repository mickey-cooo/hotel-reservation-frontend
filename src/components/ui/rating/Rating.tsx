import { Box, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import styles from './Rating.module.scss';

interface RatingProps {
  value: number;
  variant?: 'numeric' | 'stars';
  showEmptyStars?: boolean;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

export default function Rating({
  value,
  variant = 'numeric',
  showEmptyStars = false,
  className,
  iconClassName,
  textClassName,
}: RatingProps) {
  if (variant === 'stars') {
    const filled = Math.round(value);
    return (
      <Box className={`${styles.starsRow}${className ? ` ${className}` : ''}`}>
        {Array.from({ length: 5 }).map((_, i) =>
          i < filled ? (
            <StarIcon key={i} className={`${styles.starFilled}${iconClassName ? ` ${iconClassName}` : ''}`} />
          ) : showEmptyStars ? (
            <StarBorderIcon key={i} className={styles.starEmpty} />
          ) : null,
        )}
      </Box>
    );
  }

  return (
    <Box className={`${styles.numericRow}${className ? ` ${className}` : ''}`}>
      <StarIcon className={`${styles.starIcon}${iconClassName ? ` ${iconClassName}` : ''}`} />
      <Typography className={`${styles.ratingText}${textClassName ? ` ${textClassName}` : ''}`}>
        {value.toFixed(1)}
      </Typography>
    </Box>
  );
}
