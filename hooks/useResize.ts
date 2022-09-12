import { useState, useEffect } from "react";

export default function useResize(): number {
  const [windowSize, setWindowSize] = useState<number>(0);
  useEffect(() => {
    function handleResize() {
      setWindowSize(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}
