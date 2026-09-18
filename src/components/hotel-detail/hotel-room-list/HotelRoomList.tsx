'use client';

import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HotelRoomCard from '../hotel-room-card/HotelRoomCard';
import type { Room } from '@/models/entity/hotel-room/hotel-room.model';
import styles from './HotelRoomList.module.scss';

interface HotelRoomListProps {
  rooms: Room[];
  hotelId: string;
}

export default function HotelRoomList({ rooms, hotelId }: HotelRoomListProps) {
  const { t } = useTranslation('hotelDetail');

  return (
    <Box className={styles.section}>
      <Typography variant="h6" className={styles.sectionTitle}>
        {t('rooms.title')}
      </Typography>
      <Box className={styles.list}>
        {rooms.map((room) => (
          <HotelRoomCard key={room.id} room={room} hotelId={hotelId} />
        ))}
      </Box>
    </Box>
  );
}
