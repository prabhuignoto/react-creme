import cx from 'classnames';
import {
  CSSProperties,
  FunctionComponent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { isDark } from '..';
import { ReadMoreProps } from './read-more.model';
import styles from './read-more.module.scss';

const ReadMore: FunctionComponent<ReadMoreProps> = ({
  children,
  RTL,
  size = 'sm',
  linesToShow = 4,
  readMoreText = 'Read more',
  showLessText = 'Show less',
  position = 'right',
}) => {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const [lineHeight, setLineHeight] = useState(0);
  const [totalHeight, setTotalHeight] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const isDarkMode = useMemo(() => isDark(), []);

  const containerClass = useMemo(
    () => cx(styles.container, styles[position], RTL ? styles.rtl : ''),
    [RTL]
  );

  const readMoreClass = useMemo(
    () =>
      cx(
        styles.wrapper,
        styles[size],
        RTL ? styles.rtl : '',
        isDarkMode ? styles.dark : ''
      ),
    [isDarkMode]
  );

  const buttonClass = useMemo(
    () =>
      cx(
        styles.button,
        isDarkMode ? styles.dark : '',
        styles[size],
        styles[position]
      ),
    [isDarkMode]
  );

  const onRef = useCallback((node: HTMLParagraphElement) => {
    if (node) {
      ref.current = node;
      const { lineHeight, height } = window.getComputedStyle(node);
      setLineHeight(Math.round(+lineHeight.replace('px', '') * linesToShow));
      setTotalHeight(Math.round(+height.replace('px', '')));
    }
  }, []);

  const toggleShowMore = useCallback(() => {
    setShowMore(!showMore);
  }, [showMore]);

  const contentHeight = useMemo(() => {
    if (!totalHeight && !lineHeight) {
      return;
    }

    if (showMore) {
      return totalHeight;
    } else {
      return lineHeight;
    }
  }, [showMore, lineHeight, totalHeight]);

  const style = useMemo(() => {
    return { height: contentHeight ? `${contentHeight}px` : 'auto' };
  }, [contentHeight]);

  return (
    <div className={containerClass}>
      <p ref={onRef} className={readMoreClass} style={style as CSSProperties}>
        {children}
      </p>
      <button onClick={toggleShowMore} className={buttonClass}>
        {showMore ? showLessText : readMoreText}
      </button>
    </div>
  );
};

export { ReadMore };
