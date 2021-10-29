import classNames from "classnames";
import { RefObject, useCallback, useEffect, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";

interface FocusSetting {
  bgHighlight: boolean;
}

function useFocus(element: RefObject<HTMLElement>, setting?: FocusSetting) {
  const { bgHighlight }: FocusSetting = setting || { bgHighlight: false };

  const targetRef = useRef<HTMLElement | null>(null);

  const cls = classNames("rc-focus", {
    "rc-focus-border": !bgHighlight,
    "rc-halo": true,
  }).split(" ");

  const addClass = (ev: FocusEvent) => {
    (targetRef.current as HTMLElement).classList.add(...cls);
  };

  const removeClass = () => {
    const ele = targetRef.current as HTMLElement;
    cls.forEach((cl) => ele.classList.remove(cl));
    ele.classList.remove("rc-un-halo");
  };

  const unHalo = useCallback(
    (target: HTMLElement) => target.classList.add("rc-un-halo"),
    []
  );

  const haloCreator = useCallback((ev: MouseEvent) => {
    const target = targetRef.current as HTMLElement;
    target.classList.add("rc-halo");
    target.classList.remove("rc-un-halo");

    setTimeout(() => unHalo(target), 350);
  }, []);

  const haloDebounced = useDebouncedCallback(haloCreator, 10);

  useEffect(() => {
    const target = element.current;

    targetRef.current = target;

    if (target) {
      target.addEventListener("focus", addClass);
      target.addEventListener("blur", removeClass);
      target.addEventListener("click", haloDebounced);

      return () => {
        target.removeEventListener("focus", addClass);
        target.removeEventListener("blur", removeClass);
        target.removeEventListener("click", haloDebounced);
      };
    }
  }, [element]);
}

export { useFocus };
