'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Breadcrumb from '@/components/breadcrumb/Breadcrumb';
import ReviewPageCard from '@/components/hotel-detail/review-page-card/ReviewPageCard';
import type { HotelDetail } from '@/lib/hotel-data';
import styles from './ReviewsPageContent.module.scss';

const AVATAR_COLORS = ['#C5A059', '#3B82F6', '#10B981', '#8B5CF6', '#EF4444', '#F97316'];
const PAGE_SIZE = 3;

type SortOrder = 'latest' | 'highest' | 'lowest';

interface ReviewsPageContentProps {
  hotel: HotelDetail;
}

function getCategoryScores(rating: number) {
  const c = (n: number) => Math.min(5, Math.max(1, +n.toFixed(1)));
  return [
    { label: 'Cleanliness', score: c(rating * 0.95) },
    { label: 'Service',     score: c(rating * 1.02) },
    { label: 'Location',    score: c(rating * 0.98) },
    { label: 'Value',       score: c(rating * 0.93) },
    { label: 'Facilities',  score: c(rating * 0.95) },
  ];
}

function buildPageItems(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const items: (number | '...')[] = [1];
  if (current > 3) items.push('...');
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) items.push(i);
  if (current < total - 2) items.push('...');
  items.push(total);
  return items;
}

export default function ReviewsPageContent({ hotel }: ReviewsPageContentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('latest');
  const [page, setPage] = useState(1);

  let filtered = hotel.reviews;
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (r) => r.author.toLowerCase().includes(q) || r.comment.toLowerCase().includes(q),
    );
  }
  if (sortOrder === 'highest') filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  if (sortOrder === 'lowest')  filtered = [...filtered].sort((a, b) => a.rating - b.rating);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageReviews = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const categories = getCategoryScores(hotel.rating);

  return (
    <Box className={styles.page}>
      <Container maxWidth="lg">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Destinations', href: '/destinations' },
            { label: hotel.name, href: `/destinations/${hotel.id}` },
            { label: 'All Reviews' },
          ]}
        />

        <Box className={styles.pageHeader}>
          <Typography variant="h3" className={styles.pageTitle}>
            Guest Experiences
          </Typography>
          <Typography className={styles.pageSubtitle}>
            Discover why discerning travelers choose Lumina Stay for their most precious
            moments. Real stories from our global community.
          </Typography>
        </Box>

        <Box className={styles.layout}>
          {/* ── Sidebar ── */}
          <Box className={styles.sidebar}>
            <Box className={styles.ratingBox}>
              <Typography className={styles.ratingNumber}>
                {hotel.rating.toFixed(1)}
              </Typography>
              <Box className={styles.ratingStars}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`${styles.star}${
                      i < Math.round(hotel.rating) ? ` ${styles.starFilled}` : ` ${styles.starEmpty}`
                    }`}
                  />
                ))}
              </Box>
              <Typography className={styles.ratingLabel}>
                Based on {hotel.reviewCount.toLocaleString()} reviews
              </Typography>

              <Box className={styles.categoryDivider} />

              {categories.map(({ label, score }) => (
                <Box key={label} className={styles.categoryRow}>
                  <Typography className={styles.categoryLabel}>{label}</Typography>
                  <Box className={styles.barTrack}>
                    <Box
                      className={styles.barFill}
                      style={{ width: `${(score / 5) * 100}%` }}
                    />
                  </Box>
                  <Typography className={styles.categoryScore}>{score.toFixed(1)}</Typography>
                </Box>
              ))}
            </Box>

            <Box className={styles.filterBox}>
              <Typography className={styles.filterTitle}>Filter Reviews</Typography>
              <Box className={styles.searchField}>
                <SearchIcon className={styles.searchIcon} />
                <InputBase
                  fullWidth
                  placeholder="Search within reviews…"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(1);
                  }}
                  className={styles.searchInput}
                />
              </Box>
              <Select<SortOrder>
                fullWidth
                size="small"
                value={sortOrder}
                onChange={(e) => {
                  setSortOrder(e.target.value);
                  setPage(1);
                }}
                className={styles.sortSelect}
              >
                <MenuItem value="latest">Latest Reviews</MenuItem>
                <MenuItem value="highest">Highest Rated</MenuItem>
                <MenuItem value="lowest">Lowest Rated</MenuItem>
              </Select>
            </Box>
          </Box>

          {/* ── Main ── */}
          <Box className={styles.main}>
            {pageReviews.length > 0 ? (
              <Box className={styles.reviewsList}>
                {pageReviews.map((review, index) => (
                  <ReviewPageCard
                    key={review.id}
                    review={review}
                    avatarColor={
                      AVATAR_COLORS[
                        ((currentPage - 1) * PAGE_SIZE + index) % AVATAR_COLORS.length
                      ]
                    }
                  />
                ))}
              </Box>
            ) : (
              <Box className={styles.emptyState}>
                <Typography className={styles.emptyText}>
                  No reviews match your search.
                </Typography>
              </Box>
            )}

            {totalPages > 1 && (
              <Box className={styles.pagination}>
                <IconButton
                  className={styles.pageArrow}
                  disabled={currentPage === 1}
                  onClick={() => setPage(currentPage - 1)}
                >
                  <ChevronLeftIcon />
                </IconButton>

                {buildPageItems(currentPage, totalPages).map((item, i) =>
                  item === '...' ? (
                    <Typography key={`ellipsis-${i}`} className={styles.pageEllipsis}>
                      …
                    </Typography>
                  ) : (
                    <Box
                      key={item}
                      component="button"
                      className={`${styles.pageNum}${
                        currentPage === item ? ` ${styles.pageNumActive}` : ''
                      }`}
                      onClick={() => setPage(item as number)}
                    >
                      {item}
                    </Box>
                  ),
                )}

                <IconButton
                  className={styles.pageArrow}
                  disabled={currentPage === totalPages}
                  onClick={() => setPage(currentPage + 1)}
                >
                  <ChevronRightIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
