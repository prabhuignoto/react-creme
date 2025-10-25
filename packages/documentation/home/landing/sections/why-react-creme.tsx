import { isDark } from '@lib';
import cx from 'classnames';
import { FunctionComponent, useMemo } from 'react';
import { Zap, Layers, Droplet } from 'react-feather';
import styles from '../styles/why-react-creme.module.scss';

export type USPItem = {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight: string;
};

const WhyReactCreme: FunctionComponent = () => {
  const isDarkMode = useMemo(() => isDark(), []);

  const usps: USPItem[] = [
    {
      icon: <Zap size={32} />,
      title: '4x Lighter',
      description: 'At just 55kb, React Creme is 4x smaller than Material-UI and Ant Design. Faster load times, better Core Web Vitals, happier users.',
      highlight: '55kb vs 200kb+',
    },
    {
      icon: <Layers size={32} />,
      title: 'Modern Stack',
      description: 'Built with React 19, TypeScript 5.9 strict mode, and CSS Modules. No CSS-in-JS runtime overhead. No utility class verbosity.',
      highlight: 'React 19, Vite 6, TS 5.9',
    },
    {
      icon: <Droplet size={32} />,
      title: 'No Lock-in',
      description: 'Unlike Material-UI or Ant Design, React Creme has no opinionated design language. Your brand, your colors, your identity.',
      highlight: 'Your brand, not ours',
    },
  ];

  return (
    <section className={cx(styles.why_section, isDarkMode ? styles.dark : '')}>
      <div className={styles.why_container}>
        <div className={styles.section_header}>
          <h2 className={styles.section_title}>Why React Creme?</h2>
          <p className={styles.section_subtitle}>
            The component library that doesn't slow you down or lock you in
          </p>
        </div>

        <div className={styles.usps_grid}>
          {usps.map((usp, index) => (
            <div key={index} className={styles.usp_card}>
              <div className={styles.usp_icon_wrapper}>
                <div className={styles.usp_icon}>{usp.icon}</div>
              </div>
              <div className={styles.usp_content}>
                <h3 className={styles.usp_title}>{usp.title}</h3>
                <div className={styles.usp_highlight}>{usp.highlight}</div>
                <p className={styles.usp_description}>{usp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { WhyReactCreme };
