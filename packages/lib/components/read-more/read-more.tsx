import classNames from 'classnames';
import {
  CSSProperties,
  FunctionComponent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ReadMoreProps } from './read-more.model';
import styles from './read-more.module.scss';

const ReadMore: FunctionComponent<ReadMoreProps> = ({
  children,
  RTL,
  size = 'sm',
  linesToShow = 2,
  readMoreText = 'Read more',
}) => {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const [lineHeight, setLineHeight] = useState(0);
  const [totalHeight, setTotalHeight] = useState(0);
  const [showMore, setShowMore] = useState(false);

  const readMoreClass = useMemo(
    () => classNames(styles.wrapper, styles[size], RTL ? styles.rtl : ''),
    []
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
    <>
      <p ref={onRef} className={readMoreClass} style={style as CSSProperties}>
        {children}
      </p>
      <button onClick={toggleShowMore} className={styles.button}>
        {readMoreText}
      </button>
    </>
  );
};

export { ReadMore };
