import { Hero } from './hero';
import { NavBar } from './navbar';
import styles from './styles/landing.module.scss';
import capabilityStyles from './styles/capabilities-section.module.scss';
import { useMemo } from 'react';
import { isDark } from '@lib';
import cx from 'classnames';
import MarketingSectionPatterns from './MarketingSectionPatterns';
import CapabilitiesPatterns from './CapabilitiesPatterns';
import CapabilityCard from './CapabilityCard';

const LandingPage = () => {
  const isDarkMode = useMemo(() => isDark(), []);

  return (
    <div className={styles.landing}>
      <NavBar />
      <Hero />

      <section className={styles.metrics_section}>
        <div className={styles.metric_card}>
          <div className={styles.number}>45+</div>
          <div className={styles.label}>UI Components</div>
        </div>
        <div className={styles.metric_card}>
          <div className={styles.number}>42kb</div>
          <div className={styles.label}>Minified Bundle Size</div>
        </div>
        <div className={styles.metric_card}>
          <div className={styles.number}>100%</div>
          <div className={styles.label}>TypeScript Coverage</div>
        </div>
      </section>

      <section
        className={cx(styles.marketing_section, isDarkMode ? styles.dark : '')}
      >
        <MarketingSectionPatterns />
        <h2>Why Choose React Creme?</h2>
        <div className={styles.feature_grid}>
          <div className={styles.feature_card}>
            <div className={styles.icon}>⚡</div>
            <h3>Enterprise-Grade UI Components</h3>
            <p>
              Build professional applications with our comprehensive suite of
              beautiful and robust React components.
            </p>
          </div>
          <div className={styles.feature_card}>
            <div className={styles.icon}>🎨</div>
            <h3>Deep Customization</h3>
            <p>
              Achieve pixel-perfect designs with highly customizable UI elements
              and fine-grained control over appearance.
            </p>
          </div>
          <div className={styles.feature_card}>
            <div className={styles.icon}>📚</div>
            <h3>Extensive Component Library</h3>
            <p>
              Access 45+ high-quality UI components, ready to integrate into
              common and complex application scenarios.
            </p>
          </div>
          <div className={styles.feature_card}>
            <div className={styles.icon}>♿</div>
            <h3>Accessibility First</h3>
            <p>
              Ensure inclusivity with fully accessible UI components, featuring
              keyboard navigation and screen reader support.
            </p>
          </div>
          <div className={styles.feature_card}>
            <div className={styles.icon}>🎯</div>
            <h3>Flexible Color Schemes</h3>
            <p>
              Seamlessly adapt components to your brand identity with robust
              support for custom color schemes and theming.
            </p>
          </div>
          <div className={styles.feature_card}>
            <div className={styles.icon}>🛡️</div>
            <h3>TypeScript Powered</h3>
            <p>
              Build with confidence using TypeScript for type-safe,
              maintainable, and scalable applications.
            </p>
          </div>
          <div className={styles.feature_card}>
            <div className={styles.icon}>🌓</div>
            <h3>Light & Dark Mode</h3>
            <p>
              Effortlessly implement modern UI aesthetics with out-of-the-box
              support for both light and dark themes.
            </p>
          </div>
          <div className={styles.feature_card}>
            <div className={styles.icon}>⚙️</div>
            <h3>Developer-Friendly</h3>
            <p>
              Streamline your workflow with easily configurable components that
              provide sensible defaults for rapid development.
            </p>
          </div>
        </div>
      </section>

      {/* New Capabilities Section */}
      <section
        className={cx(
          capabilityStyles.capabilities_section,
          isDarkMode ? capabilityStyles.dark : ''
        )}
      >
        <CapabilitiesPatterns />
        <div className={capabilityStyles.section_header}>
          <h2>Advanced Capabilities</h2>
          <p>
            React Creme goes beyond standard component libraries with
            specialized features designed for modern web applications. Explore
            these powerful capabilities that enhance your development workflow
            and user experience.
          </p>
        </div>

        <div className={capabilityStyles.capabilities_grid}>
          <CapabilityCard
            icon="🔄"
            title="Bi-directional Support"
            description="Full RTL (Right-to-Left) support built into every component, enabling seamless internationalization for global applications."
            features={[
              'Simple RTL toggle for all components',
              'Automatic layout mirroring',
              'Optimized for multilingual interfaces',
            ]}
            isDarkMode={isDarkMode}
          />
          <CapabilityCard
            icon="🎨"
            title="Advanced Theme System"
            description="Dynamic theming capabilities that go beyond basic light and dark modes with support for custom color palettes and granular styling."
            features={[
              'Runtime theme switching',
              'Custom color palette generation',
              'Component-level style customization',
            ]}
            isDarkMode={isDarkMode}
          />
          <CapabilityCard
            icon="♿"
            title="Superior Accessibility"
            description="Industry-leading accessibility features integrated at the core level, ensuring compliance with WCAG standards out of the box."
            features={[
              'ARIA attributes automatically applied',
              'Focus management system',
              'Screen reader optimizations',
            ]}
            isDarkMode={isDarkMode}
          />
          <CapabilityCard
            icon="⚡"
            title="Lightweight Performance"
            description="Meticulously optimized components with minimal bundle size impact and intelligent rendering strategies for maximum performance."
            features={[
              'Tiny 42kb core footprint',
              'Tree-shakable architecture',
              'Virtualized rendering for large datasets',
            ]}
            isDarkMode={isDarkMode}
          />
          <CapabilityCard
            icon="✨"
            title="Built-in Animation System"
            description="Smooth, high-performance animations and transitions that enhance user experience without compromising performance."
            features={[
              'Hardware-accelerated transitions',
              'Customizable animation durations',
              'Reduced motion preference support',
            ]}
            isDarkMode={isDarkMode}
          />
          <CapabilityCard
            icon="🛠️"
            title="Developer Experience"
            description="Thoughtfully designed API with comprehensive TypeScript definitions and consistent patterns that boost developer productivity."
            features={[
              'Consistent prop patterns',
              'Detailed TypeScript definitions',
              'Extensive documentation and examples',
            ]}
            isDarkMode={isDarkMode}
          />
        </div>
      </section>

      <section
        className={cx(styles.cta_section, isDarkMode ? styles.dark : '')}
      >
        <h2>Ready to Build Better?</h2>
        <p>
          Start creating beautiful, accessible, and high-performance React
          applications today with React Creme's comprehensive component library.
        </p>
        <div className={styles.cta_buttons}>
          <button className={styles.primary_button}>Get Started</button>
          <button className={styles.secondary_button}>
            View Documentation
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
