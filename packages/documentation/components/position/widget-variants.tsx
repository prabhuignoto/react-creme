export const PositionLeftCode = `
  const container = useRef<HTMLDivElement>();
  const element = useRef<HTMLElement>();

  const {position, onInit} = usePosition(container, element, 'left center', {
    spacing: 0,
  });

  const onRef = useCallback((node: HTMLDivElement) => {
    container.current = node;
    onInit();
  }, []);

  return (
    <div className="rc-demo-position-outer-box" ref={onRef}>
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

  const {position, onInit} = usePosition(container, element, 'right bottom', {
    spacing: 0,
  });

  const onRef = useCallback((node: HTMLDivElement) => {
    container.current = node;
    onInit();
  }, []);

  return (
    <div className="rc-demo-position-outer-box" ref={onref}>
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

  const {position, onInit} = usePosition(container, element, 'left top', {
    spacing: 0,
  });

  const onRef = useCallback((node: HTMLDivElement) => {
    container.current = node;
    onInit();
  }, []);

  return (
    <div className="rc-demo-position-outer-box" ref={onRef}>
      <span
        className="rc-demo-position-inner-box"
        style={{ ...position }}
        ref={element}
      ></span>
    </div>
  );
`;

export const PositionRightTopCode = `
  const container = useRef<HTMLDivElement>();
  const element = useRef<HTMLElement>();

  const {position, onInit} = usePosition(container, element, 'right top', {
    spacing: 0,
  });

  const onRef = useCallback((node: HTMLDivElement) => {
    container.current = node;
    onInit();
  }, []);

  return (
    <div className="rc-demo-position-outer-box" ref={onRef}>
      <span
        className="rc-demo-position-inner-box"
        style={{ ...position }}
        ref={element}
      ></span>
    </div>
  );
`;

export const PositionLeftBottomCode = `
  const container = useRef<HTMLDivElement>();
  const element = useRef<HTMLElement>();

  const {position, onInit} = usePosition(container, element, 'left bottom', {
    spacing: 0,
  });

  const onRef = useCallback((node: HTMLDivElement) => {
    container.current = node;
    onInit();
  }, []);

  return (
    <div className="rc-demo-position-outer-box" ref={onRef}>
      <span
        className="rc-demo-position-inner-box"
        style={{ ...position }}
        ref={element}
      ></span>
    </div>
  );
`;
