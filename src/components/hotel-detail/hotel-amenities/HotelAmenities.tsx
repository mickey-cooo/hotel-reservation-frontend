import { Box, Typography } from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import PoolIcon from '@mui/icons-material/Pool';
import SpaIcon from '@mui/icons-material/Spa';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import BalconyIcon from '@mui/icons-material/Balcony';
import HotTubIcon from '@mui/icons-material/HotTub';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import WaterIcon from '@mui/icons-material/Water';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import styles from './HotelAmenities.module.scss';

const AMENITY_ICONS: Record<string, React.ElementType> = {
  'Free WiFi': WifiIcon,
  'Infinity Pool': PoolIcon,
  'Heated Pool': PoolIcon,
  'Private Plunge Pool': PoolIcon,
  'Luxury Spa': SpaIcon,
  Restaurant: RestaurantIcon,
  'Fine Dining': LocalDiningIcon,
  'Michelin-Starred Restaurant': LocalDiningIcon,
  'Fitness Centre': FitnessCenterIcon,
  'Fitness Studio': FitnessCenterIcon,
  'Private Beach': BeachAccessIcon,
  'Room Service': RoomServiceIcon,
  Concierge: SupportAgentIcon,
  'Valet Parking': LocalParkingIcon,
  'Cocktail Bar': LocalBarIcon,
  'Sky Bar': LocalBarIcon,
  'Cycling Tours': DirectionsBikeIcon,
  'Private Terrace': BalconyIcon,
  'Wine Cellar': LocalBarIcon,
  'Rooftop Terrace': BalconyIcon,
  'Yoga Pavilion': SelfImprovementIcon,
  'Airport Transfer': FlightLandIcon,
  'Water Sports': WaterIcon,
  'In-house Sommelier': LocalBarIcon,
};

interface HotelAmenitiesProps {
  amenities: string[];
}

export default function HotelAmenities({ amenities }: HotelAmenitiesProps) {
  return (
    <Box className={styles.section}>
      <Typography variant="h6" className={styles.sectionTitle}>
        Amenities
      </Typography>
      <Box className={styles.grid}>
        {amenities.map((amenity) => {
          const Icon = AMENITY_ICONS[amenity] ?? HotTubIcon;
          return (
            <Box key={amenity} className={styles.amenityItem}>
              <Icon className={styles.amenityIcon} />
              <Typography className={styles.amenityLabel}>{amenity}</Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
