import { isDark } from '@lib';
import cx from 'classnames';
import { FunctionComponent, useMemo, type ReactNode } from 'react';
import { Code, Zap, Package, Terminal } from 'react-feather';
import { InstallCommandCard } from '../components/InstallCommandCard';
import { PACKAGE_MANAGERS } from '../data/installCommands';
import styles from '../styles/developer-experience.module.scss';

interface DXFeature {
  icon: ReactNode;
  title: string;
  items: string[];
}

const DeveloperExperience: FunctionComponent = () => {
  const isDarkMode = useMemo(() => isDark(), []);

  const dxFeatures: DXFeature[] = [
    {
      icon: <Code size={32} />,
      items: [
        'Strict mode enabled (TS 5.9)',
        'Full IntelliSense support',
        'Exported types for all props',
        'Zero any types in codebase',
      ],
      title: 'TypeScript First',
    },
    {
      icon: <Zap size={32} />,
      items: [
        'Vite 6 for lightning-fast builds',
        'Turborepo for monorepo management',
        'Oxlint for 50-100x faster linting',
        'Vitest for fast unit testing',
      ],
      title: 'Modern Tooling',
    },
    {
      icon: <Package size={32} />,
      items: [
        'Single npm install command',
        'Auto-imported CSS modules',
        'Tree-shakeable exports',
        'ESM & CJS support',
      ],
      title: 'Great DX',
    },
    {
      icon: <Terminal size={32} />,
      items: [
        'Storybook for development',
        'Hot module replacement',
        'Source maps included',
        'Active GitHub community',
      ],
      title: 'Developer Tools',
    },
  ];

  const codeExample = `import { Button, Card, DataGrid } from 'react-creme';
import 'react-creme/css';

function App() {
  return (
    <Card>
      <DataGrid
        data={items}
        columns={columns}
      />
      <Button type="primary">
        Get Started
      </Button>
    </Card>
  );
}`;

  return (
    <section className={cx(styles.dx_section, isDarkMode ? styles.dark : '')}>
      <div className={styles.dx_container}>
        <div className={styles.section_header}>
          <h2 className={styles.section_title}>Developer Experience</h2>
          <p className={styles.section_subtitle}>
            Built by developers, for developers. Everything you need for a
            smooth development workflow.
          </p>
        </div>

        <div className={styles.dx_content}>
          {/* Left: Code Example */}
          <div className={styles.code_section}>
            <div className={styles.code_header}>
              <div className={styles.window_controls}>
                <span className={styles.control_dot}></span>
                <span className={styles.control_dot}></span>
                <span className={styles.control_dot}></span>
              </div>
              <span className={styles.code_title}>App.tsx</span>
            </div>
            <pre className={styles.code_block}>
              <code>{codeExample}</code>
            </pre>
            <div className={styles.code_footer}>
              <span className={styles.code_hint}>
                Full TypeScript support with IntelliSense
              </span>
            </div>
          </div>

          {/* Right: Features Grid */}
          <div className={styles.features_grid}>
            {dxFeatures.map((feature, index) => (
              <div key={index} className={styles.dx_feature}>
                <div className={styles.feature_icon}>{feature.icon}</div>
                <h3 className={styles.feature_title}>{feature.title}</h3>
                <ul className={styles.feature_list}>
                  {feature.items.map((item, i) => (
                    <li key={i} className={styles.feature_item}>
                      <svg
                        className={styles.check_icon}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Installation */}
        <div className={styles.installation}>
          <h3 className={styles.installation_title}>Get started in seconds</h3>
          <div className={styles.install_commands}>
            {PACKAGE_MANAGERS.map(config => (
              <InstallCommandCard
                key={config.id}
                config={config}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { DeveloperExperience };
