import { useEffect } from "react";

const usePreventScrollOnKeyboard = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let originalStyle = {
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
          // 스크롤 차단
          document.body.style.overflow = "hidden";
          document.body.style.position = "fixed";
          document.body.style.width = "100vw";
          window.addEventListener("touchmove", preventScroll, { passive: false });
          console.log("🚫 키보드 열림 - 스크롤 방지됨");
        } else {
          // 복구
          document.body.style.overflow = originalStyle.overflow;
          document.body.style.position = originalStyle.position;
          window.removeEventListener("touchmove", preventScroll);
          console.log("✅ 키보드 닫힘 - 스크롤 복구됨");
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
