import type { Hotel } from '@/components/destinations/hotel-card/HotelCard';

export interface Room {
  id: string;
  name: string;
  badge?: 'BESTSELLER' | 'FEATURED';
  capacity: { adults: number; children: number };
  sizeSqm: number;
  features: string[];
  price: number;
  imageUrl: string;
}

export interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  comment: string;
}

export interface HotelDetail extends Hotel {
  description: string;
  reviewCount: number;
  galleryImages: string[];
  amenities: string[];
  rooms: Room[];
  reviews: Review[];
}

export const HOTEL_DETAILS: HotelDetail[] = [
  {
    id: '1',
    badge: 'TRENDING',
    name: 'Villa Al Mare',
    location: 'Amalfi, Italy',
    rating: 4.9,
    price: 850,
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80',
    description:
      'Perched above the turquoise waters of the Amalfi Coast, Villa Al Mare is a timeless retreat where Italian elegance meets the breathtaking Mediterranean. Every suite offers panoramic views of the sea, while our private terraces and lush gardens invite you to slow down and savour the extraordinary.',
    reviewCount: 214,
    galleryImages: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
      'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=600&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80',
    ],
    amenities: ['Free WiFi', 'Infinity Pool', 'Luxury Spa', 'Restaurant', 'Private Terrace', 'Concierge'],
    rooms: [
      {
        id: 'r1',
        name: 'Sea View Suite',
        badge: 'BESTSELLER',
        capacity: { adults: 2, children: 1 },
        sizeSqm: 48,
        features: ['Panoramic sea view', 'King-size bed', 'Rainfall shower'],
        price: 850,
        imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80',
      },
      {
        id: 'r2',
        name: 'Clifftop Penthouse',
        badge: 'FEATURED',
        capacity: { adults: 4, children: 2 },
        sizeSqm: 120,
        features: ['Private rooftop terrace', '2 bedrooms', 'Butler service', '24h room service'],
        price: 1800,
        imageUrl: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=400&q=80',
      },
    ],
    reviews: [
      {
        id: 'rev1',
        author: 'Charlotte B.',
        date: 'March 2024',
        rating: 5,
        comment:
          'Absolutely magical. Woke up every morning to the most spectacular view. The staff made us feel like royalty — we never wanted to leave.',
      },
      {
        id: 'rev2',
        author: 'Marco R.',
        date: 'February 2024',
        rating: 5,
        comment:
          'The best hotel experience of my life. Perfect blend of luxury and authentic Italian character. The food at the restaurant is outstanding.',
      },
      {
        id: 'rev3',
        author: 'Sofia L.',
        date: 'January 2024',
        rating: 4,
        comment:
          'Stunning views and impeccable service. The infinity pool is a dream. Would highly recommend the Sea View Suite.',
      },
      {
        id: 'rev4',
        author: 'James W.',
        date: 'December 2023',
        rating: 5,
        comment:
          'We celebrated our anniversary here and it was beyond perfect. Romantic atmosphere, incredible food, and the most attentive staff.',
      },
    ],
  },
  {
    id: '2',
    badge: 'FEATURED',
    name: 'The Gilt Regency',
    location: 'London, UK',
    rating: 4.8,
    price: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
    description:
      'A jewel in the heart of Mayfair, The Gilt Regency marries Victorian grandeur with contemporary refinement. Gilded corridors lead to sumptuous rooms and suites, while our award-winning restaurant and cocktail bar set the standard for London dining.',
    reviewCount: 189,
    galleryImages: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600&q=80',
    ],
    amenities: ['Free WiFi', 'Fine Dining', 'Cocktail Bar', 'Fitness Centre', 'Concierge', 'Valet Parking'],
    rooms: [
      {
        id: 'r1',
        name: 'Regency Classic Room',
        badge: 'BESTSELLER',
        capacity: { adults: 2, children: 0 },
        sizeSqm: 38,
        features: ['City view', 'King-size bed', 'Marble bathroom'],
        price: 1200,
        imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80',
      },
      {
        id: 'r2',
        name: 'Mayfair Suite',
        badge: 'FEATURED',
        capacity: { adults: 2, children: 2 },
        sizeSqm: 90,
        features: ['Separate living room', 'Victorian fireplace', 'Bespoke butler', 'Afternoon tea daily'],
        price: 2800,
        imageUrl: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=400&q=80',
      },
    ],
    reviews: [
      {
        id: 'rev1',
        author: 'Elizabeth H.',
        date: 'April 2024',
        rating: 5,
        comment:
          'The grandeur of this hotel is unmatched. Victorian architecture perfectly paired with modern luxury. The butler service is exceptional.',
      },
      {
        id: 'rev2',
        author: 'Thomas A.',
        date: 'March 2024',
        rating: 5,
        comment: 'London does not get better than this. Central location, phenomenal staff, and the cocktail bar is a destination in itself.',
      },
      {
        id: 'rev3',
        author: 'Priya S.',
        date: 'February 2024',
        rating: 4,
        comment: 'Elegant in every detail. The restaurant deserves every star. The room was beautifully appointed and incredibly comfortable.',
      },
      {
        id: 'rev4',
        author: 'Henry F.',
        date: 'January 2024',
        rating: 5,
        comment: 'A true London institution. The Mayfair Suite is worth every penny — we will be back for our next anniversary without question.',
      },
    ],
  },
  {
    id: '3',
    name: 'Azure Sanctuary',
    location: 'Bali, Indonesia',
    rating: 5.0,
    price: 950,
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80',
    description:
      "Nestled within ancient rice terraces and lush tropical gardens, Azure Sanctuary is Bali's most serene escape. Private villas with plunge pools, open-air pavilions, and award-winning spa treatments guided by centuries-old Balinese healing traditions.",
    reviewCount: 302,
    galleryImages: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80',
      'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=600&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
      'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=600&q=80',
    ],
    amenities: ['Free WiFi', 'Private Plunge Pool', 'Luxury Spa', 'Yoga Pavilion', 'Restaurant', 'Airport Transfer'],
    rooms: [
      {
        id: 'r1',
        name: 'Garden Villa',
        badge: 'BESTSELLER',
        capacity: { adults: 2, children: 1 },
        sizeSqm: 80,
        features: ['Private plunge pool', 'Rice terrace view', 'Open-air bathroom', 'Daily breakfast'],
        price: 950,
        imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80',
      },
      {
        id: 'r2',
        name: 'Jungle Estate Villa',
        capacity: { adults: 4, children: 2 },
        sizeSqm: 200,
        features: ['3 bedrooms', 'Private pool', 'Full kitchen', 'Dedicated butler', 'Daily spa treatment'],
        price: 3200,
        imageUrl: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=400&q=80',
      },
    ],
    reviews: [
      {
        id: 'rev1',
        author: 'Sarah M.',
        date: 'April 2024',
        rating: 5,
        comment: 'Pure paradise. Waking up to the sound of the jungle with a private pool — there is simply nothing like it in the world.',
      },
      {
        id: 'rev2',
        author: 'David K.',
        date: 'March 2024',
        rating: 5,
        comment:
          'The spa treatments were truly transformative. The team draws on ancient Balinese traditions that you will not find anywhere else.',
      },
      {
        id: 'rev3',
        author: 'Anna T.',
        date: 'February 2024',
        rating: 5,
        comment: 'Best honeymoon decision ever. The attention to detail is extraordinary — rose petals on arrival, private dinner by the pool.',
      },
      {
        id: 'rev4',
        author: 'Michael P.',
        date: 'January 2024',
        rating: 5,
        comment: 'An absolute 10 out of 10. The breakfast, the views, the people — everything was flawless. We are already planning our return.',
      },
    ],
  },
  {
    id: '4',
    name: 'Urban Luxe Penthouse',
    location: 'New York, USA',
    rating: 4.7,
    price: 1500,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80',
    description:
      "Rising above the Manhattan skyline, Urban Luxe Penthouse redefines city living. Floor-to-ceiling glass, rooftop terraces overlooking Central Park, and an in-house sommelier bring New York's electric energy into a sanctuary of refined calm.",
    reviewCount: 156,
    galleryImages: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80',
    ],
    amenities: ['Free WiFi', 'Rooftop Terrace', 'In-house Sommelier', 'Fitness Studio', 'Concierge', 'Valet Parking'],
    rooms: [
      {
        id: 'r1',
        name: 'Skyline Studio',
        badge: 'BESTSELLER',
        capacity: { adults: 2, children: 0 },
        sizeSqm: 55,
        features: ['Floor-to-ceiling windows', 'City panorama', 'Rain shower', 'Nespresso machine'],
        price: 1500,
        imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80',
      },
      {
        id: 'r2',
        name: 'Central Park Penthouse',
        badge: 'FEATURED',
        capacity: { adults: 4, children: 2 },
        sizeSqm: 250,
        features: ['Private rooftop terrace', 'Central Park views', '3 bedrooms', 'Personal chef available'],
        price: 5500,
        imageUrl: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=400&q=80',
      },
    ],
    reviews: [
      {
        id: 'rev1',
        author: 'Lauren C.',
        date: 'April 2024',
        rating: 5,
        comment: 'Waking up to Central Park from a penthouse terrace is a bucket-list experience. Worth every cent for a special occasion.',
      },
      {
        id: 'rev2',
        author: 'Robert N.',
        date: 'March 2024',
        rating: 4,
        comment:
          'Exceptional location and stunning design. The sommelier curated a wine pairing dinner for us that was one of the best meals of our lives.',
      },
      {
        id: 'rev3',
        author: 'Jessica T.',
        date: 'February 2024',
        rating: 5,
        comment: 'The best way to experience New York. Everything is steps from Central Park and the views at sunset are simply breathtaking.',
      },
      {
        id: 'rev4',
        author: 'Daniel M.',
        date: 'January 2024',
        rating: 4,
        comment:
          'Impeccably designed and supremely comfortable. The concierge secured impossible dinner reservations — that is the real luxury here.',
      },
    ],
  },
  {
    id: '5',
    badge: 'EXCLUSIVE',
    name: 'The Heritage Estate',
    location: 'Provence, France',
    rating: 4.9,
    price: 2100,
    imageUrl: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=80',
    description:
      "Set among rolling lavender fields and ancient olive groves, The Heritage Estate is a 17th-century mas transformed into Provence's most coveted retreat. Stone fireplaces, antique furnishings, and a Michelin-starred kitchen celebrate everything southern France does best.",
    reviewCount: 98,
    galleryImages: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80',
      'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=600&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
      'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=600&q=80',
    ],
    amenities: ['Free WiFi', 'Heated Pool', 'Michelin-Starred Restaurant', 'Wine Cellar', 'Pétanque Court', 'Cycling Tours'],
    rooms: [
      {
        id: 'r1',
        name: 'Lavender Suite',
        badge: 'BESTSELLER',
        capacity: { adults: 2, children: 1 },
        sizeSqm: 65,
        features: ['Lavender field view', 'Stone fireplace', 'Clawfoot tub', 'Private garden'],
        price: 2100,
        imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80',
      },
      {
        id: 'r2',
        name: 'Mas Privé',
        badge: 'FEATURED',
        capacity: { adults: 6, children: 4 },
        sizeSqm: 400,
        features: ['Entire private farmhouse', '4 bedrooms', 'Private pool', 'Daily Michelin breakfast', 'Personal chef'],
        price: 8500,
        imageUrl: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=400&q=80',
      },
    ],
    reviews: [
      {
        id: 'rev1',
        author: 'Isabelle D.',
        date: 'May 2024',
        rating: 5,
        comment:
          'Provence at its finest. Lavender in every direction, Michelin-quality meals, and a stone bathtub I could have lived in. Unforgettable.',
      },
      {
        id: 'rev2',
        author: 'Pierre M.',
        date: 'April 2024',
        rating: 5,
        comment: 'This is France as it was meant to be experienced — intimate, artisanal, and completely removed from the noise of the world.',
      },
      {
        id: 'rev3',
        author: 'Claire V.',
        date: 'March 2024',
        rating: 5,
        comment: 'The wine cellar tour alone was worth the trip. Extraordinary service and a cuisine that rivals any Michelin restaurant in Paris.',
      },
      {
        id: 'rev4',
        author: 'Antoine B.',
        date: 'February 2024',
        rating: 4,
        comment: 'Romantic, authentic, and magical. The cycling tours through the lavender fields in the early morning are simply extraordinary.',
      },
    ],
  },
  {
    id: '6',
    name: 'Sand & Stone Resort',
    location: 'Dubai, UAE',
    rating: 4.6,
    price: 1100,
    imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80',
    description:
      "Where the desert meets the sea, Sand & Stone Resort is Dubai's boldest architectural statement. Cascading pools, private beach access, and a sky terrace bar ensure every sunset is a spectacle. Indulgence without compromise.",
    reviewCount: 267,
    galleryImages: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
      'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=600&q=80',
    ],
    amenities: ['Free WiFi', 'Private Beach', 'Infinity Pool', 'Sky Bar', 'Luxury Spa', 'Water Sports'],
    rooms: [
      {
        id: 'r1',
        name: 'Desert View Room',
        badge: 'BESTSELLER',
        capacity: { adults: 2, children: 1 },
        sizeSqm: 50,
        features: ['Desert horizon view', 'King-size bed', 'Soaking tub', 'Mini bar'],
        price: 1100,
        imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80',
      },
      {
        id: 'r2',
        name: 'Ocean Cabana Suite',
        badge: 'FEATURED',
        capacity: { adults: 4, children: 2 },
        sizeSqm: 140,
        features: ['Direct beach access', 'Private pool', '2 bedrooms', '24h butler', 'Jet ski access'],
        price: 3400,
        imageUrl: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=400&q=80',
      },
    ],
    reviews: [
      {
        id: 'rev1',
        author: 'Fatima A.',
        date: 'April 2024',
        rating: 5,
        comment: 'Dubai luxury at its peak. The sky bar at sunset with the desert and ocean visible simultaneously is a moment I will never forget.',
      },
      {
        id: 'rev2',
        author: 'Ahmed K.',
        date: 'March 2024',
        rating: 4,
        comment: 'Impeccable facilities and genuinely thoughtful service. The beach cabanas are perfect and the water sports selection is brilliant.',
      },
      {
        id: 'rev3',
        author: 'Nina R.',
        date: 'February 2024',
        rating: 5,
        comment:
          'A design masterpiece. You cannot believe the architecture until you are inside it. The spa is one of the best I have visited anywhere.',
      },
      {
        id: 'rev4',
        author: 'Oliver T.',
        date: 'January 2024',
        rating: 4,
        comment: "Outstanding resort for families. The kids' water sports programme kept our children delighted while we enjoyed the spa. Perfect.",
      },
    ],
  },
  {
    id: '7',
    badge: 'EXCLUSIVE',
    name: 'The Azure Heights',
    location: 'Oia, Santorini, Greece',
    rating: 5.0,
    price: 12500,
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80',
    description:
      "Perched on the iconic caldera cliffs of Oia, The Azure Heights offers an unparalleled sanctuary where whitewashed elegance meets the infinite Aegean horizon. Every suite commands a front-row seat to Santorini's legendary sunsets, while the cave-carved spa and private infinity pool bring the island's ancient mystique to life. This is Greece as you have always dreamed it.",
    reviewCount: 124,
    galleryImages: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=80',
      'https://images.unsplash.com/photo-1601000938259-5ee9a447e91d?w=600&q=80',
      'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80',
    ],
    amenities: ['Free WiFi', 'Infinity Pool', 'Luxury Spa', 'Restaurant', 'Private Terrace', 'Concierge'],
    rooms: [
      {
        id: 'r1',
        name: 'Junior Suite with Sea View',
        badge: 'BESTSELLER',
        capacity: { adults: 2, children: 1 },
        sizeSqm: 45,
        features: ['Caldera view terrace', 'King-size bed', 'Heated plunge pool'],
        price: 12500,
        imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80',
      },
      {
        id: 'r2',
        name: 'Deluxe Villa with Private Pool',
        badge: 'FEATURED',
        capacity: { adults: 4, children: 2 },
        sizeSqm: 110,
        features: ['Private infinity pool', '2 bedrooms', 'Butler service', '24h room service'],
        price: 28000,
        imageUrl: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=400&q=80',
      },
    ],
    reviews: [
      {
        id: 'rev1',
        author: 'Wanrat S.',
        date: 'March 2024',
        rating: 5,
        comment:
          'The most breathtaking view I have ever seen. The caldera at sunset from our private terrace had us speechless. The staff anticipated our every need — truly world-class.',
      },
      {
        id: 'rev2',
        author: 'Kanyarat S.',
        date: 'February 2024',
        rating: 5,
        comment:
          'We booked the Deluxe Villa for our honeymoon and it exceeded every expectation. The infinity pool overlooking the caldera is beyond description. We will return every year.',
      },
      {
        id: 'rev3',
        author: 'Alexandra P.',
        date: 'January 2024',
        rating: 5,
        comment:
          'Five stars is not enough. From the cave spa treatments to the sunrise breakfast, every moment here is crafted to absolute perfection.',
      },
      {
        id: 'rev4',
        author: 'Navin T.',
        date: 'December 2023',
        rating: 5,
        comment:
          'The Azure Heights defines luxury travel. Santorini is beautiful everywhere, but here you feel completely immersed in the magic of the island.',
      },
    ],
  },
];

export function getHotelById(id: string): HotelDetail | undefined {
  return HOTEL_DETAILS.find((hotel) => hotel.id === id);
}
