import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

interface MediaState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isBigScreen: boolean;
}

function useMedia() {
  const [mediaState, setMediaState] = useState<MediaState | null>(null);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  const resizeObserverRef = useRef<ResizeObserver>(null);

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setMediaState({
      isMobile: isTabletOrMobile,
      isTablet: isTabletOrMobile && !isRetina,
      isDesktop: isDesktopOrLaptop,
      isBigScreen: isBigScreen,
    });

    resizeObserverRef.current = new ResizeObserver((entries) => {
      setWindowWidth(entries[0].contentRect.width);
    });

    resizeObserverRef.current.observe(document.body);
  }, [windowWidth]);

  useEffect(() => {
    return () => {
      resizeObserverRef.current.disconnect();
    };
  }, []);

  return mediaState;
}

export default useMedia;
