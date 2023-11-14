import { useState, useEffect } from "react";

import MessagesSection from "../../components/MessagesSection/MessagesSection";
import SideMenu from "../../components/SideMenu/SideMenu";
import withLoggedOut from "../../util/withLoggedOut";
import styles from "./Home.module.css";

const HomePage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 750);
  const [showSideMenu, setShowSideMenu] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 750);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSection = () => {
    setShowSideMenu(!showSideMenu);
  };

  return (
    <div className={styles.homePage}>
      {isMobile ? (
        <>
          {showSideMenu ? (
            <SideMenu toggleSection={toggleSection} />
          ) : (
            <MessagesSection toggleSection={toggleSection} />
          )}
        </>
      ) : (
        <>
          <SideMenu />
          <MessagesSection />
        </>
      )}
    </div>
  );
};

export default withLoggedOut(HomePage);
