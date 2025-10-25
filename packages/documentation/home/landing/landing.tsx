import { HeroV2 } from './sections/hero-v2';
import { StatsBar } from './sections/stats-bar';
import { WhyReactCreme } from './sections/why-react-creme';
import { LiveShowcase } from './sections/live-showcase';
import { ComparisonTable } from './sections/comparison-table';
import { FinalCTA } from './sections/final-cta';
import styles from './styles/landing.module.scss';

const LandingPage = () => {
  return (
    <div className={styles.landing}>
      {/* Hero Section with new design */}
      <HeroV2 />

      {/* Stats Bar */}
      <StatsBar />

      {/* Why React Creme USP Section */}
      <WhyReactCreme />

      {/* Live Components Showcase */}
      <LiveShowcase />

      {/* Comparison Table */}
      <ComparisonTable />

      {/* Final CTA */}
      <FinalCTA />
    </div>
  );
};

export default LandingPage;
