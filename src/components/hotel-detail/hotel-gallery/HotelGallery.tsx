'use client';

import { useState } from 'react';
import { Box, Button } from '@mui/material';
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import { useRouter } from 'next/navigation';
import styles from './HotelGallery.module.scss';

interface HotelGalleryProps {
  images: string[];
  hotelName: string;
  hotelId: string;
}

interface GalleryImageProps {
  src?: string;
  alt: string;
  fallbackLetter: string;
  className: string;
  fallbackClassName: string;
}

function GalleryImage({ src, alt, fallbackLetter, className, fallbackClassName }: GalleryImageProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return showImage ? (
    <Box component="img" src={src} alt={alt} className={className} onError={() => setFailed(true)} />
  ) : (
    <Box className={fallbackClassName}>{fallbackLetter}</Box>
  );
}

export default function HotelGallery({ images, hotelName, hotelId }: HotelGalleryProps) {
  const router = useRouter();
  const [main, ...thumbs] = images;
  const initial = hotelName.charAt(0).toUpperCase();
  const visibleThumbs = thumbs.slice(0, 4);
  const hasThumbs = visibleThumbs.length > 0;

  return (
    <Box className={`${styles.gallery}${hasThumbs ? '' : ` ${styles.galleryFull}`}`}>
      <Box className={styles.mainImage}>
        <GalleryImage
          src={main}
          alt={hotelName}
          fallbackLetter={initial}
          className={styles.img}
          fallbackClassName={styles.imgFallback}
        />
      </Box>

      {hasThumbs && (
        <Box className={styles.thumbGrid}>
          {visibleThumbs.map((src, index) => (
            <Box key={src} className={styles.thumbCell}>
              <GalleryImage
                src={src}
                alt={`${hotelName} ${index + 2}`}
                fallbackLetter={initial}
                className={styles.img}
                fallbackClassName={styles.imgFallback}
              />
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
      )}
    </Box>
  );
}
