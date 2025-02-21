import { useEffect } from "react";

const usePreventScrollOnKeyboard = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const originalStyle = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
    };

    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    const handleResize = () => {
      if (window.visualViewport) {
        const heightDiff = window.innerHeight - window.visualViewport.height;
        if (heightDiff > 100) {
          document.body.style.overflow = "hidden";
          document.body.style.position = "fixed";
          document.body.style.width = "100vw";
          window.addEventListener("touchmove", preventScroll, { passive: false });
        } else {
          document.body.style.overflow = originalStyle.overflow;
          document.body.style.position = originalStyle.position;
          window.removeEventListener("touchmove", preventScroll);
        }
      }
    };

    window.visualViewport?.addEventListener("resize", handleResize);
    window.addEventListener("focusin", handleResize);
    window.addEventListener("focusout", handleResize);

    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
      window.removeEventListener("focusin", handleResize);
      window.removeEventListener("focusout", handleResize);
      window.removeEventListener("touchmove", preventScroll);
      document.body.style.overflow = originalStyle.overflow;
      document.body.style.position = originalStyle.position;
    };
  }, []);
};

export default usePreventScrollOnKeyboard;
