import { Chip } from '@mui/material';
import styles from './StatusBadge.module.scss';

interface StatusBadgeProps {
  label: string;
  background: string;
  color?: string;
  border?: string;
  className?: string;
}

export default function StatusBadge({
  label,
  background,
  color = '#fff',
  border,
  className,
}: StatusBadgeProps) {
  return (
    <Chip
      label={label}
      size="small"
      className={`${styles.badge}${className ? ` ${className}` : ''}`}
      style={{ backgroundColor: background, color, border }}
    />
  );
}
