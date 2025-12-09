import { CheckCircle } from 'lucide-react';
import { FunctionComponent } from 'react';
import styles from './demo-page-renderer.module.scss';

interface DemoPageFeatureProps {
  features: string[];
}

const DemoPageFeatures: FunctionComponent<DemoPageFeatureProps> = ({
  features,
}) => {
  return (
    <ul className={styles.features}>
      {features.map((feature, index) => (
        <li key={index} className={styles.feature}>
          <span className={styles.feature_icon}>
            <CheckCircle size={24} />
          </span>
          <span className={styles.feature_name}>{feature}</span>
        </li>
      ))}
    </ul>
  );
};

export default DemoPageFeatures;
