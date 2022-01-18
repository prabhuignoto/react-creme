import React, { CSSProperties, useEffect, useMemo, useRef } from 'react';
import ReactDOM from 'react-dom';

interface FocusRingProps {
  x?: number;
  y?: number;
}

const FocusRing: React.FC<FocusRingProps> = ({ x, y }) => {
  const style = useMemo(
    () =>
      ({
        left: x,
        position: 'fixed',
        top: y,
      } as CSSProperties),
    []
  );

  const portalRingContainer = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const focusRing = document.createElement('div');
    portalRingContainer.current = focusRing;
    focusRing.classList.add('rc-focus-ring-container');
    document.body.appendChild(focusRing);
    return () => {
      document.body.removeChild(focusRing);
    };
  }, []);

  return portalRingContainer.current
    ? ReactDOM.createPortal(
        <span style={style}></span>,
        portalRingContainer.current
      )
    : null;
};

export { FocusRing };
