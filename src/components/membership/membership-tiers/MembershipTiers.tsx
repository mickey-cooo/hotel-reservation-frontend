'use client';

import { Box, Button, Container, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import StarIcon from '@mui/icons-material/Star';
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
  elite: boolean;
  badge?: string;
  perks: string[];
  btnLabel: string;
}

const TIERS: Tier[] = [
  {
    id: 'essential',
    level: 'Entry Level',
    name: 'Essential',
    description: 'พื้นฐานแห่งความสบาย ให้คุณเริ่มสะสมความสุขตั้งแต่วันแรกที่เดินทาง',
    price: 'ฟรี',
    priceNote: 'ตลอดชีพ',
    featured: false,
    elite: false,
    btnLabel: 'สมัครสมาชิกฟรี',
    perks: [
      'บริการ Wi-Fi ความเร็วสูงฟรี',
      'สะสมคะแนน Reward Points ทุกการเข้าพัก',
      'สิทธิ์เข้าพักในราคาพิเศษสำหรับสมาชิก',
    ],
  },
  {
    id: 'select',
    level: 'Most Popular',
    name: 'Select',
    description: 'ยกระดับมาตรฐานการพักผ่อนด้วยบริการเสริมที่คัดสรรมาอย่างดีเยี่ยม',
    price: '฿15,000',
    priceNote: '/ ปี',
    featured: true,
    elite: false,
    badge: 'Recommended',
    btnLabel: 'สมัครสมาชิก Select',
    perks: [
      'สิทธิ์เช็คเอาท์ล่าช้าได้ถึง 14:00 น.',
      'ของขวัญต้อนรับพิเศษ (Welcome Amenity)',
      'ส่วนลด 10% สำหรับสปาและห้องอาหาร',
      'โบนัสคะแนนสะสมเพิ่มขึ้น 25%',
    ],
  },
  {
    id: 'elite',
    level: 'The Ultimate',
    name: 'Elite',
    description: 'ที่สุดแห่งเอกสิทธิ์เฉพาะบุคคล เพื่อประสบการณ์ที่เหนือระดับในทุกมิติ',
    price: '฿45,000',
    priceNote: '/ ปี',
    featured: false,
    elite: true,
    btnLabel: 'สมัครสมาชิก Elite',
    perks: [
      'อัปเกรดห้องพักโดยอัตโนมัติ (ตามสิทธิ์)',
      'บริการผู้ช่วยส่วนตัว (Concierge) 24/7',
      'เข้าใช้ Exclusive Lounge ได้ทั่วโลก',
      'สิทธิ์สำรองที่พักล่วงหน้าเป็นกรณีพิเศษ',
      'รับบริการสปาทรีทเมนท์ฟรี 1 ครั้ง/ปี',
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
            เลือกแผนการเข้าพักที่ตรงใจ และเริ่มสะสมคะแนนเพื่อแลกรับประสบการณ์อันทรงคุณค่า
            ที่คัดสรรมาเป็นพิเศษสำหรับสมาชิก Lumina Stay เท่านั้น
          </Typography>
        </Box>

        <Box className={styles.grid}>
          {TIERS.map((tier) => {
            const cardClass = [
              styles.card,
              tier.featured ? styles.cardFeatured : '',
              tier.elite ? styles.cardElite : '',
            ]
              .filter(Boolean)
              .join(' ');

            const PerkIcon = tier.elite ? StarIcon : CheckIcon;

            return (
              <Box key={tier.id} className={cardClass}>
                {tier.badge && (
                  <span className={styles.recommendedBadge}>{tier.badge}</span>
                )}

                <Box className={styles.cardTop}>
                  <Typography
                    className={`${styles.levelLabel}${tier.elite ? ` ${styles.levelLabelElite}` : ''}`}
                  >
                    {tier.level}
                  </Typography>
                  <Typography
                    variant="h4"
                    className={`${styles.tierName}${tier.elite ? ` ${styles.tierNameElite}` : ''}`}
                  >
                    {tier.name}
                  </Typography>
                  <Box className={styles.priceRow}>
                    <Typography
                      component="span"
                      className={`${styles.price}${tier.elite ? ` ${styles.priceElite}` : ''}`}
                    >
                      {tier.price}
                    </Typography>
                    <Typography
                      component="span"
                      className={`${styles.priceNote}${tier.elite ? ` ${styles.priceNoteElite}` : ''}`}
                    >
                      {tier.priceNote}
                    </Typography>
                  </Box>
                  <Typography
                    className={`${styles.tierDesc}${tier.elite ? ` ${styles.tierDescElite}` : ''}`}
                  >
                    {tier.description}
                  </Typography>
                </Box>

                <Box className={styles.perkList}>
                  {tier.perks.map((perk) => (
                    <Box key={perk} className={styles.perkItem}>
                      <PerkIcon
                        className={`${styles.perkIcon}${tier.elite ? ` ${styles.perkIconElite}` : ''}`}
                      />
                      <Typography
                        className={`${styles.perkText}${tier.elite ? ` ${styles.perkTextElite}` : ''}`}
                      >
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
                  className={`${styles.joinBtn}${tier.featured ? ` ${styles.joinBtnFeatured}` : ''}${tier.elite ? ` ${styles.joinBtnElite}` : ''}`}
                >
                  {tier.btnLabel}
                </Button>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
