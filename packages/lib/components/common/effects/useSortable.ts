import { RefObject, useEffect, useRef } from 'react';

interface Settings {
  rowGap: number;
}

const useSortable: (
  ref: RefObject<HTMLElement>,
  settings?: Settings
) => void = ref => {
  const totalItems = useRef<number>(0);

  const parentRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;

    if (node) {
      parentRef.current = node;

      const items = Array.from(
        node?.querySelectorAll(':scope > *')
      ) as HTMLElement[];

      if (node && items?.length) {
        totalItems.current = items.length;

        node.style.cssText +=
          ';' +
          `
          position: relative;
          height: ${items.reduce((a, b) => a + b.clientHeight, 0)}px;
          border: 1px solid red;
          `;

        items.forEach((item, index) => {
          const ele = item as HTMLElement;
          ele.style.position = 'absolute';

          if (index > 0) {
            ele.style.top = `${items
              .slice(0, index)
              .reduce((a, b) => a + b.clientHeight, 0)}px`;
          } else {
            ele.style.top = '0px';
          }
        });
      }
    }
  }, [ref]);
};

export default useSortable;
