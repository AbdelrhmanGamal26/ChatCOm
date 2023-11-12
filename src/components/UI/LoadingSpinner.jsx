import { PacmanLoader } from "react-spinners";

import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={styles.loadingSpinner}>
      <PacmanLoader color="#fff" size={14} />
    </div>
  );
};

export default LoadingSpinner;
