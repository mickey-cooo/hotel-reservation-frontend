import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import styles from './MembershipComparison.module.scss';

interface Feature {
  name: string;
  essential: boolean;
  select: boolean;
  elite: boolean;
}

const FEATURES: Feature[] = [
  { name: 'การสะสมคะแนน Reward Points', essential: true, select: true, elite: true },
  { name: 'สิทธิ์เข้าพักราคาพิเศษสมาชิก', essential: true, select: true, elite: true },
  { name: 'สิทธิ์เช็คเอาท์ได้ถึง 14:00 น.', essential: false, select: true, elite: true },
  { name: 'อัปเกรดห้องพัก (เมื่อมีห้องว่าง)', essential: false, select: false, elite: true },
  { name: 'Priority Check-in & Concierge', essential: false, select: false, elite: true },
];

type TierKey = 'essential' | 'select' | 'elite';

const TIER_DOTS: Array<{ key: TierKey; label: string; featured: boolean }> = [
  { key: 'essential', label: 'Essential', featured: false },
  { key: 'select', label: 'Select', featured: true },
  { key: 'elite', label: 'Elite', featured: false },
];

export default function MembershipComparison() {
  return (
    <Box component="section" className={styles.section}>
      <Container maxWidth="lg">
        <Box className={styles.header}>
          <Box>
            <Typography variant="h2" className={styles.sectionTitle}>
              เปรียบเทียบความแตกต่าง
            </Typography>
            <Typography className={styles.sectionSubtitle}>
              เจาะลึกทุกรายละเอียดของแต่ละระดับ เพื่อความคุ้มค่าสูงสุดสำหรับคุณ
            </Typography>
          </Box>
          <Box className={styles.legend}>
            {TIER_DOTS.map(({ key, label, featured }) => (
              <Box key={key} className={styles.legendItem}>
                <Box
                  className={`${styles.legendDot}${featured ? ` ${styles.legendDotFeatured}` : key === 'elite' ? ` ${styles.legendDotElite}` : ''}`}
                />
                <Typography className={styles.legendLabel}>{label}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box className={styles.tableWrapper}>
          <Table className={styles.table}>
            <TableHead>
              <TableRow className={styles.tableHeadRow}>
                <TableCell className={`${styles.tableCell} ${styles.tableCellFeature}`}>
                  สิทธิประโยชน์
                </TableCell>
                <TableCell className={`${styles.tableCell} ${styles.tableCellTier}`}>
                  Essential
                </TableCell>
                <TableCell className={`${styles.tableCell} ${styles.tableCellTier} ${styles.tableCellTierSelect}`}>
                  Select
                </TableCell>
                <TableCell className={`${styles.tableCell} ${styles.tableCellTier}`}>
                  Elite
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {FEATURES.map((feature) => (
                <TableRow key={feature.name} className={styles.tableRow}>
                  <TableCell className={`${styles.tableCell} ${styles.tableCellFeatureName}`}>
                    {feature.name}
                  </TableCell>
                  {TIER_DOTS.map(({ key, featured }) => (
                    <TableCell
                      key={key}
                      className={`${styles.tableCell} ${styles.tableCellCheck}`}
                    >
                      {feature[key] ? (
                        <CheckIcon
                          className={`${styles.checkIcon}${featured ? ` ${styles.checkIconFeatured}` : ''}`}
                        />
                      ) : (
                        <span className={styles.dash}>—</span>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Container>
    </Box>
  );
}
