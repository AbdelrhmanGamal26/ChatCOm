import MessagesSection from "../../components/MessagesSection/MessagesSection";
import SideMenu from "../../components/SideMenu/SideMenu";
import withLoggedOut from "../../util/withLoggedOut";

import styles from "./Home.module.css";

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <SideMenu />
      <MessagesSection />
    </div>
  );
};

export default withLoggedOut(HomePage);
