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
import { SHOWCASE_GALLERY_IMAGES, SHOWCASE_GRID_DATA } from '../constants';
import styles from '../styles/live-showcase.module.scss';

const LiveShowcase: FunctionComponent = () => {
  const isDarkMode = useMemo(() => isDark(), []);

  return (
    <section
      className={cx(styles.showcase_section, isDarkMode ? styles.dark : '')}
    >
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
                data={SHOWCASE_GRID_DATA}
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

          {/* Row 2: Media Components - Gallery and Image Comparer side by side */}
          <div
            className={cx(
              styles.component_card_wide,
              styles.component_card_gallery
            )}
          >
            <div className={styles.card_header}>
              <h3 className={styles.card_title}>Gallery Component</h3>
              <span className={styles.card_badge}>Media</span>
            </div>
            <div className={styles.card_content}>
              <Gallery
                imagesURL={SHOWCASE_GALLERY_IMAGES}
                imagesALT={[
                  'Mountain landscape with lake',
                  'Forest path in nature',
                  'Mountain range at sunset',
                  'Ocean waves on beach',
                  'Mountain peak with clouds',
                  'Sunset over mountains',
                  'Forest with sunlight filtering through trees',
                  'Mountain lake reflection',
                  'Tropical beach with palm trees',
                  'Dense forest canopy',
                ]}
                gridDimension={[5, 2]}
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
                sourceOne="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
                sourceTwo="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop"
                direction="horizontal"
                ariaLabel="Nature landscape comparison"
              />
            </div>
          </div>

          {/* Row 3: Interactive Controls */}
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
              <div style={{ maxWidth: '400px', width: '100%' }}>
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
            All components are production-ready, fully accessible, and optimized
            for performance.
          </p>
        </div>
      </div>
    </section>
  );
};

export { LiveShowcase };
