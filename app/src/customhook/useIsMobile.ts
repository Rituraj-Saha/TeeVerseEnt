// hooks/useIsMobile.ts
import { useEffect, useState } from "react";

const MOBILE_WIDTH_THRESHOLD = 768;

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined"
      ? window.innerWidth < MOBILE_WIDTH_THRESHOLD
      : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_WIDTH_THRESHOLD);
    };

    window.addEventListener("resize", handleResize);

    // Call initially to ensure correct state
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

export default useIsMobile;
