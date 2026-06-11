'use client';

import {
  Box,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import styles from '@/components/destinations/destinations-hero/DestinationsHero.module.scss';

export default function DestinationsSearchBar() {
  return (
    <Paper elevation={0} className={styles.searchPaper}>
      <Box className={`${styles.fieldSection} ${styles.fieldWide}`}>
        <LocationOnOutlinedIcon className={styles.fieldIcon} />
        <Box className={`${styles.BoxFieldLabel}`}>
          <Typography
            variant="caption"
            className={`${styles.fieldLabel} ${styles.fieldCaption}`}
          >
            LOCATION
          </Typography>
          <InputBase placeholder="Where to?" className={styles.fieldInput} />
        </Box>
      </Box>

      <Divider
        orientation="vertical"
        flexItem
        className={styles.fieldDivider}
      />

      <Box className={`${styles.fieldSection} ${styles.fieldNarrow}`}>
        <CalendarTodayOutlinedIcon className={styles.fieldIcon} />
        <Box>
          <Typography
            variant="caption"
            className={`${styles.fieldLabel} ${styles.fieldCaption}`}
          >
            DATES
          </Typography>
          <Typography className={styles.fieldText}>Add dates</Typography>
        </Box>
      </Box>

      <Divider
        orientation="vertical"
        flexItem
        className={styles.fieldDivider}
      />

      <Box className={`${styles.fieldSection} ${styles.fieldNarrow}`}>
        <PeopleOutlinedIcon className={styles.fieldIcon} />
        <Box>
          <Typography
            variant="caption"
            className={`${styles.fieldLabel} ${styles.fieldCaption}`}
          >
            GUESTS
          </Typography>
          <Typography className={styles.fieldText}>Add guests</Typography>
        </Box>
      </Box>

      <IconButton className={styles.searchButton}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
