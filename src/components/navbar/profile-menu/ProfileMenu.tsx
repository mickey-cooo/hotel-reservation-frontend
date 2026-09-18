'use client';

import { useState, type MouseEvent } from 'react';
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import NextLink from 'next/link';
import styles from './ProfileMenu.module.scss';
import InitialAvatar from '@/components/ui/initial-avatar/InitialAvatar';
import { logoutAction } from '@/service/auth/auth-actions';

interface ProfileMenuProps {
  userEmail: string;
  avatarSize?: number;
}

export default function ProfileMenu({ userEmail, avatarSize = 36 }: ProfileMenuProps) {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  function handleOpen(event: MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  async function handleLogout() {
    handleClose();
    await logoutAction();
    router.push('/login');
    router.refresh();
  }

  return (
    <>
      <IconButton
        onClick={handleOpen}
        className={styles.profileBtn}
        aria-label={t('navbar.accountMenu')}
        aria-controls={open ? 'profile-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <InitialAvatar name={userEmail} color="var(--color-gold)" size={avatarSize} />
      </IconButton>

      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        classes={{ paper: styles.menuPaper }}
      >
        <div className={styles.menuHeader}>
          <span className={styles.menuHeaderLabel}>{t('navbar.signedInAs')}</span>
          <span className={styles.menuHeaderEmail}>{userEmail}</span>
        </div>

        <Divider className={styles.menuDivider} />

        <MenuItem
          component={NextLink}
          href="/bookings"
          onClick={handleClose}
          className={styles.menuItem}
        >
          <ListItemIcon className={styles.menuItemIcon}>
            <BookOnlineIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('nav.myBookings')}</ListItemText>
        </MenuItem>

        <Divider className={styles.menuDivider} />

        <MenuItem onClick={handleLogout} className={`${styles.menuItem} ${styles.menuItemDanger}`}>
          <ListItemIcon className={styles.menuItemIconDanger}>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('navbar.logOut')}</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
