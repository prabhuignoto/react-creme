import { FC } from 'react';
import cx from 'classnames';
import capabilityStyles from './styles/capabilities-section.module.scss';
import CapabilitiesPatterns from './CapabilitiesPatterns';
import CapabilityCard from './CapabilityCard';
import { capabilityCards } from './data/landing-content';

interface CapabilitiesSectionProps {
  isDarkMode: boolean;
}

export const CapabilitiesSection: FC<CapabilitiesSectionProps> = ({
  isDarkMode,
}) => {
  return (
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
          React Creme goes beyond standard component libraries with specialized
          features designed for modern web applications. Explore these powerful
          capabilities that enhance your development workflow and user
          experience.
        </p>
      </div>

      <div className={capabilityStyles.capabilities_grid}>
        {capabilityCards.map((card, index) => (
          <CapabilityCard
            key={index}
            icon={card.icon}
            title={card.title}
            description={card.description}
            features={card.features}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>
    </section>
  );
};
