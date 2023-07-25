import classNames from 'classnames';
import React from 'react';
import { useRef } from 'react';
import { isDark } from '../common/utils';
import { CardProps } from './card-model';
import styles from './card.module.scss';
import { useMemo } from 'react';

/**
 * Card Component - A flexible card component that can include a header, body, and footer.
 *
 * @component
 *
 * @param {object} props - The component's props
 * @param {'left'|'right'|'center'} props.alignFooter - The alignment of the footer. Default is 'left'.
 * @param {'left'|'right'|'center'} props.alignHeader - The alignment of the header. Default is 'left'.
 * @param {boolean} props.border - Determines whether the card has a border. Default is false.
 * @param {ReactNode} props.children - The content to be rendered inside the card's body.
 * @param {ReactNode} props.footer - The content to be rendered inside the card's footer.
 * @param {ReactNode} props.header - The content to be rendered inside the card's header.
 * @param {number} props.height - The height of the card. Default is 200.
 * @param {boolean} props.shadow - Determines whether the card has a shadow. Default is true.
 *
 * @returns {ReactNode} React component
 */
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

  // check if the theme is dark mode
  const isDarkMode = isDark();

  // setup style for the card
  const style = {
    '--height': `${height}px`,
    gridTemplateRows: `${header ? '50px' : ''} 1fr ${
      footer ? '50px' : ''
    }`.trim(),
  };

  // setup classnames for the card wrapper
  const cardWrapperClass = classNames(styles.wrapper, {
    [styles.border_less]: !border,
    [styles.shadow]: shadow,
    [styles.dark]: isDarkMode,
  });

  // setup classnames for the card header
  const cardHeaderClass = classNames(styles.header, {
    [styles[`align_${alignHeader}`]]: true,
  });

  // setup classnames for the card footer
  const cardFooterClass = classNames(styles.footer, {
    [styles[`align_${alignFooter}`]]: true,
  });

  // render the header
  const renderHeader = useMemo(
    () => (
      <header className={cardHeaderClass} aria-label="Card Header">
        {header}
      </header>
    ),
    []
  );

  // render the body
  const renderBody = useMemo(
    () => (
      <section className={styles.body} aria-label="Card Body">
        {children}
      </section>
    ),
    []
  );

  // render the footer
  const renderFooter = useMemo(
    () => (
      <footer className={cardFooterClass} aria-label="Card Footer">
        {footer}
      </footer>
    ),
    []
  );

  return (
    <div className={cardWrapperClass} style={style} ref={ref}>
      {header && renderHeader}
      {renderBody}
      {footer && renderFooter}
    </div>
  );
};

Card.displayName = 'Card';

export { Card };
