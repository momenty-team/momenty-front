import { useState, useEffect } from 'react';

const useKeyboardResize = () => {
  const [viewportHeight, setViewportHeight] = useState<number>(0);
  const [keyboardHeight, setKeyboardHeight] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.visualViewport) return;


    const onResize = () => {
      if (window.visualViewport) {
        const visualViewportHeight = window.visualViewport?.height;
        const heightDiff = visualViewportHeight ? window.innerHeight - visualViewportHeight : 0;
        setKeyboardHeight(heightDiff > 0 ? heightDiff : 0);
        setViewportHeight(window.innerHeight);
      }
    };

    onResize();
    window.visualViewport?.addEventListener('resize', onResize);
    return () => {
      window.visualViewport?.removeEventListener('resize', onResize);
    };
  }, []);

  return { viewportHeight, keyboardHeight };
};

export default useKeyboardResize;
