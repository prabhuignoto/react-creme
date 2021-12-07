import { RefObject, useEffect, useRef } from "react";
import useDraggable from "./useDraggable";

interface Settings {
  rowGap: number;
}

const useSortable: (
  ref: RefObject<HTMLElement>,
  settings?: Settings
) => void = (ref, settings = { rowGap: 10 }) => {
  const totalItems = useRef<Number>(0);

  const parentRef = useRef<HTMLElement | null>(null);

  useDraggable(ref, {
    makeChildrenDraggable: true,
    dragDirection: "HORIZONTAL",
  });

  useEffect(() => {
    const node = ref.current;

    if (node) {
      parentRef.current = node;

      const items = Array.from(
        node?.querySelectorAll(":scope > *")
      ) as HTMLElement[];

      if (node && items?.length) {
        totalItems.current = items.length;

        node.style.cssText +=
          ";" +
          `
          position: relative;
          height: ${items.reduce((a, b) => a + b.clientHeight, 0)}px;
          border: 1px solid red;
          `;

        items.forEach((item, index) => {
          const ele = item as HTMLElement;
          ele.style.position = "absolute";

          if (index > 0) {
            ele.style.top = `${items
              .slice(0, index)
              .reduce((a, b) => a + b.clientHeight, 0)}px`;
          } else {
            ele.style.top = "0px";
          }
        });
      }
    }
  }, [ref]);
};

export default useSortable;
