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
import { useTranslation } from 'react-i18next';
import styles from '@/components/destinations/destinations-hero/DestinationsHero.module.scss';

type SelectingStep = 'checkIn' | 'checkOut';

function formatDate(d: Dayjs | null): string | null {
  return d ? d.format('D MMM YYYY') : null;
}

export interface DestinationsSearchValues {
  location: string;
  checkIn: string | null;
  checkOut: string | null;
  adults: number;
  children: number;
  rooms: number;
}

interface DestinationsSearchBarProps {
  initialLocation?: string;
  initialCheckIn?: string | null;
  initialCheckOut?: string | null;
  initialAdults?: number;
  initialChildren?: number;
  initialRooms?: number;
  onSearch: (values: DestinationsSearchValues) => void;
}

export default function DestinationsSearchBar({
  initialLocation = '',
  initialCheckIn = null,
  initialCheckOut = null,
  initialAdults = 1,
  initialChildren = 0,
  initialRooms = 1,
  onSearch,
}: DestinationsSearchBarProps) {
  const { t } = useTranslation('destinations');
  const [location, setLocation] = useState(initialLocation);
  const [checkIn, setCheckIn] = useState<Dayjs | null>(
    initialCheckIn ? dayjs(initialCheckIn) : null,
  );
  const [checkOut, setCheckOut] = useState<Dayjs | null>(
    initialCheckOut ? dayjs(initialCheckOut) : null,
  );
  const [dateAnchor, setDateAnchor] = useState<HTMLElement | null>(null);
  const [selecting, setSelecting] = useState<SelectingStep>('checkIn');
  const [adults, setAdults] = useState(initialAdults);
  const [children, setChildren] = useState(initialChildren);
  const [rooms, setRooms] = useState(initialRooms);
  const [guestAnchor, setGuestAnchor] = useState<HTMLElement | null>(null);

  function handleSearch() {
    onSearch({
      location: location.trim(),
      checkIn: checkIn ? checkIn.format('YYYY-MM-DD') : null,
      checkOut: checkOut ? checkOut.format('YYYY-MM-DD') : null,
      adults,
      children,
      rooms,
    });
  }

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
          <Box className={`${styles.BoxFieldLabel}`}>
            <Typography
              variant="caption"
              className={`${styles.fieldLabel} ${styles.fieldCaption}`}
            >
              {t('search.location')}
            </Typography>
            <InputBase
              placeholder={t('search.locationPlaceholder')}
              className={styles.fieldInput}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
            />
          </Box>
        </Box>

        <Divider
          orientation="vertical"
          flexItem
          className={styles.fieldDivider}
        />

        <Box
          className={`${styles.fieldSection} ${styles.fieldNarrow} ${styles.fieldClickable}`}
          onClick={handleDateFieldClick}
        >
          <CalendarTodayOutlinedIcon className={styles.fieldIcon} />
          <Box>
            <Typography
              variant="caption"
              className={`${styles.fieldLabel} ${styles.fieldCaption}`}
            >
              {t('search.dates')}
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
              <Typography className={styles.fieldText}>{t('search.addDates')}</Typography>
            )}
          </Box>
        </Box>

        <Divider
          orientation="vertical"
          flexItem
          className={styles.fieldDivider}
        />

        <Box
          className={`${styles.fieldSection} ${styles.fieldNarrow} ${styles.fieldClickable}`}
          onClick={(e) => setGuestAnchor(e.currentTarget)}
        >
          <PeopleOutlinedIcon className={styles.fieldIcon} />
          <Box className={styles.BoxFieldLabel}>
            <Typography
              variant="caption"
              className={`${styles.fieldLabel} ${styles.fieldCaption}`}
            >
              {t('search.guests')}
            </Typography>
            <Typography className={styles.fieldTextActive}>
              {adults} {adults !== 1 ? t('search.adultsPlural') : t('search.adult')},{' '}
              {children} {children !== 1 ? t('search.childrenPlural') : t('search.child')}
            </Typography>
            <Typography className={styles.fieldDateSub}>
              {rooms} {rooms !== 1 ? t('search.roomsPlural') : t('search.room')}
            </Typography>
          </Box>
        </Box>

        <IconButton className={styles.searchButton} onClick={handleSearch}>
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
              ? t('search.selectCheckIn')
              : t('search.selectCheckOut')}
          </Typography>
          {(checkIn || checkOut) && (
            <Typography className={styles.calendarSubText}>
              {checkIn ? `${t('search.checkInLabel')}: ${formatDate(checkIn)}` : ''}
              {checkIn && checkOut ? ' · ' : ''}
              {checkOut ? `${t('search.checkOutLabel')}: ${formatDate(checkOut)}` : ''}
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
        <Typography className={styles.guestPopoverTitle}>{t('search.guestsAndRooms')}</Typography>
        <Box className={styles.guestPopoverContent}>
          <Box className={styles.guestRow}>
            <Box className={styles.guestLabelGroup}>
              <Typography className={styles.guestLabel}>{t('search.adults')}</Typography>
              <Typography className={styles.guestSubLabel}>{t('search.adultsAgeNote')}</Typography>
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
              <Typography className={styles.guestLabel}>{t('search.children')}</Typography>
              <Typography className={styles.guestSubLabel}>{t('search.childrenAgeNote')}</Typography>
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
            <Typography className={styles.guestLabel}>{t('search.rooms')}</Typography>
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
            {t('search.done')}
          </Button>
        </Box>
      </Popover>
    </LocalizationProvider>
  );
}
