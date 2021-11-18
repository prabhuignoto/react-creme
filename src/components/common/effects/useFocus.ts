import { RefObject, useCallback, useEffect, useRef } from "react";

interface FocusSetting {
  bgHighlight?: boolean;
}

function useFocus(
  element: RefObject<HTMLElement>,
  setting?: FocusSetting,
  cb?: () => void
) {
  const targetRef = useRef<HTMLElement | null>(null);

  const addClass = (ev: FocusEvent | KeyboardEvent) => {
    const ele = targetRef.current as HTMLElement;
    const classesToAdd = ["rc-focus", "rc-halo"];
    const classesToRemove = ["rc-de-halo"];

    classesToAdd.forEach((c) => {
      if (!ele.classList.contains(c)) {
        ele.classList.add(c);
      }
    });

    classesToRemove.forEach((c) => {
      if (ele.classList.contains(c)) {
        ele.classList.remove(c);
      }
    });

    setTimeout(() => {
      ele.classList.remove("rc-halo");
      ele.classList.add("rc-de-halo");
    }, 250);
  };

  const removeClass = () => {
    const ele = targetRef.current as HTMLElement;
    ele.classList.add("rc-lost-focus");
    ele.classList.remove("rc-focus");

    setTimeout(() => {
      ele.classList.remove("rc-lost-focus");
      ele.classList.remove("rc-de-halo");
    }, 250);
  };

  const handleKeyboard = useCallback((ev: KeyboardEvent) => {
    if (ev.key === "Enter" || ev.key === " " || ev.key === "Spacebar") {
      ev.preventDefault();
      addClass(ev);

      if (cb) {
        cb();
      }
    }
  }, []);

  const onFocus = useCallback(
    (ev: FocusEvent) => {
      if (ev.target === targetRef.current) {
        addClass(ev);
      }
    },
    [addClass]
  );

  const onFocusLost = useCallback(
    (ev: FocusEvent) => {
      if (ev.target === targetRef.current) {
        removeClass();
      }
    },
    [removeClass]
  );

  useEffect(() => {
    const target = element.current;

    targetRef.current = target;

    if (target) {
      target.addEventListener("blur", onFocusLost);
      target.addEventListener("click", onFocus);
      target.addEventListener("focus", onFocus);
      target.addEventListener("keydown", handleKeyboard);

      return () => {
        target.removeEventListener("blur", removeClass);
        target.removeEventListener("click", onFocus);
        target.removeEventListener("focus", onFocus);
        target.removeEventListener("keydown", handleKeyboard);
      };
    }
  }, [element]);
}

export { useFocus };
