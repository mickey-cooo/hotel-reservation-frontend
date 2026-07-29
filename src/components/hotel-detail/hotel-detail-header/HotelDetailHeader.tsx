import { Box, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import IconLabelRow from '@/components/ui/icon-label-row/IconLabelRow';
import styles from './HotelDetailHeader.module.scss';

interface HotelDetailHeaderProps {
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  description: string;
}

export default function HotelDetailHeader({
  name,
  location,
  rating,
  reviewCount,
  description,
}: HotelDetailHeaderProps) {
  return (
    <Box className={styles.header}>
      <Box className={styles.metaRow}>
        <Box className={styles.ratingMeta}>
          <StarIcon className={styles.starIcon} />
          <Typography component="span" className={styles.ratingValue}>
            {rating.toFixed(1)}
          </Typography>
          <Typography component="span" className={styles.reviewCount}>
            ({reviewCount} reviews)
          </Typography>
        </Box>
        <Box className={styles.separator} />
        <IconLabelRow
          icon={LocationOnOutlinedIcon}
          text={location}
          className={styles.locationMeta}
          iconClassName={styles.locationIcon}
          textClassName={styles.locationText}
        />
      </Box>

      <Typography variant="h1" className={styles.hotelName}>
        {name}
      </Typography>

      <Typography className={styles.description}>{description}</Typography>
    </Box>
  );
}
