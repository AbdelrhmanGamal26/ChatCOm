import { useEffect } from "react";

import styles from "./Backdrop.module.css";

export default function Backdrop({ onClick, disableScroll = true }) {
  const hideImageModal = (e) => {
    e.stopPropagation();
    onClick?.();
  };

  useEffect(() => {
    if (disableScroll) {
      document.documentElement.style.setProperty("overflow", "hidden");
      return () => {
        document.documentElement.style.removeProperty("overflow");
      };
    }
  }, [disableScroll]);

  return <div className={styles.backdrop} onClick={hideImageModal} />;
}
