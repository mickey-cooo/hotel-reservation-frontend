import { Box, Typography } from '@mui/material';
import styles from './FeatureItem.module.scss';

interface FeatureItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

export default function FeatureItem({ icon: Icon, title, description }: FeatureItemProps) {
  return (
    <Box className={styles.featureItem}>
      <Box className={styles.iconWrapper}>
        <Icon className={styles.icon} />
      </Box>
      <Box>
        <Typography className={styles.title}>{title}</Typography>
        <Typography className={styles.description}>{description}</Typography>
      </Box>
    </Box>
  );
}
