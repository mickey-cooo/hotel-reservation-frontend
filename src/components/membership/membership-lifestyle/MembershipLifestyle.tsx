import { Box, Typography } from '@mui/material';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import styles from './MembershipLifestyle.module.scss';

export default function MembershipLifestyle() {
  return (
    <Box component="section" className={styles.section}>
      <Box className={styles.textSide}>
        <Typography variant="h3" className={styles.title}>
          มากกว่าแค่ที่พัก แต่คือรางวัลของชีวิต
        </Typography>
        <Typography className={styles.description}>
          สัมผัสไลฟ์สไตล์ระดับพรีเมียมที่ถูกออกแบบมาเพื่อคุณ ไม่ว่าจะเป็นดินเนอร์สุดหรูริมหาด
          หรือการเดินทางด้วยเครื่องบินเจ็ทส่วนตัว
        </Typography>
        <Box className={styles.trustRow}>
          <VerifiedUserOutlinedIcon className={styles.trustIcon} />
          <Typography className={styles.trustText}>
            ความปลอดภัยและความเป็นส่วนตัวสูงสุด
          </Typography>
        </Box>
      </Box>

      <Box className={styles.imageSide}>
        <Box
          component="img"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-VZEHyn0jxeemKFzhGDwtfJEuMXtu1Qw4Va2DR2eoWZSd26LfSg8FGfSINcMr8sjAo2chJ3rxW_V5SzjFv00fzx2pgfzEGE-quYqR5ISyU5bldnFeTlm5oZAANpvyqGUfnfhkaZ0xXGl9ci9oGf2nmby_WY1vnfyp36n1JyYu2t2ktTef9_Gfl0Zs1uxbGj5dVE-9vRmCR8bRKZqZRG4USHl87sCFwK1F4eUsDlcCzkbquxXhBzbOvpVvr1F1QaG3w75xIDl6vYAP"
          alt="Luxury lifestyle breakfast on terrace"
          className={styles.image}
        />
      </Box>
    </Box>
  );
}
