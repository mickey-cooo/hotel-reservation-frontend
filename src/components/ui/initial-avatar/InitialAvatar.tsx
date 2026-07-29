import { Box, Typography } from '@mui/material';
import styles from './InitialAvatar.module.scss';

interface InitialAvatarProps {
  name: string;
  color: string;
  size?: number;
  className?: string;
}

export default function InitialAvatar({ name, color, size = 48, className }: InitialAvatarProps) {
  return (
    <Box
      className={`${styles.avatar}${className ? ` ${className}` : ''}`}
      style={{ background: color, width: size, height: size }}
    >
      <Typography className={styles.initial} style={{ fontSize: size * 0.4 }}>
        {name.charAt(0)}
      </Typography>
    </Box>
  );
}
