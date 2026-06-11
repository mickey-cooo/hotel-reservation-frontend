'use client';

import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.scss';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'My Bookings', href: '/bookings' },
] as const;

interface NavbarProps {
  variant?: 'dark' | 'light';
}

export default function Navbar({ variant = 'dark' }: NavbarProps) {
  const pathname = usePathname();
  const isLight = variant === 'light';

  return (
    <AppBar
      position={isLight ? 'static' : 'absolute'}
      elevation={0}
      className={`${styles.appBar}${isLight ? ` ${styles.appBarLight}` : ''}`}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters className={styles.toolbar}>
          <Typography
            variant="h6"
            component={NextLink}
            href="/"
            className={`${styles.brand}${isLight ? ` ${styles.brandLight}` : ''}`}
          >
            Lumina Stay
          </Typography>

          <Box className={styles.navLinks}>
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <Button
                  key={label}
                  component={NextLink}
                  href={href}
                  className={`${styles.navBtn}${isActive ? ` ${styles.navBtnActive}` : ''}${isLight ? ` ${styles.navBtnLight}` : ''}`}
                >
                  {label}
                </Button>
              );
            })}
          </Box>

          {isLight && (
            <Button className={styles.memberPerksBtn}>
              Member Perks
            </Button>
          )}

          <Button variant="contained" className={styles.signInBtn}>
            Sign In
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
