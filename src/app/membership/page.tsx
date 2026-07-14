import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import MembershipHero from '@/components/membership/membership-hero/MembershipHero';
import MembershipTiers from '@/components/membership/membership-tiers/MembershipTiers';
import MembershipLifestyle from '@/components/membership/membership-lifestyle/MembershipLifestyle';
import Reveal from '@/components/reveal/Reveal';

export default function MembershipPage() {
  return (
    <>
      <Navbar />
      <MembershipHero />
      <Reveal>
        <MembershipTiers />
      </Reveal>
      <Reveal>
        <MembershipLifestyle />
      </Reveal>
      <Footer />
    </>
  );
}
