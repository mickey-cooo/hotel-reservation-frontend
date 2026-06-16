'use client';

import { Box, Button, Container, Typography } from '@mui/material';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import NextLink from 'next/link';
import styles from './MembershipTiers.module.scss';

interface Tier {
  id: string;
  level: string;
  name: string;
  description: string;
  price: string;
  priceNote: string;
  featured: boolean;
  badge?: string;
  perks: string[];
}

const TIERS: Tier[] = [
  {
    id: 'essential',
    level: 'Entry Level',
    name: 'Lumina Essential',
    description: 'เริ่มต้นการเดินทางที่เหนือระดับด้วยพื้นฐานแห่งความสะดวกสบาย',
    price: 'ฟรี',
    priceNote: 'ตลอดชีพ',
    featured: false,
    perks: [
      'บริการ Wi-Fi ความเร็วสูงฟรี',
      'สะสมคะแนนทุกการเข้าพัก',
      'ราคาพิเศษสำหรับสมาชิก',
    ],
  },
  {
    id: 'select',
    level: 'Most Popular',
    name: 'Lumina Select',
    description: 'ยกระดับมาตรฐานการพักผ่อนด้วยบริการเสริมที่คัดสรรมาอย่างดี',
    price: '฿15,000',
    priceNote: '/ ปี',
    featured: true,
    badge: 'RECOMMENDED',
    perks: [
      'สิทธิ์เช็คเอาท์ล่าช้า (Late Checkout)',
      'ของขวัญต้อนรับพิเศษเมื่อเข้าพัก',
      'ส่วนลด 10% สำหรับบริการสปา',
      'โบนัสคะแนนสะสมเพิ่ม 25%',
    ],
  },
  {
    id: 'elite',
    level: 'The Ultimate',
    name: 'Lumina Elite',
    description: 'ที่สุดแห่งเอกสิทธิ์เฉพาะบุคคลเพื่อประสบการณ์ที่หาจากที่ไหนไม่ได้',
    price: '฿45,000',
    priceNote: '/ ปี',
    featured: false,
    perks: [
      'สิทธิ์อัปเกรดห้องพักอัตโนมัติ',
      'บริการผู้ช่วยส่วนตัว 24/7',
      'สิทธิ์สำรองที่พักล่วงหน้า (Priority)',
      'เข้าใช้ Exclusive Lounge ได้ทั่วโลก',
    ],
  },
];

export default function MembershipTiers() {
  return (
    <Box component="section" className={styles.section}>
      <Container maxWidth="lg">
        <Box className={styles.heading}>
          <Typography variant="h2" className={styles.sectionTitle}>
            ระดับสมาชิกและสิทธิประโยชน์
          </Typography>
          <Typography className={styles.sectionSubtitle}>
            เลือกแผนที่เหมาะสมกับการเดินทางของคุณ
            และเริ่มสะสมคะแนนเพื่อแลกรับประสบการณ์อันน่าประทับใจทั่วโลก
          </Typography>
        </Box>

        <Box className={styles.grid}>
          {TIERS.map((tier) => (
            <Box
              key={tier.id}
              className={`${styles.card}${tier.featured ? ` ${styles.cardFeatured}` : ''}`}
            >
              {tier.badge && (
                <span className={styles.recommendedBadge}>{tier.badge}</span>
              )}

              <Box className={styles.cardTop}>
                <Typography className={`${styles.levelLabel}${tier.featured ? ` ${styles.levelLabelFeatured}` : ''}`}>
                  {tier.level}
                </Typography>
                <Typography
                  variant="h4"
                  className={`${styles.tierName}${tier.featured ? ` ${styles.tierNameFeatured}` : ''}`}
                >
                  {tier.name}
                </Typography>
                <Typography className={styles.tierDesc}>
                  {tier.description}
                </Typography>
                <Box className={styles.priceRow}>
                  <Typography component="span" className={styles.price}>
                    {tier.price}
                  </Typography>
                  <Typography component="span" className={styles.priceNote}>
                    {tier.priceNote}
                  </Typography>
                </Box>
              </Box>

              <Box className={styles.perkList}>
                {tier.perks.map((perk) => (
                  <Box key={perk} className={styles.perkItem}>
                    <CheckCircleOutlinedIcon className={styles.perkIcon} />
                    <Typography className={styles.perkText}>
                      {perk}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Button
                variant={tier.featured ? 'contained' : 'outlined'}
                component={NextLink}
                href="/register"
                fullWidth
                className={`${styles.joinBtn}${tier.featured ? ` ${styles.joinBtnFeatured}` : ''}`}
              >
                Join Now
              </Button>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
