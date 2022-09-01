import cx from 'classnames';
import { FunctionComponent } from 'react';
import { CheckBox, Image, Rate, Slider, Switch } from '../../../lib/components';
import { Default as FormGroup } from '../../components/form-group/widget-variants';
// import { IconsSmall as MenuBar } from '../../components/menu-bar/widget-variants';
import { SuccessBig } from '../../components/progress/widget-variants';
import { Circle } from '../../components/skeleton/widget-variants';
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
        <Switch size="md" width={80} />
      </div>
      <div className={cx(styles.widget, styles.hide_on_mobiles)}>
        <Switch size="sm" width={80} label="checked" />
      </div>
      <div className={styles.widget}>
        <Switch size="sm" width={80} label="On" showCheckIcon checked />
      </div>
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

const Sink2: FunctionComponent<SinkProps> = ({ isDark }) => {
  return (
    <div className={cx(styles.sink, styles.sink2, isDark ? styles.dark : '')}>
      <div className={styles.widget}>
        <Image
          width={400}
          height={250}
          loaderSize="lg"
          src="https://bit.ly/3q1ID4W"
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
        <div className={styles.widget_wrap}>{Circle}</div>
        <div className={styles.widget_wrap}>
          <div className={styles.widget_wrap_2}>
            {SuccessBig}
            {/* {MenuBar} */}
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