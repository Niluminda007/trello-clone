import { useState, useEffect } from "react";

const useMediaQuery = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isTabletLandscape, setIsTabletLandscape] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mobileMediaQuery = window.matchMedia(
      "(min-width: 300px) and (max-width: 520px)"
    );

    const tabletMediaQuery = window.matchMedia(
      "(min-width: 521px) and (max-width: 767px)"
    );

    const tabletLandscapeMediaQuery = window.matchMedia(
      "(min-width: 768px) and (max-width: 1023px)"
    );

    const desktopMediaQuery = window.matchMedia("(min-width: 1024px)");

    const mobileListener = () => setIsMobile(mobileMediaQuery.matches);
    const tabletListener = () => setIsTablet(tabletMediaQuery.matches);
    const tabletLandscapeListener = () =>
      setIsTabletLandscape(tabletLandscapeMediaQuery.matches);
    const desktopListener = () => setIsDesktop(desktopMediaQuery.matches);

    mobileListener();
    tabletListener();
    tabletLandscapeListener();
    desktopListener();

    window.addEventListener("resize", mobileListener);
    window.addEventListener("resize", tabletListener);
    window.addEventListener("resize", tabletLandscapeListener);
    window.addEventListener("resize", desktopListener);

    return () => {
      window.removeEventListener("resize", mobileListener);
      window.removeEventListener("resize", tabletListener);
      window.removeEventListener("resize", tabletLandscapeListener);
      window.removeEventListener("resize", desktopListener);
    };
  }, []);

  return { isMobile, isTablet, isDesktop, isTabletLandscape };
};

export default useMediaQuery;
