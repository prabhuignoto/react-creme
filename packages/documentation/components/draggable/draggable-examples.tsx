import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import useDraggable from '../../../lib/components/common/effects/useDraggable';
import { responsiveState, themeState } from '../../atoms/home';

function useDimensions() {
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

  const media = useRecoilValue(responsiveState);

  useEffect(() => {
    if (!media) {
      return;
    }
    if (media.isExtraLargeScreen) {
      setDimensions({ height: 350, width: 700 });
    } else if (media.isBigScreen) {
      setDimensions({ height: 300, width: 600 });
    } else if (media.isDesktop) {
      setDimensions({ height: 250, width: 500 });
    } else if (media.isTablet) {
      setDimensions({ height: 200, width: 400 });
    } else if (media.isMobile) {
      setDimensions({ height: 200, width: 300 });
    }
  }, [media]);

  return dimensions;
}

export function BoundToContainer() {
  const ref = useRef(null);
  const boundRef = useRef(null);
  useDraggable(ref, { boundTo: boundRef });

  const theme = useRecoilValue(themeState);
  const dimensions = useDimensions();

  return (
    <div
      style={{
        backgroundColor: theme.darkMode ? '#1e1e1e' : '#f6f6f6',
        height: `${dimensions.height}px`,
        padding: '1rem',
        width: `${dimensions.width}px`,
      }}
      ref={boundRef}
      className="rc-demo-drag-outer-box"
    >
      <div
        style={{
          height: `${dimensions.height / 3}px`,
          width: `${dimensions.width / 3}px`,
        }}
        ref={ref}
        className="rc-demo-drag-inner-box"
      ></div>
    </div>
  );
}

export function BoundToContainerHorizontal() {
  const ref = useRef(null);
  const boundRef = useRef(null);
  useDraggable(ref, { boundTo: boundRef, dragDirection: 'HORIZONTAL' });
  const theme = useRecoilValue(themeState);

  const dimensions = useDimensions();

  return (
    <div
      style={{
        backgroundColor: theme.darkMode ? '#1e1e1e' : '#fff',
        height: `${dimensions.height}px`,
        padding: '1rem',
        width: `${dimensions.width}px`,
      }}
      ref={boundRef}
      className="rc-demo-drag-outer-box"
    >
      <div
        style={{
          height: `${dimensions.height / 3}px`,
          width: `${dimensions.width / 3}px`,
        }}
        ref={ref}
        className="rc-demo-drag-inner-box"
      ></div>
    </div>
  );
}

export function BoundToContainerVertical() {
  const ref = useRef(null);
  const theme = useRecoilValue(themeState);
  const boundRef = useRef(null);
  useDraggable(ref, { boundTo: boundRef, dragDirection: 'VERTICAL' });
  const dimensions = useDimensions();

  return (
    <div
      style={{
        backgroundColor: theme.darkMode ? '#1e1e1e' : '#fff',
        height: `${dimensions.height}px`,
        padding: '1rem',
        width: `${dimensions.width}px`,
      }}
      ref={boundRef}
      className="rc-demo-drag-outer-box"
    >
      <div
        style={{
          height: `${dimensions.height / 3}px`,
          width: `${dimensions.width / 3}px`,
        }}
        ref={ref}
        className="rc-demo-drag-inner-box"
      ></div>
    </div>
  );
}

export function DraggableWidgets() {
  const boundRef = useRef(null);
  const theme = useRecoilValue(themeState);

  useDraggable(boundRef, {
    boundTo: boundRef,
    makeChildrenDraggable: true,
  });

  const dimensions = useDimensions();

  const [enable, setEnable] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setEnable(true);
    }, 2000);
  }, []);

  return (
    <div
      style={{
        backgroundColor: theme.darkMode ? '#1e1e1e' : '#fff',
        height: `${dimensions.height}px`,
        padding: '1rem',
        width: `${dimensions.width}px`,
      }}
      ref={boundRef}
      className="rc-demo-drag-outer-box"
    >
      {enable ? (
        <>
          <div
            style={{
              height: `${dimensions.height / 3}px`,
              width: `${dimensions.width / 3}px`,
            }}
            className="rc-demo-drag-inner-box"
          >
            <span>reddit</span>
          </div>
          <div
            style={{
              height: `${dimensions.height / 3}px`,
              width: `${dimensions.width / 3}px`,
            }}
            className="rc-demo-drag-inner-box"
          ></div>
          <div
            style={{
              height: `${dimensions.height / 3}px`,
              width: `${dimensions.width / 3}px`,
            }}
            className="rc-demo-drag-inner-box"
          ></div>
        </>
      ) : null}
    </div>
  );
}
