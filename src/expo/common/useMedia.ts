import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

interface MediaState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isBigScreen: boolean;
  isExtraLargeScreen: boolean;
}

function useMedia() {
  const [mediaState, setMediaState] = useState<MediaState | null>(null);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 992px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1200px)" });
  const isExtraLargeScreen = useMediaQuery({ query: "(min-width: 1900px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 768px)" });
  const isMobile = useMediaQuery({ query: "(min-width: 576px)" });

  const resizeObserverRef = useRef<ResizeObserver>(null);

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if (windowWidth) {
      setMediaState({
        isMobile: isMobile,
        isTablet: isTablet,
        isDesktop: isDesktopOrLaptop,
        isBigScreen: isBigScreen,
        isExtraLargeScreen: isExtraLargeScreen,
      });
    }
  }, [windowWidth]);

  useEffect(() => {
    resizeObserverRef.current = new ResizeObserver((entries) => {
      setWindowWidth(entries[0].contentRect.width);
    });

    resizeObserverRef.current.observe(document.body);

    return () => {
      resizeObserverRef.current.disconnect();
    };
  }, []);

  return mediaState;
}

export default useMedia;
