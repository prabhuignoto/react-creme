import classNames from "classnames";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import ResizeObserver from "resize-observer-polyfill";
import { useDebouncedCallback } from "use-debounce";
import "./App.scss";
import { Drawer } from "./components";
import "./design/colors.scss";
import "./design/layout.scss";
import "./design/list.scss";
import AppRoutes from "./expo/app-routes";
import { asideState, responsiveState } from "./expo/atoms/home";
import Footer from "./expo/common/Footer";
import { Header } from "./expo/common/Header";
import SidebarHome from "./expo/common/sidebar-home";
import useMedia from "./expo/common/useMedia";

function App() {
  const sectionRef = useRef<HTMLElement>(null);
  const asideRef = useRef<HTMLElement>(null);
  const [left, setLeft] = React.useState(-1);
  const resizeObserver = useRef<ResizeObserver>();

  const [asideValue, setAsideValue] = useRecoilState(asideState);
  const setResponsiveState = useSetRecoilState(responsiveState);

  const media = useMedia();
  const appRef = useRef<HTMLDivElement>(null);
  const [openAside, setOpenAside] = React.useState(false);
  const location = useLocation();

  const sidebarClass = useMemo(() => {
    return classNames("app-aside", {
      "app-aside-visible": left > -1,
    });
  }, [left]);

  const positionAside = useCallback(() => {
    if (sectionRef.current && asideRef.current && !media.isMobile) {
      const asideWidth = asideRef.current.offsetWidth;
      const { left: sectionLeft } = sectionRef.current.getBoundingClientRect();
      if (sectionLeft - asideWidth > 0) {
        setLeft(sectionLeft - asideWidth);
      } else {
        setLeft(0);
      }
    }
  }, [media]);

  const debouncedPositionAside = useDebouncedCallback(positionAside, 100);

  const onRef = (el: HTMLElement) => {
    if (el && asideRef.current) {
      sectionRef.current = el;
      positionAside();
    }
  };

  useEffect(() => {
    resizeObserver.current = new ResizeObserver(() => debouncedPositionAside());
    resizeObserver.current.observe(document.body);
    return () => {
      resizeObserver.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (asideValue.isOpen) {
      setOpenAside(true);
    }
  }, [asideValue]);

  useEffect(() => {}, [location]);

  useEffect(() => {
    if (!media) {
      return;
    }

    setResponsiveState({
      isMobile: media.isMobile,
      isTablet: media.isTablet,
      isDesktop: media.isDesktop,
      isBigScreen: media.isBigScreen,
      isExtraLargeScreen: media.isExtraLargeScreen,
    });
  }, [media]);

  const toggleOpen = useCallback(() => setOpenAside((prev) => !prev), []);

  const canRenderAside = useMemo(() => {
    return media && media.isMobile && openAside;
  }, [media, openAside]);

  const onClose = useCallback(() => {
    setOpenAside(false);
    setAsideValue({ isOpen: false });
  }, []);

  return (
    <div className="app" ref={appRef}>
      {media && !media.isMobile && (
        <aside
          className={sidebarClass}
          ref={asideRef}
          style={{ left: `${left}px` }}
        >
          <SidebarHome />
        </aside>
      )}
      {canRenderAside && (
        <Drawer onClose={onClose} showClose>
          <SidebarHome />
        </Drawer>
      )}
      <section className="app-main-section" ref={onRef}>
        {location.pathname !== "/" && (
          <Header isMobile={media && media.isMobile} onOpen={toggleOpen} />
        )}
        <Suspense fallback={<span></span>}>
          <AppRoutes />
        </Suspense>
        <Footer />
      </section>
    </div>
  );
}

export default App;
