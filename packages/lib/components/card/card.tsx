import classNames from 'classnames';
import * as React from 'react';
import { useMemo, useRef } from 'react';
import { CardProps } from './card-model';
import './card.scss';

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

  const style = useMemo(() => {
    return {
      '--height': `${height}px`,
      gridTemplateRows: `${header ? '50px' : ''} 1fr ${
        footer ? '50px' : ''
      }`.trim(),
    };
  }, [height]);

  const cardWrapperClass = useMemo(() => {
    return classNames('rc-card-wrapper', {
      'rc-card-border-less': !border,
      'rc-card-shadow': shadow,
    });
  }, [border]);

  const cardHeaderClass = useMemo(() => {
    return classNames('rc-card-header', {
      [`rc-card-align-${alignHeader}`]: true,
    });
  }, []);

  const cardFooterClass = useMemo(() => {
    return classNames('rc-card-footer', {
      [`rc-card-align-${alignFooter}`]: true,
    });
  }, []);

  return (
    <div className={cardWrapperClass} style={style} ref={ref}>
      {header && <header className={cardHeaderClass}>{header}</header>}
      <section className="rc-card-body">{children}</section>
      {footer && <footer className={cardFooterClass}>{footer}</footer>}
    </div>
  );
};

Card.displayName = 'Card';

export { Card };
