import classNames from "classnames";
import { RefObject, useEffect } from "react";

interface FocusSetting {
  bgHighlight: boolean;
}

function useFocus(element: RefObject<HTMLElement>, setting?: FocusSetting) {
  const { bgHighlight }: FocusSetting = setting || { bgHighlight: false };

  const cls = classNames("rc-focus", {
    "rc-focus-bg": bgHighlight,
    "rc-focus-border": !bgHighlight,
  }).split(" ");

  const addClass = (ev: FocusEvent) => {
    (ev.target as HTMLElement).classList.add(...cls);
  };

  const removeClass = (ev: FocusEvent) => {
    cls.forEach((cl) => (ev.target as HTMLElement).classList.remove(cl));
  };

  useEffect(() => {
    const target = element.current;

    if (target) {
      target.addEventListener("focus", addClass);
      target.addEventListener("blur", removeClass);

      return () => {
        target.removeEventListener("focus", addClass);
        target.removeEventListener("blur", removeClass);
      };
    }
  }, [element]);
}

export { useFocus };
