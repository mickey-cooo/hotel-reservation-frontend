import { Box, Container, Grid, Typography } from '@mui/material';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import styles from './LuminaDifference.module.scss';

const FEATURES = [
  {
    icon: EmojiEventsOutlinedIcon,
    title: 'สะสมคะแนน Lumina Rewards',
    desc: 'จองโดยตรงเพื่อรับคะแนนสะสมที่มากกว่าถึง 2 เท่า เพื่อใช้แลกสิทธิ์เข้าพักฟรีและรางวัลพิเศษอื่นๆ',
  },
  {
    icon: BoltOutlinedIcon,
    title: 'การยืนยันทันที',
    desc: 'รับอีเมลยืนยันการจองโดยตรงจากโรงแรม หมดกังวลเรื่องการจองตกหล่นหรือข้อผิดพลาดจากบุคคลที่สาม',
  },
  {
    icon: LocalOfferOutlinedIcon,
    title: 'สิทธิพิเศษสำหรับสปาและห้องอาหาร',
    desc: 'รับ Voucher ส่วนลด 20% สำหรับบริการสปาและห้องอาหารพรีเมียมตลอดการเข้าพัก',
  },
] as const;

export default function LuminaDifference() {
  return (
    <Box className={styles.section}>
      <Container maxWidth="lg">
        <Grid container spacing={6} className={styles.grid}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h3" className={styles.title}>
              ความแตกต่างที่สัมผัสได้
            </Typography>
            <Box className={styles.featureList}>
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <Box key={title} className={styles.featureItem}>
                  <Box className={styles.iconWrapper}>
                    <Icon className={styles.icon} />
                  </Box>
                  <Box>
                    <Typography className={styles.featureTitle}>
                      {title}
                    </Typography>
                    <Typography className={styles.featureDesc}>
                      {desc}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box className={styles.trustCard}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80"
                alt="Luxury pool at sunset"
                className={styles.trustImg}
              />
              <Box className={styles.trustBadge}>
                <VerifiedOutlinedIcon className={styles.badgeIcon} />
                <Box>
                  <Typography className={styles.badgeTitle}>
                    TRUST BADGE
                  </Typography>
                  <Typography className={styles.badgeSub}>
                    Official Partner
                  </Typography>
                </Box>
              </Box>
              <Typography className={styles.trustQuote}>
                &ldquo;The only way to experience Lumina Stay&apos;s full
                hospitality is through our direct portal.&rdquo;
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
