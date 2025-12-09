import classNames from 'classnames';
import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { BlockQuote, Section } from '../../../lib/components';
import { themeState } from '../../atoms/home';
import { supportedBrowsers } from '../../home/home-data';
import styles from './browser-support.module.scss';

function BrowserSupport() {
  const theme = useAtomValue(themeState);

  const isDarkMode = useMemo(() => !!theme.darkMode, []);

  return (
    <Section title="Browser Support" size="md" useHash>
      <BlockQuote>
        react-creme is a modern UI Toolkit that is designed to work with the
        most popular &amp; modern web browsers.
      </BlockQuote>
      <ul className={styles.list}>
        {supportedBrowsers.map((browser, index) => (
          <li key={index} className="browser-support-item">
            <span
              className={classNames(styles.icon, {
                [styles.dark]: isDarkMode,
              })}
            >
              {/* <browser.icon size={64} /> */}
              <img src={`${browser.image}.svg`} alt={browser.title} />
            </span>
            <span
              className={classNames(styles.name, {
                [styles.dark]: isDarkMode,
              })}
            >
              {browser.title}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export default BrowserSupport;
