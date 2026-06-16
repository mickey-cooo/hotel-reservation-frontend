import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import MembershipHero from '@/components/membership/membership-hero/MembershipHero';
import MembershipTiers from '@/components/membership/membership-tiers/MembershipTiers';
import MembershipComparison from '@/components/membership/membership-comparison/MembershipComparison';
import MembershipLifestyle from '@/components/membership/membership-lifestyle/MembershipLifestyle';

export default function MembershipPage() {
  return (
    <>
      <Navbar />
      <MembershipHero />
      <MembershipTiers />
      <MembershipComparison />
      <MembershipLifestyle />
      <Footer />
    </>
  );
}
