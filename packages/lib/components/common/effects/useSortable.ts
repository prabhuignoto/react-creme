import { RefObject, useEffect } from 'react';

interface Settings {
  rowGap: number;
}

// Define the hook
const useSortable: (
  ref: RefObject<HTMLElement>,
  settings?: Settings
) => void = (ref, settings = { rowGap: 0 }) => {
  useEffect(() => {
    const node = ref.current;

    // Ensure the node exists
    if (node) {
      const items = Array.from(
        node?.querySelectorAll(':scope > *')
      ) as HTMLElement[];

      // Check if the node has any child elements
      if (items?.length) {
        const totalHeight = items.reduce(
          (a, b) => a + b.clientHeight + settings.rowGap,
          0
        );

        // Modify parent styles
        node.style.cssText += `;position: relative;height: ${totalHeight}px;border: 1px solid red;`;

        // Adjust each child item's position
        items.forEach((item, index) => {
          const accumulatedHeight = items
            .slice(0, index)
            .reduce((a, b) => a + b.clientHeight + settings.rowGap, 0);

          item.style.position = 'absolute';
          item.style.top = `${accumulatedHeight}px`;
        });
      }
    }
  }, [ref, settings]);
};

export default useSortable;
