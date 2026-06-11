'use client';

import { Box, Button } from '@mui/material';
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import { useRouter } from 'next/navigation';
import styles from './HotelGallery.module.scss';

interface HotelGalleryProps {
  images: string[];
  hotelName: string;
  hotelId: string;
}

export default function HotelGallery({ images, hotelName, hotelId }: HotelGalleryProps) {
  const router = useRouter();
  const [main, ...thumbs] = images;

  return (
    <Box className={styles.gallery}>
      <Box className={styles.mainImage}>
        <Box component="img" src={main} alt={hotelName} className={styles.img} />
      </Box>

      <Box className={styles.thumbGrid}>
        {thumbs.slice(0, 4).map((src, index) => (
          <Box key={src} className={styles.thumbCell}>
            <Box component="img" src={src} alt={`${hotelName} ${index + 2}`} className={styles.img} />
            {index === 3 && (
              <Button
                className={styles.viewAllBtn}
                startIcon={<PhotoLibraryOutlinedIcon />}
                onClick={() => router.push(`/destinations/${hotelId}/photos`)}
              >
                View all photos
              </Button>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
