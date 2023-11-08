import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";

import user from "../../media/user.png";
import styles from "./SideMenu.module.css";
import { userDataActions } from "../../store/store";

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
  const { userName, userAvatar } = useSelector((state) => state.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign out successful!");
        dispatch(
          userDataActions.updateUserData({
            userId: "",
            userName: "",
            userAvatar: null,
          })
        );
        navigate("/auth");
      })
      .catch((error) => {
        console.log("An error happened.");
      });
  };

  return (
    <section className={styles.sideMenu}>
      <div className={styles.sideMenuHeader}>
        <p className={styles.title}>ChatCom</p>
        <div className={styles.user}>
          <img
            className={styles.userAvatar}
            src={userAvatar}
            alt="userAvatar"
          />
          <p className={styles.userName}>{userName}</p>
          <button className={styles.logout} onClick={logoutHandler}>
            Logout
          </button>
        </div>
      </div>
      <input
        className={styles.searchFriends}
        type="search"
        placeholder="Find a user"
      />
      <div className={styles.sideMenuBody}>
        <ul className={styles.friendsList}>
          {DUMMY_USERS.map((user) => (
            <li key={user.id} className={styles.userFriend}>
              <img
                className={styles.userAvatar}
                src={user.image}
                alt="userAvatar"
              />
              <div className={styles.friendNameAndFinalMessage}>
                <p className={styles.userName}>{user.name}</p>
                <p className={styles.finalMessage}>final message</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SideMenu;
