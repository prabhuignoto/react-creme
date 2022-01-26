export const PositionLeftCode = `
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
`;

export const PositionRightCode = `
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
`;

export const PositionTopCode = `
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
`;
