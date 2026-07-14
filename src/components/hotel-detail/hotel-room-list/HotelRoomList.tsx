import { Box, Typography } from '@mui/material';
import HotelRoomCard from '../hotel-room-card/HotelRoomCard';
import type { Room } from '@/lib/hotel-data';
import styles from './HotelRoomList.module.scss';

interface HotelRoomListProps {
  rooms: Room[];
  hotelId: string;
}

export default function HotelRoomList({ rooms, hotelId }: HotelRoomListProps) {
  return (
    <Box className={styles.section}>
      <Typography variant="h6" className={styles.sectionTitle}>
        Our Rooms
      </Typography>
      <Box className={styles.list}>
        {rooms.map((room) => (
          <HotelRoomCard key={room.id} room={room} hotelId={hotelId} />
        ))}
      </Box>
    </Box>
  );
}
