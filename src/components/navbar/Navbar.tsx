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
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import styles from './Navbar.module.scss';
import LanguageSwitcher from './language-switcher/LanguageSwitcher';
import InitialAvatar from '@/components/ui/initial-avatar/InitialAvatar';
import ProfileMenu from './profile-menu/ProfileMenu';
import { logoutAction } from '@/service/auth/auth-actions';
import { useUserEmail } from '@/hooks/useUserEmail';

const NAV_LINKS = [
  { key: 'home', href: '/' },
  { key: 'destinations', href: '/destinations' },
  { key: 'membership', href: '/membership' },
  { key: 'myBookings', href: '/bookings' },
] as const;

interface NavbarProps {
  variant?: 'dark' | 'light';
}

export default function Navbar({ variant = 'dark' }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isLight = variant === 'light';
  const [drawerOpen, setDrawerOpen] = useState(false);
  const userEmail = useUserEmail();
  const { t } = useTranslation('common');

  async function handleDrawerLogout() {
    setDrawerOpen(false);
    await logoutAction();
    router.push('/login');
    router.refresh();
  }

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
              {NAV_LINKS.map(({ key, href }) => {
                const isActive = pathname === href;
                return (
                  <Button
                    key={key}
                    component={NextLink}
                    href={href}
                    className={`${styles.navBtn}${isActive ? ` ${styles.navBtnActive}` : ''}${isLight ? ` ${styles.navBtnLight}` : ''}`}
                  >
                    {t(`nav.${key}`)}
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
                  {t('navbar.memberPerks')}
                </Button>
              )}
              <LanguageSwitcher variant={variant} />
              {userEmail ? (
                <ProfileMenu userEmail={userEmail} avatarSize={36} />
              ) : (
                <Button
                  variant="contained"
                  component={NextLink}
                  href="/login"
                  className={styles.signInBtn}
                >
                  {t('navbar.signIn')}
                </Button>
              )}
            </Box>

            <IconButton
              className={`${styles.menuBtn}${isLight ? ` ${styles.menuBtnLight}` : ''}`}
              onClick={() => setDrawerOpen(true)}
              aria-label={t('navbar.openMenu')}
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
          {NAV_LINKS.map(({ key, href }) => {
            const isActive = pathname === href;
            return (
              <Button
                key={key}
                component={NextLink}
                href={href}
                fullWidth
                className={`${styles.drawerNavBtn}${isActive ? ` ${styles.drawerNavBtnActive}` : ''}`}
                onClick={() => setDrawerOpen(false)}
              >
                {t(`nav.${key}`)}
              </Button>
            );
          })}
        </Box>

        <Divider className={styles.drawerDivider} />

        <Box className={styles.drawerFooter}>
          <LanguageSwitcher variant="light" fullWidth />
          {userEmail ? (
            <>
              <Button
                variant="outlined"
                component={NextLink}
                href="/bookings"
                fullWidth
                startIcon={
                  <InitialAvatar name={userEmail} color="var(--color-gold)" size={24} />
                }
                className={styles.drawerProfileBtn}
                onClick={() => setDrawerOpen(false)}
              >
                {t('navbar.myAccount')}
              </Button>
              <Button
                variant="text"
                fullWidth
                className={styles.drawerLogoutBtn}
                onClick={handleDrawerLogout}
              >
                {t('navbar.logOut')}
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              component={NextLink}
              href="/login"
              fullWidth
              className={styles.drawerSignInBtn}
              onClick={() => setDrawerOpen(false)}
            >
              {t('navbar.signIn')}
            </Button>
          )}
        </Box>
      </Drawer>
    </>
  );
}
