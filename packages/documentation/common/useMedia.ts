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
  const isMobile = useMediaQuery({
    query: "(min-width: 300px) and (max-width: 480px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 481px) and (max-width: 1023px)",
  });
  const isDesktop = useMediaQuery({
    query: "(min-width: 1024px) and (max-width: 1279px)",
  });
  const isBigScreen = useMediaQuery({
    query: "(min-width: 1280px) and (max-width: 1899px)",
  });
  const isExtraLargeScreen = useMediaQuery({ query: "(min-width: 1900px)" });

  const resizeObserverRef = useRef<ResizeObserver>(null);

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if (windowWidth) {
      setMediaState({
        isBigScreen: isBigScreen,
        isDesktop: isDesktop,
        isExtraLargeScreen: isExtraLargeScreen,
        isMobile: isMobile,
        isTablet: isTablet,
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
