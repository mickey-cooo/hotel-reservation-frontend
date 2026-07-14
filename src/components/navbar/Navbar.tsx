'use client';

import { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.scss';
import LanguageSwitcher from './language-switcher/LanguageSwitcher';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'Membership', href: '/membership' },
  { label: 'My Bookings', href: '/bookings' },
] as const;

interface NavbarProps {
  variant?: 'dark' | 'light';
}

export default function Navbar({ variant = 'dark' }: NavbarProps) {
  const pathname = usePathname();
  const isLight = variant === 'light';
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
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

            <Box className={styles.desktopActions}>
              {isLight && (
                <Button
                  component={NextLink}
                  href="/membership"
                  className={styles.memberPerksBtn}
                >
                  Member Perks
                </Button>
              )}
              <LanguageSwitcher variant={variant} />
              <Button
                variant="contained"
                component={NextLink}
                href="/login"
                className={styles.signInBtn}
              >
                Sign In
              </Button>
            </Box>

            <IconButton
              className={`${styles.menuBtn}${isLight ? ` ${styles.menuBtnLight}` : ''}`}
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        classes={{ paper: styles.drawerPaper }}
      >
        <Box className={styles.drawerHeader}>
          <Typography
            variant="h6"
            component={NextLink}
            href="/"
            className={styles.drawerBrand}
            onClick={() => setDrawerOpen(false)}
          >
            Lumina Stay
          </Typography>
          <IconButton onClick={() => setDrawerOpen(false)} className={styles.drawerClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider className={styles.drawerDivider} />

        <Box className={styles.drawerLinks}>
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Button
                key={label}
                component={NextLink}
                href={href}
                fullWidth
                className={`${styles.drawerNavBtn}${isActive ? ` ${styles.drawerNavBtnActive}` : ''}`}
                onClick={() => setDrawerOpen(false)}
              >
                {label}
              </Button>
            );
          })}
        </Box>

        <Divider className={styles.drawerDivider} />

        <Box className={styles.drawerFooter}>
          <LanguageSwitcher variant="light" fullWidth />
          <Button
            variant="contained"
            component={NextLink}
            href="/login"
            fullWidth
            className={styles.drawerSignInBtn}
            onClick={() => setDrawerOpen(false)}
          >
            Sign In
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
