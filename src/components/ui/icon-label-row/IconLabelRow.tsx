import { Box, Typography } from '@mui/material';
import type { SvgIconComponent } from '@mui/icons-material';
import styles from './IconLabelRow.module.scss';

interface IconLabelRowProps {
  icon: SvgIconComponent;
  text: string;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

export default function IconLabelRow({
  icon: Icon,
  text,
  className,
  iconClassName,
  textClassName,
}: IconLabelRowProps) {
  return (
    <Box className={`${styles.row}${className ? ` ${className}` : ''}`}>
      <Icon className={`${styles.icon}${iconClassName ? ` ${iconClassName}` : ''}`} />
      <Typography className={`${styles.text}${textClassName ? ` ${textClassName}` : ''}`}>
        {text}
      </Typography>
    </Box>
  );
}
