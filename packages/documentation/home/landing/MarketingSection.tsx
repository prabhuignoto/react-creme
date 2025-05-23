import { FC } from 'react';
import cx from 'classnames';
import styles from './styles/landing.module.scss';
import MarketingSectionPatterns from './MarketingSectionPatterns';
import { featureCards } from './data/landing-content';

interface MarketingSectionProps {
  isDarkMode: boolean;
}

export const MarketingSection: FC<MarketingSectionProps> = ({ isDarkMode }) => {
  return (
    <section
      className={cx(styles.marketing_section, isDarkMode ? styles.dark : '')}
    >
      <MarketingSectionPatterns />
      <h2>Why Choose React Creme?</h2>
      <div className={styles.feature_grid}>
        {featureCards.map((card, index) => (
          <div key={index} className={styles.feature_card}>
            <div className={styles.icon}>{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
