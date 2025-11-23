import { isDark } from '@lib';
import cx from 'classnames';
import { FunctionComponent, useMemo } from 'react';
import { USP_DATA } from '../constants';
import styles from '../styles/why-react-creme.module.scss';

const WhyReactCreme: FunctionComponent = () => {
  const isDarkMode = useMemo(() => isDark(), []);

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
          {USP_DATA.map((usp, index) => (
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
