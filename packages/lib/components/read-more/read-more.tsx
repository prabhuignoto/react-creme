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

/**
 * ReadMore Component
 *    @property {React.ReactNode} children - The content to be displayed with read more/less functionality.
 *    @property {boolean} RTL - Whether the layout is right-to-left (default: false).
 *    @property {string} size - The size of the read more component ('sm', 'md', or 'lg', default: 'sm').
 *    @property {number} linesToShow - The number of lines to show before truncating with read more (default: 4).
 *    @property {string} readMoreText - The text to display for "Read more" link (default: 'Read more').
 *    @property {string} showLessText - The text to display for "Show less" link (default: 'Show less').
 *    @property {string} position - The position of the read more link ('right' or 'left', default: 'right').
 * @returns {JSX.Element} The ReadMore component.
 */
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

  // State to store the line height and total height of the content
  const [lineHeight, setLineHeight] = useState(0);
  const [totalHeight, setTotalHeight] = useState(0);

  // State to track whether to show more or less content
  const [showMore, setShowMore] = useState(false);

  // Check if the dark mode is enabled
  const isDarkMode = useMemo(() => isDark(), []);

  // Calculate the class for the container based on RTL and position settings
  const containerClass = useMemo(
    () => cx(styles.container, styles[position], RTL ? styles.rtl : ''),
    [position, RTL]
  );

  // Calculate the class for the read more wrapper based on size, RTL, and dark mode
  const readMoreClass = useMemo(
    () =>
      cx(
        styles.wrapper,
        styles[size],
        RTL ? styles.rtl : '',
        isDarkMode ? styles.dark : ''
      ),
    [size, RTL, isDarkMode]
  );

  // Calculate the class for the read more button based on size, position, and dark mode
  const buttonClass = useMemo(
    () =>
      cx(
        styles.button,
        isDarkMode ? styles.dark : '',
        styles[size],
        styles[position]
      ),
    [size, position, isDarkMode]
  );

  // Function to handle ref and get line height and total height
  const onRef = useCallback(
    (node: HTMLParagraphElement) => {
      if (node) {
        ref.current = node;
        const { lineHeight, height } = window.getComputedStyle(node);
        setLineHeight(Math.round(+lineHeight.replace('px', '') * linesToShow));
        setTotalHeight(Math.round(+height.replace('px', '')));
      }
    },
    [linesToShow]
  );

  // Calculate the content height based on whether to show more or less content
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

  // Generate the style to control the height of the content based on show more/less state
  const style = useMemo(() => {
    return { height: contentHeight ? `${contentHeight}px` : 'auto' };
  }, [contentHeight]);

  // Function to toggle show more/less content
  const toggleShowMore = useCallback(() => {
    setShowMore(!showMore);
  }, [showMore]);

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

ReadMore.displayName = 'ReadMore';

export { ReadMore };
