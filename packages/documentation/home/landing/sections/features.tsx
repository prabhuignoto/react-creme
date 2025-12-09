import { isDark } from '@lib';
import cx from 'classnames';
import { FunctionComponent, useMemo } from 'react';
import {
  Shield,
  Activity,
  FileText,
  Smartphone,
  Maximize2,
  MousePointer,
} from 'lucide-react';
import styles from '../styles/features.module.scss';

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
}

const Features: FunctionComponent = () => {
  const isDarkMode = useMemo(() => isDark(), []);

  const features: FeatureItem[] = [
    {
      badge: 'WCAG AA',
      description:
        'WCAG AA compliant components with full keyboard navigation, screen reader support, and proper ARIA attributes.',
      icon: <Shield size={28} />,
      title: 'Accessibility First',
    },
    {
      badge: '95%+ Coverage',
      description:
        'Comprehensive test coverage with Vitest and Testing Library. Every component is battle-tested for reliability.',
      icon: <Activity size={28} />,
      title: 'Fully Tested',
    },
    {
      badge: 'Interactive',
      description:
        'Detailed documentation with live examples, code snippets, and API references for every component.',
      icon: <FileText size={28} />,
      title: 'Excellent Docs',
    },
    {
      badge: 'Touch Ready',
      description:
        'Touch-friendly interactions and responsive layouts. Works seamlessly across all devices and screen sizes.',
      icon: <Smartphone size={28} />,
      title: 'Mobile Optimized',
    },
    {
      badge: 'CSS Modules',
      description:
        'Theme system with CSS variables, props-based styling, and full control over component appearance.',
      icon: <Maximize2 size={28} />,
      title: 'Highly Customizable',
    },
    {
      badge: 'Polished',
      description:
        'Smooth animations, intuitive interactions, and thoughtful micro-interactions for delightful user experiences.',
      icon: <MousePointer size={28} />,
      title: 'Great UX',
    },
  ];

  return (
    <section
      className={cx(styles.features_section, isDarkMode ? styles.dark : '')}
    >
      <div className={styles.features_container}>
        <div className={styles.section_header}>
          <h2 className={styles.section_title}>Built for Production</h2>
          <p className={styles.section_subtitle}>
            Not just another component library. React Creme is designed with
            modern standards and best practices.
          </p>
        </div>

        <div className={styles.features_grid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.feature_card}>
              <div className={styles.feature_icon_wrapper}>
                {feature.icon}
                {feature.badge && (
                  <span className={styles.feature_badge}>{feature.badge}</span>
                )}
              </div>
              <h3 className={styles.feature_title}>{feature.title}</h3>
              <p className={styles.feature_description}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Features };
