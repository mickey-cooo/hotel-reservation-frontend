'use client';

import { Box, Typography } from '@mui/material';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';
import styles from './MembershipLifestyle.module.scss';

export default function MembershipLifestyle() {
  const { t } = useTranslation(['membership', 'common']);

  return (
    <Box component="section" className={styles.section}>
      <Box className={styles.textSide}>
        <Typography variant="h3" className={styles.title}>
          {t('lifestyle.titleLine1')}
          <br />
          {t('lifestyle.titleLine2')}
        </Typography>
        <Typography className={styles.description}>
          {t('lifestyle.description')}
        </Typography>
        <Box className={styles.trustList}>
          <Box className={styles.trustRow}>
            <Box className={styles.trustIconWrap}>
              <VerifiedUserOutlinedIcon className={styles.trustIcon} />
            </Box>
            <Typography className={styles.trustText}>
              {t('lifestyle.security')}
            </Typography>
          </Box>
          <Box className={styles.trustRow}>
            <Box className={styles.trustIconWrap}>
              <LanguageIcon className={styles.trustIcon} />
            </Box>
            <Typography className={styles.trustText}>
              {t('lifestyle.network')}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box className={styles.imageSide}>
        <Box
          component="img"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-VZEHyn0jxeemKFzhGDwtfJEuMXtu1Qw4Va2DR2eoWZSd26LfSg8FGfSINcMr8sjAo2chJ3rxW_V5SzjFv00fzx2pgfzEGE-quYqR5ISyU5bldnFeTlm5oZAANpvyqGUfnfhkaZ0xXGl9ci9oGf2nmby_WY1vnfyp36n1JyYu2t2ktTef9_Gfl0Zs1uxbGj5dVE-9vRmCR8bRKZqZRG4USHl87sCFwK1F4eUsDlcCzkbquxXhBzbOvpVvr1F1QaG3w75xIDl6vYAP"
        alt={t('common:imageAlt.breakfast')}
          className={styles.image}
        />
      </Box>
    </Box>
  );
}
