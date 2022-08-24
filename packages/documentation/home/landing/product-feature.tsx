import { isDark } from '@lib';
import cx from 'classnames';
import { FunctionComponent, ReactNode, useMemo } from 'react';
import styles from './styles/product-feature.module.scss';

export type ProductFeatureProps = {
  description: string;
  icon: ReactNode;
  title: string;
};

const ProductFeature: FunctionComponent<ProductFeatureProps> = ({
  icon,
  title,
  description,
}) => {
  const isDarkMode = useMemo(() => isDark(), []);

  const featureClass = useMemo(
    () => cx(styles.feature, isDarkMode ? styles.dark : ''),
    [isDarkMode]
  );

  const iconClass = useMemo(
    () => cx(styles.icon, isDarkMode ? styles.dark : ''),
    [isDarkMode]
  );

  const titleClass = useMemo(
    () => cx(styles.title, isDarkMode ? styles.dark : ''),
    [isDarkMode]
  );

  const descriptionClass = useMemo(
    () => cx(styles.description, isDarkMode ? styles.dark : ''),
    [isDarkMode]
  );

  return (
    <div className={featureClass}>
      <header className={styles.header}>
        <div className={iconClass}>{icon}</div>
        <h3 className={titleClass}>{title}</h3>
      </header>
      <p className={descriptionClass}>{description}</p>
    </div>
  );
};

const ProductFeatures: FunctionComponent<{ items: ProductFeatureProps[] }> = ({
  items,
}) => {
  return (
    <ul className={styles.features}>
      {items.map((item, index) => (
        <li key={index} className={styles.feature_item}>
          <ProductFeature key={index} {...item} />
        </li>
      ))}
    </ul>
  );
};

export { ProductFeature, ProductFeatures };
