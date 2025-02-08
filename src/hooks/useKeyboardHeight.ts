import { useEffect, useState } from "react";

const useKeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const [viewportHeight, setViewportHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    const onResize = () => {
      if (window.visualViewport) {
        const visualViewportHeight = window.visualViewport.height;
        const heightDiff = visualViewportHeight ? window.innerHeight - visualViewportHeight : 0;
        setKeyboardHeight(heightDiff > 0 ? heightDiff : 0);
        setViewportHeight(window.innerHeight);
      }
    };

    window.visualViewport?.addEventListener("resize", onResize);
    return () => {
      window.visualViewport?.removeEventListener("resize", onResize);
    };
  }, []);

  return { keyboardHeight, viewportHeight };
};

export default useKeyboardHeight;
