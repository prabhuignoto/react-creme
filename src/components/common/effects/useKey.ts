import { RefObject, useCallback, useEffect, useRef } from "react";

const useKey = function (ref: RefObject<HTMLElement>, cb: () => void) {
  const handler = (ev: KeyboardEvent) => {
    if (ev.key === "" || ev.key === "Enter" || ev.key === "Space") {
      cb && cb();
    }
  };

  const _ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      _ref.current = ref.current;
      ref.current.addEventListener("keyup", handler);
    }
  }, [ref.current]);

  useEffect(() => {
    return () => {
      if (_ref.current) {
        ref.current?.removeEventListener("keyup", handler);
      }
    };
  }, []);
};

const useKeyWithDependency = function (
  ref: RefObject<HTMLElement>,
  cb: () => void,
  dependency: boolean = false
) {
  const handler = useCallback((ev: KeyboardEvent) => {
    if (ev.key === "" || ev.key === "Enter" || ev.key === "Space") {
      cb && cb();
    }
  }, []);

  const _ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (ref.current && !dependency) {
      _ref.current = ref.current;
      ref.current.addEventListener("keyup", handler);
    }
  }, [ref.current, dependency]);

  useEffect(() => {
    return () => {
      if (_ref.current) {
        ref.current?.removeEventListener("keyup", handler);
      }
    };
  }, []);
};

export { useKey, useKeyWithDependency };
