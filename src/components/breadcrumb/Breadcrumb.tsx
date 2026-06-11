import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import styles from './Breadcrumb.module.scss';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <Box className={styles.breadcrumb}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <Box key={index} className={styles.item}>
            {!isLast && item.href ? (
              <Link href={item.href} className={styles.link}>
                {item.label}
              </Link>
            ) : (
              <Typography component="span" className={`${styles.link}${isLast ? ` ${styles.current}` : ''}`}>
                {item.label}
              </Typography>
            )}
            {!isLast && <span className={styles.sep}>›</span>}
          </Box>
        );
      })}
    </Box>
  );
}
