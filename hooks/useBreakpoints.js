import { useEffect, useLayoutEffect, useState } from "react";

const useBreakpoints = () => {
  const getDeviceConfig = (width) => {
    if (width < 640) {
      return "xs";
    } else if (width >= 640 && width < 768) {
      return "sm";
    } else if (width >= 768 && width < 1024) {
      return "md";
    } else if (width >= 1024 && width < 1280) {
      return "lg";
    } else if (width >= 1280 && width < 1536) {
      return "xl";
    } else return "2xl";
  };
  const [breakPoint, setBreakpoint] = useState();

  useEffect(() => {
    function calcInnerWidth() {
      setBreakpoint(getDeviceConfig(window.innerWidth));
    }
    window.addEventListener("resize", calcInnerWidth);
  }, []);

  useEffect(() => {
    setBreakpoint(getDeviceConfig(window.innerWidth));
  }, []);

  const isMobile = ["xs", "sm"].includes(breakPoint);

  const isTablet = ["md"].includes(breakPoint);

  const isDesktop = !isMobile && !isTablet;

  return { breakPoint, isMobile, isDesktop, isTablet };
};

export { useBreakpoints };
