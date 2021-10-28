import classNames from "classnames";
import { RefObject, useCallback, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

interface FocusSetting {
  bgHighlight: boolean;
}

function useFocus(element: RefObject<HTMLElement>, setting?: FocusSetting) {
  const { bgHighlight }: FocusSetting = setting || { bgHighlight: false };

  const cls = classNames("rc-focus", {
    "rc-focus-border": !bgHighlight,
    "rc-halo": true,
  }).split(" ");

  const addClass = (ev: FocusEvent) => {
    (ev.target as HTMLElement).classList.add(...cls);
  };

  const removeClass = (ev: FocusEvent) => {
    const ele = ev.target as HTMLElement;
    cls.forEach((cl) => ele.classList.remove(cl));
    ele.classList.remove("rc-halo");
  };

  const unHalo = useCallback(
    (target: HTMLElement) => target.classList.add("rc-un-halo"),
    []
  );

  const haloCreator = useCallback((ev: MouseEvent) => {
    const target = ev.target as HTMLElement;
    target.classList.add("rc-halo");
    target.classList.remove("rc-un-halo");

    setTimeout(() => unHalo(target), 300);
  }, []);

  const haloDebounced = useDebouncedCallback(haloCreator, 10);

  useEffect(() => {
    const target = element.current;

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
