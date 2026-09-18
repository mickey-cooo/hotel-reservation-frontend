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
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '@/components/breadcrumb/Breadcrumb';
import type { HotelDetail } from '@/models/entity/hotel/hotel.model';
import styles from './ReviewsPageContent.module.scss';

const AVATAR_COLORS = ['#C5A059', '#3B82F6', '#10B981', '#8B5CF6', '#EF4444', '#F97316'];
const PAGE_SIZE = 3;

type SortOrder = 'latest' | 'highest' | 'lowest';

interface ReviewsPageContentProps {
  hotel: HotelDetail;
}

const CATEGORY_KEYS = ['Cleanliness', 'Service', 'Location', 'Value', 'Facilities'] as const;

function getCategoryScores(rating: number) {
  const c = (n: number) => Math.min(5, Math.max(0, +n.toFixed(1)));
  const multipliers: Record<(typeof CATEGORY_KEYS)[number], number> = {
    Cleanliness: 0.95,
    Service: 1.02,
    Location: 0.98,
    Value: 0.93,
    Facilities: 0.95,
  };
  return CATEGORY_KEYS.map((key) => ({ key, score: c(rating * multipliers[key]) }));
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
  const { t } = useTranslation(['hotelDetail', 'common']);
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
            { label: t('common:nav.home'), href: '/' },
            { label: t('common:nav.destinations'), href: '/destinations' },
            { label: hotel.name, href: `/destinations/${hotel.id}` },
            { label: t('hotelDetail:reviewsPage.allReviews') },
          ]}
        />

        <Box className={styles.pageHeader}>
          <Typography variant="h3" className={styles.pageTitle}>
            {t('hotelDetail:reviewsPage.title')}
          </Typography>
          <Typography className={styles.pageSubtitle}>
            {t('hotelDetail:reviewsPage.subtitle')}
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
                {t('hotelDetail:reviewsPage.basedOn', { n: hotel.reviewCount.toLocaleString() })}
              </Typography>

              <Box className={styles.categoryDivider} />

              {categories.map(({ key, score }) => (
                <Box key={key} className={styles.categoryRow}>
                  <Typography className={styles.categoryLabel}>
                    {t(`hotelDetail:reviewsPage.categories.${key}`)}
                  </Typography>
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
              <Typography className={styles.filterTitle}>{t('hotelDetail:reviewsPage.filterTitle')}</Typography>
              <Box className={styles.searchField}>
                <SearchIcon className={styles.searchIcon} />
                <InputBase
                  fullWidth
                  placeholder={t('hotelDetail:reviewsPage.searchPlaceholder')}
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
                <MenuItem value="latest">{t('hotelDetail:reviewsPage.sortLatest')}</MenuItem>
                <MenuItem value="highest">{t('hotelDetail:reviewsPage.sortHighest')}</MenuItem>
                <MenuItem value="lowest">{t('hotelDetail:reviewsPage.sortLowest')}</MenuItem>
              </Select>
            </Box>
          </Box>

          {/* ── Main ── */}
          <Box className={styles.main}>
            {pageReviews.length > 0 ? (
              <Box className={styles.reviewsList}>
                {pageReviews.map((review, index) => {
                  const author = t(`hotelDetail:reviewAuthor.${review.author}`, { defaultValue: review.author });
                  const avatarColor =
                    AVATAR_COLORS[
                      ((currentPage - 1) * PAGE_SIZE + index) % AVATAR_COLORS.length
                    ];
                  return (
                    <Box key={review.id} className={styles.reviewCard}>
                      <Box className={styles.reviewCardHeader}>
                        <Box className={styles.avatar} style={{ background: avatarColor }}>
                          <Typography className={styles.avatarInitial}>
                            {author.charAt(0)}
                          </Typography>
                        </Box>

                        <Box className={styles.meta}>
                          <Typography className={styles.authorName}>{author}</Typography>
                          <Box className={styles.metaRow}>
                            <Typography className={styles.stayDate}>
                              {t('hotelDetail:reviewsPage.stayedIn', { date: review.date })}
                            </Typography>
                            <Box className={styles.verifiedBadge}>
                              <Typography className={styles.verifiedText}>
                                {t('hotelDetail:reviewsPage.verifiedStay')}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>

                        <Box className={styles.reviewStars}>
                          {Array.from({ length: 5 }).map((_, i) =>
                            i < review.rating ? (
                              <StarIcon key={i} className={styles.reviewStarFilled} />
                            ) : (
                              <StarBorderIcon key={i} className={styles.reviewStarEmpty} />
                            ),
                          )}
                        </Box>
                      </Box>

                      <Typography className={styles.comment}>{review.comment}</Typography>

                      {review.photos && review.photos.length > 0 && (
                        <Box className={styles.photos}>
                          {review.photos.map((src, i) => (
                            <Box
                              key={i}
                              component="img"
                              src={src}
                              alt={`Review photo ${i + 1}`}
                              className={styles.photo}
                            />
                          ))}
                        </Box>
                      )}

                      <Box className={styles.actions}>
                        <Box className={styles.actionBtn}>
                          <ThumbUpOutlinedIcon className={styles.actionIcon} />
                          <Typography className={styles.actionLabel}>
                            {t('hotelDetail:reviewsPage.helpful', { n: review.helpfulCount ?? 0 })}
                          </Typography>
                        </Box>
                        <Box className={styles.actionBtn}>
                          <ChatBubbleOutlineIcon className={styles.actionIcon} />
                          <Typography className={styles.actionLabel}>
                            {t('hotelDetail:reviewsPage.comment')}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            ) : (
              <Box className={styles.emptyState}>
                <Typography className={styles.emptyText}>
                  {t('hotelDetail:reviewsPage.noMatch')}
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
