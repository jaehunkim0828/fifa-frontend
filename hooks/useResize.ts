import { useState, useEffect } from "react";

interface Size {
  nowWidth: number;
  nowHeight: number;
}

export function useResize(): Size {
  const [windowSize, setWindowSize] = useState<Size>({
    nowWidth: 0,
    nowHeight: 0,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        nowWidth: window.innerWidth,
        nowHeight: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}
