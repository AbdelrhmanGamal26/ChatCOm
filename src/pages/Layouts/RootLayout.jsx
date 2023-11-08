import { Outlet } from "react-router";

import styles from "./Root.module.css";

const RootLayout = () => {
  return (
    <div className={styles.rootPage}>
      <Outlet />
    </div>
  );
};

export default RootLayout;
