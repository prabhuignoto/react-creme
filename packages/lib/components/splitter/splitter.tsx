import { AlignJustify } from '@icons';
import classNames from 'classnames';
import React, {
  CSSProperties,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDrag } from '../common/effects/useDrag';
import { isDark } from '../common/utils';
import { SplitterProps } from './splitter-model';
import styles from './splitter.module.scss';

const round = Math.round;

const Splitter: React.FunctionComponent<SplitterProps> = ({
  dir = 'horizontal',
  children,
  minSplitWidth = 200,
  maxSplitWidth = 400,
  minSplitHeight = 100,
  maxSplitHeight = 200,
  border = true,
  handleBarWidth = 6,
}) => {
  const ref = useRef<HTMLElement>(null);
  const controlRef = useRef<HTMLSpanElement>(null);
  const gapWidthHalf = useMemo(
    () => round(handleBarWidth / 2),
    [handleBarWidth]
  );

  const [dragStarted, setDragStarted] = useState(false);

  const isDarkMode = useMemo(() => isDark(), []);

  const [percent, setPercent] = useDrag(
    ref as React.RefObject<HTMLElement>,
    controlRef,
    {
      direction: dir,
      maxX: maxSplitWidth,
      maxY: maxSplitHeight,
      minX: minSplitWidth,
      minY: minSplitHeight,
      observeContainer: true,
      onDragEnd: () => setDragStarted(false),
      onDragStart: () => setDragStarted(true),
      updatePosition: false,
    }
  );

  const isHorizontal = useMemo(() => dir === 'horizontal', []);

  const canSplit = useMemo(() => {
    if (ref.current) {
      const { clientHeight, clientWidth } = ref.current;

      if (dir === 'horizontal') {
        return round(clientWidth * percent) <= maxSplitWidth;
      } else {
        return round(clientHeight * percent) <= maxSplitHeight;
      }
    }
  }, [percent]);

  const controlClass = useMemo(
    () =>
      classNames([styles.control, styles[`control_${dir}`]], {
        [styles.disable]: !canSplit,
        [styles.control_dragged]: dragStarted,
      }),
    [canSplit, dragStarted]
  );

  const partitionOneStyle = useMemo(() => {
    if (ref.current && canSplit) {
      const { clientWidth, clientHeight } = ref.current;
      const width = round(clientWidth * percent) - gapWidthHalf;
      const height = round(clientHeight * percent) - gapWidthHalf;
      const gap = `${handleBarWidth}px`;

      return {
        height: isHorizontal ? '100%' : height,
        width: isHorizontal ? (width !== 0 ? width : minSplitWidth) : '100%',
        ...(isHorizontal ? { paddingRight: gap } : { paddingBottom: gap }),
      } as CSSProperties;
    }
  }, [percent, canSplit, isHorizontal]);

  const partitionTwoStyle = useMemo(() => {
    if (ref.current && canSplit) {
      const { clientWidth, clientHeight } = ref.current;

      if (percent) {
        const gap = handleBarWidth;
        const width = round(clientWidth * (1 - percent)) - gapWidthHalf;
        const height = round(clientHeight * (1 - percent)) - gapWidthHalf;

        return {
          height: isHorizontal ? '100%' : height,
          width: isHorizontal ? width : '100%',
          ...(isHorizontal
            ? { paddingLeft: `${gap}px` }
            : { paddingTop: `-${gap}px` }),
        } as CSSProperties;
      } else {
        return {
          height: isHorizontal ? '100%' : clientHeight - minSplitHeight,
          width: isHorizontal ? clientWidth - minSplitWidth : '100%',
        } as CSSProperties;
      }
    }
  }, [percent, dir, canSplit, isHorizontal]);

  const wrapperClass = useMemo(
    () =>
      classNames([styles.wrapper, styles[`wrapper_${dir}`]], {
        [styles.wrapper_border]: border,
        [styles.dark]: isDarkMode,
      }),
    []
  );

  const setWrapperRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      ref.current = node;
      const { clientWidth, clientHeight } = node;
      let percent = 0;

      if (dir === 'horizontal') {
        percent = minSplitWidth ? minSplitWidth / clientWidth : 0.5;
      } else if (dir === 'vertical') {
        percent = minSplitHeight ? minSplitHeight / clientHeight : 0.5;
      }

      setPercent(percent);
    }
  }, []);

  const handleBarStyle = useMemo(() => {
    if (dir === 'horizontal') {
      return {
        left: `${round(percent * 100)}%`,
        width: `${handleBarWidth}px`,
      } as CSSProperties;
    } else {
      return {
        height: `${handleBarWidth}px`,
        top: `${round(percent * 100)}%`,
      } as CSSProperties;
    }
  }, [percent]);

  return (
    <div className={wrapperClass} ref={setWrapperRef}>
      <div className={controlClass} style={handleBarStyle}>
        <span className={styles.drag_square} ref={controlRef}>
          <AlignJustify />
        </span>
      </div>
      <div className={styles.partition} style={partitionOneStyle}>
        {children && children[0]}
      </div>
      <div className={styles.partition} style={partitionTwoStyle}>
        {children && children[1]}
      </div>
    </div>
  );
};

Splitter.displayName = 'Splitter';

export { Splitter };
