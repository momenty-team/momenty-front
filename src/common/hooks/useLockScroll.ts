import { useEffect } from "react";

function useLockScroll(lock: boolean) {
  useEffect(() => {
    document.body.style.overflow = lock ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [lock]);
}

export default useLockScroll;
