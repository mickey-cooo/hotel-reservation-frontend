'use client';

import { Box, Divider, IconButton, InputBase, Paper, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import styles from './HeroSearchBar.module.scss';

export default function HeroSearchBar() {
  return (
    <Paper elevation={0} className={styles.searchPaper}>
      <Box className={`${styles.fieldSection} ${styles.fieldWide}`}>
        <LocationOnOutlinedIcon className={styles.fieldIcon} />
        <Box className={styles.fieldLabelBox}>
          <Typography variant="caption" className={styles.fieldCaption}>
            Location
          </Typography>
          <InputBase placeholder="Where are you going?" className={styles.fieldInput} />
        </Box>
      </Box>

      <Divider orientation="vertical" flexItem className={styles.fieldDivider} />

      <Box className={`${styles.fieldSection} ${styles.fieldNarrow}`}>
        <CalendarTodayOutlinedIcon className={styles.fieldIcon} />
        <Box className={styles.fieldLabelBox}>
          <Typography variant="caption" className={styles.fieldCaption}>
            Check In — Check Out
          </Typography>
          <Typography className={styles.fieldText}>Add dates</Typography>
        </Box>
      </Box>

      <Divider orientation="vertical" flexItem className={styles.fieldDivider} />

      <Box className={`${styles.fieldSection} ${styles.fieldNarrow}`}>
        <PeopleOutlinedIcon className={styles.fieldIcon} />
        <Box className={styles.fieldLabelBox}>
          <Typography variant="caption" className={styles.fieldCaption}>
            Guests
          </Typography>
          <Typography className={styles.fieldText}>2 Adults, 1 Room</Typography>
        </Box>
      </Box>

      <IconButton className={styles.searchBtn}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
