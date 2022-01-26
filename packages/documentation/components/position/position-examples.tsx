import React, { useRef } from 'react';
import { usePosition } from '../../../lib/components/common/effects/usePosition';
import './position-examples.scss';

export const PositionLeft = () => {
  const container = useRef<HTMLDivElement>();
  const element = useRef<HTMLElement>();

  const position = usePosition(container, element, 'left center', {
    spacing: 0,
  });

  return (
    <div className="rc-demo-position-outer-box" ref={container}>
      <span
        className="rc-demo-position-inner-box"
        style={{ ...position }}
        ref={element}
      ></span>
    </div>
  );
};

export const PositionRight = () => {
  const container = useRef<HTMLDivElement>();
  const element = useRef<HTMLElement>();

  const position = usePosition(container, element, 'right center', {
    spacing: 0,
  });

  return (
    <div className="rc-demo-position-outer-box" ref={container}>
      <span
        className="rc-demo-position-inner-box"
        style={{ ...position }}
        ref={element}
      ></span>
    </div>
  );
};

export const PositionTop = () => {
  const container = useRef<HTMLDivElement>();
  const element = useRef<HTMLElement>();

  const position = usePosition(container, element, 'top center', {
    spacing: 0,
  });

  return (
    <div className="rc-demo-position-outer-box" ref={container}>
      <span
        className="rc-demo-position-inner-box"
        style={{ ...position }}
        ref={element}
      ></span>
    </div>
  );
};
