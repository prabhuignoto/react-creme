import classNames from 'classnames';
import * as React from 'react';
import { useMemo, useRef } from 'react';
import { isDark } from '../../common/utils';
import { CardProps } from './card-model';
import styles from './card.module.scss';

const Card: React.FunctionComponent<CardProps> = ({
  alignFooter = 'left',
  alignHeader = 'left',
  border = false,
  children,
  footer,
  header,
  height = 200,
  shadow = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const isDarkMode = useMemo(() => isDark(), []);

  const style = useMemo(() => {
    return {
      '--height': `${height}px`,
      gridTemplateRows: `${header ? '50px' : ''} 1fr ${
        footer ? '50px' : ''
      }`.trim(),
    };
  }, [height]);

  const cardWrapperClass = useMemo(() => {
    return classNames(styles.wrapper, {
      [styles.border_less]: !border,
      [styles.shadow]: shadow,
      [styles.dark]: isDarkMode,
    });
  }, [border]);

  const cardHeaderClass = useMemo(() => {
    return classNames(styles.header, {
      [styles[`card-align-${alignHeader}`]]: true,
    });
  }, []);

  const cardFooterClass = useMemo(() => {
    return classNames(styles.footer, {
      [styles[`card-align-${alignFooter}`]]: true,
    });
  }, []);

  return (
    <div className={cardWrapperClass} style={style} ref={ref}>
      {header && <header className={cardHeaderClass}>{header}</header>}
      <section className={styles.body}>{children}</section>
      {footer && <footer className={cardFooterClass}>{footer}</footer>}
    </div>
  );
};

Card.displayName = 'Card';

export { Card };
