import React, { useState } from 'react';
import { Text } from '@lib';
import { DashboardDemo } from './dashboard-demo';
import { EcommerceDemo } from './ecommerce-demo';
import styles from './showcase.module.scss';

type ShowcaseView = 'dashboard' | 'ecommerce';

const ShowcasePage: React.FC = () => {
  const [activeView, setActiveView] = useState<ShowcaseView>('dashboard');

  return (
    <div className={styles.showcaseContainer}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h1>Showcase</h1>
          <Text type="secondary" size="lg">
            Real-world examples showcasing the power and flexibility of React Creme components
          </Text>
        </div>
      </div>

      {/* Navigation */}
      <nav className={styles.navigation}>
        <button
          className={`${styles.navButton} ${activeView === 'dashboard' ? styles.active : ''}`}
          onClick={() => setActiveView('dashboard')}
        >
          <span className={styles.icon}>📊</span>
          Analytics Dashboard
        </button>
        <button
          className={`${styles.navButton} ${activeView === 'ecommerce' ? styles.active : ''}`}
          onClick={() => setActiveView('ecommerce')}
        >
          <span className={styles.icon}>🛍️</span>
          E-commerce Product
        </button>
      </nav>

      {/* Content Section */}
      <div className={styles.contentWrapper}>
        {activeView === 'dashboard' && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Analytics Dashboard</h2>
              <Text type="secondary">
                A fully interactive admin dashboard with real-time metrics, data visualization, and
                user management
              </Text>
            </div>

            <DashboardDemo />

            <div className={styles.componentsList}>
              <h3>Components Featured</h3>
              <div className={styles.componentTags}>
                {[
                  'Card',
                  'Progress',
                  'Slider',
                  'DataGrid',
                  'Tabs',
                  'Tags',
                  'Button',
                  'Text',
                  'Switch',
                ].map((component) => (
                  <span key={component} className={styles.tag}>
                    {component}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeView === 'ecommerce' && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>E-commerce Product Page</h2>
              <Text type="secondary">
                A complete product showcase with image gallery, ratings, options selection, and
                shopping cart integration
              </Text>
            </div>

            <EcommerceDemo />

            <div className={styles.componentsList}>
              <h3>Components Featured</h3>
              <div className={styles.componentTags}>
                {[
                  'Carousel',
                  'Rate',
                  'Tags',
                  'RadioGroup',
                  'CheckBox',
                  'InputNumber',
                  'Button',
                  'Tabs',
                  'Card',
                  'Text',
                  'Notification',
                ].map((component) => (
                  <span key={component} className={styles.tag}>
                    {component}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <h2>Why React Creme?</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🎨</div>
            <h3>Modern Design System</h3>
            <Text type="secondary" size="sm">
              Beautiful, cohesive components with a modern design language and smooth interactions
            </Text>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚡</div>
            <h3>High Performance</h3>
            <Text type="secondary" size="sm">
              Optimized components with minimal bundle size and excellent runtime performance
            </Text>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>♿</div>
            <h3>Accessible by Default</h3>
            <Text type="secondary" size="sm">
              WCAG 2.1 Level AA compliant with full keyboard navigation and screen reader support
            </Text>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🌈</div>
            <h3>Fully Themeable</h3>
            <Text type="secondary" size="sm">
              Customize colors, sizes, and styling through a powerful ThemeProvider
            </Text>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📦</div>
            <h3>Tree-shakeable</h3>
            <Text type="secondary" size="sm">
              Import only what you need. Minimal bundle size with zero unused code
            </Text>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📱</div>
            <h3>Responsive Design</h3>
            <Text type="secondary" size="sm">
              Mobile-first approach with perfect rendering on all screen sizes
            </Text>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShowcasePage;
