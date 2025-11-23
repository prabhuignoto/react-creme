import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export interface MediaState {
  isBigScreen: boolean;
  isDesktop: boolean;
  isExtraLargeScreen: boolean;
  isMobile: boolean;
  isTablet: boolean;
}

function useMedia() {
  const [mediaState, setMediaState] = useState<MediaState | null>(null);
  const isMobile = useMediaQuery({
    query: '(max-width: 640px)',
  });
  const isTablet = useMediaQuery({
    query: '(min-width: 641px) and (max-width: 1024px)',
  });
  const isDesktop = useMediaQuery({
    query: '(min-width: 1025px) and (max-width: 1279px)',
  });
  const isBigScreen = useMediaQuery({
    query: '(min-width: 1280px) and (max-width: 1535px)',
  });
  const isExtraLargeScreen = useMediaQuery({ query: '(min-width: 1536px)' });

  useEffect(() => {
    if (isMobile !== null) {
      setMediaState({
        isBigScreen: isBigScreen,
        isDesktop: isDesktop,
        isExtraLargeScreen: isExtraLargeScreen,
        isMobile: isMobile,
        isTablet: isTablet,
      });
    }
  }, [isMobile, isTablet, isDesktop, isBigScreen, isExtraLargeScreen]);

  return mediaState;
}

export default useMedia;
