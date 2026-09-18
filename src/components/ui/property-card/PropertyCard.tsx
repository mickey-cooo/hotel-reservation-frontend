'use client';

import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import NextLink from 'next/link';
import StatusBadge from '@/components/ui/status-badge/StatusBadge';
import Rating from '@/components/ui/rating/Rating';
import IconLabelRow from '@/components/ui/icon-label-row/IconLabelRow';
import PriceRow from '@/components/ui/price-row/PriceRow';
import styles from './PropertyCard.module.scss';
import { useTranslation } from 'react-i18next';

interface PropertyCardBadge {
  label: string;
  background: string;
  color?: string;
}

interface PropertyCardProps {
  href: string;
  name: string;
  location: string;
  rating: number;
  price: number;
  imageUrl?: string;
  badge?: PropertyCardBadge;
  variant?: 'elevated' | 'outlined';
}

export default function PropertyCard({
  href,
  name,
  location,
  rating,
  price,
  imageUrl,
  badge,
  variant = 'elevated',
}: PropertyCardProps) {
  const { t } = useTranslation('common');
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(imageUrl) && !imageFailed;

  return (
    <NextLink
      href={href}
      className={`${styles.card}${variant === 'outlined' ? ` ${styles.cardOutlined}` : ''}`}
    >
      <Box className={styles.imageWrapper}>
        {showImage ? (
          <Box
            component="img"
            src={imageUrl}
            alt={name}
            className={styles.cardImage}
            onError={() => setImageFailed(true)}
          />
        ) : (
          <Box className={styles.cardImageFallback}>
            {name.charAt(0).toUpperCase()}
          </Box>
        )}
        {badge && (
          <StatusBadge
            label={badge.label}
            background={badge.background}
            color={badge.color}
            className={styles.badge}
          />
        )}
        <IconButton size="small" className={styles.favoriteBtn}>
          <FavoriteBorderIcon className={styles.favoriteIcon} />
        </IconButton>
      </Box>

      <Box className={styles.cardBody}>
        <Box className={styles.titleRow}>
          <Box component="span" className={styles.cardTitle}>{name}</Box>
          <Rating value={rating} />
        </Box>

        <IconLabelRow icon={LocationOnOutlinedIcon} text={location || t('card.locationUnavailable')} className={styles.locationRow} />

        <PriceRow amount={price} className={styles.priceRow} />
      </Box>
    </NextLink>
  );
}
