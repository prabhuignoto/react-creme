export const ContainerBound = `
  import React, { useEffect, useRef } from 'react';
  import { useDraggable } from 'react-creme';

  const ref = useRef();
  const boundRef = useRef();
  useDraggable(ref, { boundTo: boundRef });

  return (
    <div
      style={{
        height: '300px',
        padding: '1rem',
        width: '300px',
      }}
      ref={boundRef}
    >
      <div
        style={{
          height: '100px',
          width: '100px',
        }}
        ref={ref}
      ></div>
    </div>
  );
}`;

export const ContainerBoundHorizontal = `
  import React, { useEffect, useRef } from 'react';
  import { useDraggable } from 'react-creme';

  const ref = useRef();
  const boundRef = useRef();
  useDraggable(ref, { boundTo: boundRef, dragDirection: 'HORIZONTAL' });

  return (
    <div
      style={{
        height: '300px',
        padding: '1rem',
        width: '300px',
      }}
      ref={boundRef}
    >
      <div
        style={{
          height: '100px',
          width: '100px',
        }}
        ref={ref}
      ></div>
    </div>
  );
}`;

export const ContainerBoundVertical = `
  import React, { useEffect, useRef } from 'react';
  import { useDraggable } from 'react-creme';

  const ref = useRef();
  const boundRef = useRef();
  useDraggable(ref, { boundTo: boundRef, dragDirection: 'VERTICAL' });

  return (
    <div
      style={{
        height: '300px',
        padding: '1rem',
        width: '300px',
      }}
      ref={boundRef}
    >
      <div
        style={{
          height: '100px',
          width: '100px',
        }}
        ref={ref}
      ></div>
    </div>
  );
}`;

export const Multiple = `
  import React, { useEffect, useRef } from 'react';
  import { useDraggable } from 'react-creme';
  const boundRef = useRef();

  useDraggable(boundRef, {
    boundTo: boundRef,
    makeChildrenDraggable: true,
  });

  const dimensions = useDimensions();

  return (
    <div
      style={{
        height: '300px',
        padding: '1rem',
        width: '300px',
      }}
      ref={boundRef}
      className="rc-demo-drag-outer-box"
    >
      <div
        style={{
          height: 100px,
          width: 100px,
        }}
        className="rc-demo-drag-inner-box"
      ></div>
      <div
        style={{
          height: 100px,
          width: 100px,
        }}
        className="rc-demo-drag-inner-box"
      ></div>
      <div
        style={{
          height: 100px,
          width: 100px,
        }}
        className="rc-demo-drag-inner-box"
      ></div>
    </div>
  );
`;
