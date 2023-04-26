import cx from 'classnames';
import { FunctionComponent } from 'react';
import {
  CheckBox,
  DataGrid,
  Gallery,
  Rate,
  Slider,
  Switch,
} from '../../../lib/components';
import { Default as FormGroup } from '../../components/form-group/widget-variants';
import { IconsSmall as MenuBar } from '../../components/menu-bar/widget-variants';
import { SuccessBig } from '../../components/progress/widget-variants';
// import { Circle } from '../../components/skeleton/widget-variants';
import styles from './styles/kitchen-sink.module.scss';

export type SinkProps = {
  isDark: boolean;
};

const Sink1: FunctionComponent<SinkProps> = ({ isDark }) => {
  return (
    <div className={cx(styles.sink1, styles.sink, isDark ? styles.dark : '')}>
      <div className={styles.widget}>
        <Slider knobShape="square" disableTooltip start={1} end={5} />
      </div>
      <div className={styles.widget}>
        <Switch size="md" width={80} checked />
      </div>
      {/* <div className={cx(styles.widget, styles.hide_on_mobiles)}>
        <Switch size="sm" width={80} label="checked" />
      </div> */}
      {/* <div className={styles.widget}>
        <Switch size="sm" width={80} label="On" showCheckIcon checked />
      </div> */}
      <div className={styles.widget}>
        <Rate size="lg" iconCount={3} value={2} />
      </div>
      <div className={cx(styles.widget, styles.hide_on_mobiles)}>
        <div style={{ height: '30px' }}>
          <CheckBox label="Selected" isChecked />
        </div>
      </div>
    </div>
  );
};

const picks = ['fire', 'water', 'earth', 'air', 'lightning', 'metal', 'wood'];

// generate random images from unsplash
const images = Array.from({ length: 8 }, () => {
  const randomIndex = Math.floor(Math.random() * picks.length);
  const target = picks.splice(randomIndex, 1)[0];
  return `https://source.unsplash.com/random/500x500?${target}`;
});

const Sink2: FunctionComponent<SinkProps> = ({ isDark }) => {
  return (
    <div className={cx(styles.sink, styles.sink2, isDark ? styles.dark : '')}>
      <div className={styles.widget}>
        <Gallery
          imagesURL={images}
          gridDimension={[4, 2]}
          gap={10}
          imageDimension={150}
        />
      </div>
    </div>
  );
};

const Sink3: FunctionComponent<SinkProps> = ({ isDark }) => {
  return (
    <div className={cx(styles.sink, styles.sink3, isDark ? styles.dark : '')}>
      {/* <div className={styles.widget}>{SmallTree}</div> */}
      <div className={styles.widget}>
        {/* <div className={styles.widget_wrap}>{Circle}</div> */}
        <div className={styles.widget_wrap}>
          <div className={styles.widget_wrap_2}>
            {/* {SuccessBig} */}
            {/* {MenuBar} */}
            <DataGrid
              columns={[
                { name: 'Company', type: 'string' },
                { name: 'Headquarters', type: 'string' },
                { name: 'Revenue', type: 'number' },
              ]}
              data={[
                {
                  Company: 'Apple',
                  Headquarters: 'Cupertino, California',
                  Revenue: 274515,
                },
                {
                  Company: 'Samsung Electronics',
                  Headquarters: 'Suwon, South Korea',
                  Revenue: 211940,
                },
                {
                  Company: 'Foxconn',
                  Headquarters: 'New Taipei City, Taiwan',
                  Revenue: 129533,
                },
                {
                  Company: 'Alphabet',
                  Headquarters: 'Mountain View, California',
                  Revenue: 161857,
                },
              ]}
              border
              layoutStyle="comfortable"
            />
          </div>
        </div>
      </div>
      <div className={cx(styles.widget, styles.hide_on_mobiles)}>
        {FormGroup}
      </div>
    </div>
  );
};

export { Sink1, Sink2, Sink3 };
