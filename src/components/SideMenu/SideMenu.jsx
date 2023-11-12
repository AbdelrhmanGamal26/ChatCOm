import user from "../../media/user.png";
import styles from "./SideMenu.module.css";
import SideMenuBody from "./SideMenuBody";
import SideMenuHeader from "./SideMenuHeader";

const DUMMY_USERS = [
  {
    id: "u1",
    name: "John Doe",
    image: user,
  },
  {
    id: "u2",
    name: "Mohamed Ali",
    image: user,
  },
  {
    id: "u3",
    name: "Omar Ahmed",
    image: user,
  },
  {
    id: "u4",
    name: "Ahmed Fathy",
    image: user,
  },
];

const SideMenu = () => {
  return (
    <section className={styles.sideMenu}>
      <SideMenuHeader />
      <input
        className={styles.searchFriends}
        type="search"
        placeholder="Find a user"
      />
      <SideMenuBody friends={DUMMY_USERS} />
    </section>
  );
};

export default SideMenu;
