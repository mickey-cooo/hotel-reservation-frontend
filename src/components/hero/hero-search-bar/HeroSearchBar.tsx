'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Popover,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import styles from './HeroSearchBar.module.scss';

type SelectingStep = 'checkIn' | 'checkOut';

function formatDate(d: Dayjs | null): string | null {
  return d ? d.format('D MMM YYYY') : null;
}


export default function HeroSearchBar() {
  const [checkIn, setCheckIn] = useState<Dayjs | null>(null);
  const [checkOut, setCheckOut] = useState<Dayjs | null>(null);
  const [dateAnchor, setDateAnchor] = useState<HTMLElement | null>(null);
  const [selecting, setSelecting] = useState<SelectingStep>('checkIn');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [guestAnchor, setGuestAnchor] = useState<HTMLElement | null>(null);

  const dateOpen = Boolean(dateAnchor);

  function handleDateFieldClick(e: React.MouseEvent<HTMLDivElement>) {
    setDateAnchor(e.currentTarget);
    setSelecting('checkIn');
  }

  function handleDateSelect(date: Dayjs | null) {
    if (selecting === 'checkIn') {
      setCheckIn(date);
      if (date && checkOut && !checkOut.isAfter(date)) {
        setCheckOut(null);
      }
      setSelecting('checkOut');
    } else {
      setCheckOut(date);
      setDateAnchor(null);
    }
  }

  const calendarMinDate =
    selecting === 'checkOut' && checkIn ? checkIn.add(1, 'day') : dayjs();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={0} className={styles.searchPaper}>
        <Box className={`${styles.fieldSection} ${styles.fieldWide}`}>
          <LocationOnOutlinedIcon className={styles.fieldIcon} />
          <Box className={styles.fieldLabelBox}>
            <Typography variant="caption" className={styles.fieldCaption}>
              Location
            </Typography>
            <InputBase
              placeholder="Where are you going?"
              className={styles.fieldInput}
            />
          </Box>
        </Box>

        <Divider orientation="vertical" flexItem className={styles.fieldDivider} />

        <Box
          className={`${styles.fieldSection} ${styles.fieldNarrow} ${styles.fieldClickable}`}
          onClick={handleDateFieldClick}
        >
          <CalendarTodayOutlinedIcon className={styles.fieldIcon} />
          <Box className={styles.fieldLabelBox}>
            <Typography variant="caption" className={styles.fieldCaption}>
              Check In — Check Out
            </Typography>
            {checkIn || checkOut ? (
              <>
                <Typography className={styles.fieldTextActive}>
                  {checkIn ? checkIn.format('D MMM YYYY') : '...'}
                </Typography>
                <Typography className={styles.fieldDateSub}>
                  → {checkOut ? checkOut.format('D MMM YYYY') : '...'}
                </Typography>
              </>
            ) : (
              <Typography className={styles.fieldText}>Add dates</Typography>
            )}
          </Box>
        </Box>

        <Divider orientation="vertical" flexItem className={styles.fieldDivider} />

        <Box
          className={`${styles.fieldSection} ${styles.fieldNarrow} ${styles.fieldClickable}`}
          onClick={(e) => setGuestAnchor(e.currentTarget)}
        >
          <PeopleOutlinedIcon className={styles.fieldIcon} />
          <Box className={styles.fieldLabelBox}>
            <Typography variant="caption" className={styles.fieldCaption}>
              Guests
            </Typography>
            <Typography className={styles.fieldTextActive}>
              {adults} Adult{adults !== 1 ? 's' : ''}, {children} Child{children !== 1 ? 'ren' : ''}
            </Typography>
            <Typography className={styles.fieldDateSub}>
              {rooms} Room{rooms !== 1 ? 's' : ''}
            </Typography>
          </Box>
        </Box>

        <IconButton className={styles.searchBtn}>
          <SearchIcon />
        </IconButton>
      </Paper>

      <Popover
        open={dateOpen}
        anchorEl={dateAnchor}
        onClose={() => setDateAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{ paper: { className: styles.datePopoverPaper } }}
      >
        <Box className={styles.calendarHeader}>
          <Typography className={styles.calendarHeaderText}>
            {selecting === 'checkIn'
              ? 'Select check-in date'
              : 'Select check-out date'}
          </Typography>
          {(checkIn || checkOut) && (
            <Typography className={styles.calendarSubText}>
              {checkIn ? `Check-in: ${formatDate(checkIn)}` : ''}
              {checkIn && checkOut ? ' · ' : ''}
              {checkOut ? `Check-out: ${formatDate(checkOut)}` : ''}
            </Typography>
          )}
        </Box>
        <DateCalendar
          value={selecting === 'checkIn' ? checkIn : checkOut}
          onChange={handleDateSelect}
          minDate={calendarMinDate}
          disablePast
          className={styles.calendar}
        />
      </Popover>

      <Popover
        open={Boolean(guestAnchor)}
        anchorEl={guestAnchor}
        onClose={() => setGuestAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{ paper: { className: styles.guestPopoverPaper } }}
      >
        <Typography className={styles.guestPopoverTitle}>Guests &amp; Rooms</Typography>
        <Box className={styles.guestPopoverContent}>
          <Box className={styles.guestRow}>
            <Box className={styles.guestLabelGroup}>
              <Typography className={styles.guestLabel}>Adults</Typography>
              <Typography className={styles.guestSubLabel}>Ages 13 or above</Typography>
            </Box>
            <Box className={styles.counter}>
              <IconButton
                size="small"
                className={styles.counterBtn}
                onClick={() => setAdults((v) => Math.max(1, v - 1))}
                disabled={adults <= 1}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography className={styles.counterVal}>{adults}</Typography>
              <IconButton
                size="small"
                className={styles.counterBtn}
                onClick={() => setAdults((v) => Math.min(8, v + 1))}
                disabled={adults >= 8}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          <Box className={styles.guestRow}>
            <Box className={styles.guestLabelGroup}>
              <Typography className={styles.guestLabel}>Children</Typography>
              <Typography className={styles.guestSubLabel}>Ages 0–12</Typography>
            </Box>
            <Box className={styles.counter}>
              <IconButton
                size="small"
                className={styles.counterBtn}
                onClick={() => setChildren((v) => Math.max(0, v - 1))}
                disabled={children <= 0}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography className={styles.counterVal}>{children}</Typography>
              <IconButton
                size="small"
                className={styles.counterBtn}
                onClick={() => setChildren((v) => Math.min(6, v + 1))}
                disabled={children >= 6}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          <Box className={styles.guestRow}>
            <Typography className={styles.guestLabel}>Rooms</Typography>
            <Box className={styles.counter}>
              <IconButton
                size="small"
                className={styles.counterBtn}
                onClick={() => setRooms((v) => Math.max(1, v - 1))}
                disabled={rooms <= 1}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography className={styles.counterVal}>{rooms}</Typography>
              <IconButton
                size="small"
                className={styles.counterBtn}
                onClick={() => setRooms((v) => Math.min(8, v + 1))}
                disabled={rooms >= 8}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          <Button
            variant="contained"
            fullWidth
            className={styles.guestDoneBtn}
            onClick={() => setGuestAnchor(null)}
          >
            Done
          </Button>
        </Box>
      </Popover>
    </LocalizationProvider>
  );
}
