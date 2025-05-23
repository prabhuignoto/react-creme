import React from 'react';
import cx from 'classnames';
import capabilityStyles from './styles/capabilities-section.module.scss';

interface CapabilityCardProps {
  icon: string;
  title: string;
  description: string;
  features: string[];
  isDarkMode: boolean;
}

const CapabilityCard: React.FC<CapabilityCardProps> = ({
  icon,
  title,
  description,
  features,
  isDarkMode,
}) => {
  return (
    <div
      className={cx(
        capabilityStyles.capability_card,
        isDarkMode ? capabilityStyles.dark : ''
      )}
    >
      <div className={capabilityStyles.icon_container}>
        <span role="img" aria-label={title}>
          {icon}
        </span>
      </div>
      <h3 className={capabilityStyles.title}>{title}</h3>
      <p className={capabilityStyles.description}>{description}</p>
      <ul className={capabilityStyles.capability_feature_list}>
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  );
};

export default CapabilityCard;
