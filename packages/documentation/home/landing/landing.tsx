import { NavBar } from './navbar';
import { HeroV2 } from './sections/hero-v2';
import { StatsBar } from './sections/stats-bar';
import { WhyReactCreme } from './sections/why-react-creme';
import { Features } from './sections/features';
import { LiveShowcase } from './sections/live-showcase';
import { DeveloperExperience } from './sections/developer-experience';
import { ComparisonTable } from './sections/comparison-table';
import { FAQ } from './sections/faq';
import { FinalCTA } from './sections/final-cta';
import { ScrollToTop } from './components/scroll-to-top';
import styles from './styles/landing.module.scss';

const LandingPage = () => {
  return (
    <div className={styles.landing}>
      {/* Navigation Bar */}
      <NavBar />

      {/* Hero Section with new design */}
      <HeroV2 />

      {/* Stats Bar */}
      <StatsBar />

      {/* Why React Creme USP Section */}
      <WhyReactCreme />

      {/* Features Section - Accessibility, Testing, Docs */}
      <Features />

      {/* Live Components Showcase */}
      <LiveShowcase />

      {/* Developer Experience */}
      <DeveloperExperience />

      {/* Comparison Table */}
      <ComparisonTable />

      {/* FAQ Section */}
      <FAQ />

      {/* Final CTA */}
      <FinalCTA />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default LandingPage;
