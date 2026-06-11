import { Box, Button, Typography } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import styles from './BookingCard.module.scss';

export type BookingStatus = 'CONFIRMED' | 'ACTION_REQUIRED';
export type SecondaryAction = 'DOWNLOAD_INVOICE' | 'GET_SUPPORT' | 'CHAT_WITH_CONCIERGE';

export interface Booking {
  id: string;
  status: BookingStatus;
  hotelName: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  totalPrice: number;
  imageUrl: string;
  actionNotice?: string;
  secondaryAction: SecondaryAction;
}

const SECONDARY_ACTION_CONFIG: Record<
  SecondaryAction,
  { label: string; Icon: React.ElementType }
> = {
  DOWNLOAD_INVOICE: { label: 'Download Invoice', Icon: DownloadOutlinedIcon },
  GET_SUPPORT: { label: 'Get Support', Icon: HelpOutlineIcon },
  CHAT_WITH_CONCIERGE: { label: 'Chat with Concierge', Icon: ChatOutlinedIcon },
};

interface BookingCardProps {
  booking: Booking;
}

export default function BookingCard({ booking }: BookingCardProps) {
  const {
    status,
    hotelName,
    location,
    checkIn,
    checkOut,
    guests,
    totalPrice,
    imageUrl,
    actionNotice,
    secondaryAction,
  } = booking;

  const { label: secondaryLabel, Icon: SecondaryIcon } =
    SECONDARY_ACTION_CONFIG[secondaryAction];

  const isActionRequired = status === 'ACTION_REQUIRED';

  return (
    <Box className={styles.card}>
      <Box className={styles.imageSection}>
        <Box
          component="img"
          src={imageUrl}
          alt={hotelName}
          className={styles.image}
        />
        <Box
          className={`${styles.badge} ${isActionRequired ? styles.badgeActionRequired : styles.badgeConfirmed}`}
        >
          {isActionRequired ? 'ACTION REQUIRED' : 'CONFIRMED'}
        </Box>
      </Box>

      <Box className={styles.content}>
        <Box className={styles.topRow}>
          <Box className={styles.nameBlock}>
            <Typography className={styles.hotelName}>{hotelName}</Typography>
            <Box className={styles.locationRow}>
              <LocationOnOutlinedIcon fontSize="small" className={styles.locationIcon} />
              <Typography className={styles.location}>{location}</Typography>
            </Box>
          </Box>
          <Box className={styles.priceBlock}>
            <Typography className={styles.priceLabel}>TOTAL PRICE</Typography>
            <Typography className={styles.price}>
              ${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </Typography>
          </Box>
        </Box>

        <Box className={styles.datesRow}>
          {[
            { label: 'CHECK-IN', value: checkIn },
            { label: 'CHECK-OUT', value: checkOut },
            { label: 'GUESTS', value: guests },
          ].map(({ label, value }) => (
            <Box key={label} className={styles.dateField}>
              <Typography className={styles.dateLabel}>{label}</Typography>
              <Typography className={styles.dateValue}>{value}</Typography>
            </Box>
          ))}
        </Box>

        {actionNotice && (
          <Box className={styles.actionNotice}>
            <InfoOutlinedIcon fontSize="small" className={styles.noticeIcon} />
            <Typography className={styles.noticeText}>{actionNotice}</Typography>
          </Box>
        )}

        <Box className={styles.actionsRow}>
          <Button
            variant="contained"
            className={`${styles.primaryBtn}${isActionRequired ? ` ${styles.primaryBtnGold}` : ''}`}
          >
            {isActionRequired ? 'Provide Details' : 'View Details'}
          </Button>
          <Button variant="outlined" className={styles.manageBtn}>
            Manage
          </Button>
          <Box className={styles.spacer} />
          <Button
            className={styles.secondaryActionBtn}
            startIcon={<SecondaryIcon fontSize="small" />}
          >
            {secondaryLabel}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
