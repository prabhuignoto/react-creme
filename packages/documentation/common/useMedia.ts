import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

interface MediaState {
  isBigScreen: boolean;
  isDesktop: boolean;
  isExtraLargeScreen: boolean;
  isMobile: boolean;
  isTablet: boolean;
}

function useMedia() {
  const [mediaState, setMediaState] = useState<MediaState | null>(null);
  const isMobile = useMediaQuery({
    query: '(min-width: 300px) and (max-width: 480px)',
  });
  const isTablet = useMediaQuery({
    query: '(min-width: 481px) and (max-width: 1023px)',
  });
  const isDesktop = useMediaQuery({
    query: '(min-width: 1024px) and (max-width: 1279px)',
  });
  const isBigScreen = useMediaQuery({
    query: '(min-width: 1280px) and (max-width: 1899px)',
  });
  const isExtraLargeScreen = useMediaQuery({ query: '(min-width: 1900px)' });

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
  }, [isMobile]);

  return mediaState;
}

export default useMedia;
