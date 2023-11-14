import Search from "./Search";
import styles from "./SideMenu.module.css";
import SideMenuBody from "./SideMenuBody";
import SideMenuHeader from "./SideMenuHeader";

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
