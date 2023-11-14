import Search from "./Search";
import SideMenuBody from "./SideMenuBody";
import SideMenuHeader from "./SideMenuHeader";
import styles from "./SideMenu.module.css";

const SideMenu = () => {
  return (
    <section className={styles.sideMenu}>
      <SideMenuHeader />
      <Search />
      <SideMenuBody />
    </section>
  );
};

export default SideMenu;
