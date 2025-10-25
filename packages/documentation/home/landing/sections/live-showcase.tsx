import {
  isDark,
  DataGrid,
  Rate,
  Gallery,
  Switch,
  Slider,
  CheckBox,
  ImageComparer,
} from '@lib';
import cx from 'classnames';
import { FunctionComponent, useMemo } from 'react';
import styles from '../styles/live-showcase.module.scss';

const LiveShowcase: FunctionComponent = () => {
  const isDarkMode = useMemo(() => isDark(), []);

  // Curated images for Gallery
  const galleryImages = [
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1611095564945-db7f3cb7e02c?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1621609764180-2ca554a9d6f2?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1611095973763-414019e72400?w=300&h=300&fit=crop',
  ];

  const gridData = [
    { Component: 'Button', 'Bundle Impact': '~2kb', Status: '✓ Ready' },
    { Component: 'DataGrid', 'Bundle Impact': '~8kb', Status: '✓ Ready' },
    { Component: 'Gallery', 'Bundle Impact': '~5kb', Status: '✓ Ready' },
    { Component: 'Switch', 'Bundle Impact': '~1.5kb', Status: '✓ Ready' },
    { Component: 'Rate', 'Bundle Impact': '~3kb', Status: '✓ Ready' },
  ];

  return (
    <section className={cx(styles.showcase_section, isDarkMode ? styles.dark : '')}>
      <div className={styles.showcase_container}>
        {/* Section Header */}
        <div className={styles.section_header}>
          <h2 className={styles.section_title}>See It In Action</h2>
          <p className={styles.section_subtitle}>
            Real components, real interactions. No mocks, no placeholders.
          </p>
        </div>

        {/* Components Grid */}
        <div className={styles.components_grid}>
          {/* Row 1: Data Display */}
          <div className={styles.component_card_large}>
            <div className={styles.card_header}>
              <h3 className={styles.card_title}>DataGrid Component</h3>
              <span className={styles.card_badge}>Data Display</span>
            </div>
            <div className={styles.card_content}>
              <DataGrid
                columns={[
                  { name: 'Component', type: 'string' },
                  { name: 'Bundle Impact', type: 'string' },
                  { name: 'Status', type: 'string' },
                ]}
                data={gridData}
                border
                layoutStyle="comfortable"
              />
            </div>
          </div>

          <div className={styles.component_card}>
            <div className={styles.card_header}>
              <h3 className={styles.card_title}>Rate Component</h3>
              <span className={styles.card_badge}>Interactive</span>
            </div>
            <div className={styles.card_content_centered}>
              <Rate size="lg" iconCount={5} value={4.5} />
              <p className={styles.card_description}>
                Highly customizable rating component
              </p>
            </div>
          </div>

          <div className={styles.component_card}>
            <div className={styles.card_header}>
              <h3 className={styles.card_title}>CheckBox States</h3>
              <span className={styles.card_badge}>Forms</span>
            </div>
            <div className={styles.card_content}>
              <div className={styles.checkbox_group}>
                <CheckBox label="TypeScript Strict Mode" isChecked />
                <CheckBox label="Tree-Shakeable" isChecked />
                <CheckBox label="Zero Runtime CSS" isChecked />
                <CheckBox label="Accessible" isChecked />
              </div>
            </div>
          </div>

          {/* Row 2: Media Components */}
          <div className={styles.component_card_wide}>
            <div className={styles.card_header}>
              <h3 className={styles.card_title}>Gallery Component</h3>
              <span className={styles.card_badge}>Media</span>
            </div>
            <div className={styles.card_content}>
              <Gallery
                imagesURL={galleryImages}
                gridDimension={[4, 2]}
                gap={10}
                imageDimension={140}
              />
            </div>
          </div>

          <div className={styles.component_card_wide}>
            <div className={styles.card_header}>
              <h3 className={styles.card_title}>Image Comparer</h3>
              <span className={styles.card_badge}>Unique</span>
            </div>
            <div className={styles.card_content}>
              <ImageComparer
                firstImage="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=600&h=400&fit=crop&sat=-100"
                secondImage="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=600&h=400&fit=crop"
                orientation="horizontal"
              />
            </div>
          </div>

          {/* Row 3: Interactive Controls */}
          <div className={styles.component_card}>
            <div className={styles.card_header}>
              <h3 className={styles.card_title}>Switch Control</h3>
              <span className={styles.card_badge}>Interactive</span>
            </div>
            <div className={styles.card_content_centered}>
              <Switch size="md" width={120} checked label="Dark Mode" />
              <p className={styles.card_description}>
                Smooth, accessible toggle switch
              </p>
            </div>
          </div>

          <div className={styles.component_card_wide}>
            <div className={styles.card_header}>
              <h3 className={styles.card_title}>Slider Range</h3>
              <span className={styles.card_badge}>Interactive</span>
            </div>
            <div className={styles.card_content_centered}>
              <div style={{ width: '100%', maxWidth: '400px' }}>
                <Slider
                  knobShape="circle"
                  start={0}
                  end={100}
                  value={55}
                  showTooltip
                />
              </div>
              <p className={styles.card_description}>
                Bundle size: ~55kb (55% smaller than Material-UI)
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={styles.showcase_cta}>
          <p className={styles.cta_text}>
            All components are production-ready, fully accessible, and optimized for performance.
          </p>
        </div>
      </div>
    </section>
  );
};

export { LiveShowcase };
