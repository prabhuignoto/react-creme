import { useEffect, useRef } from "react";

function useFirstRender() {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, []);

  return isFirstRender;
}

export { useFirstRender };
