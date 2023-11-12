import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { signOut } from "firebase/auth";

import { auth } from "../../firebase/firebase";
import { userDataActions } from "../../store/store";
import styles from "./SideMenu.module.css";

const SideMenuHeader = () => {
  const { userName, userAvatar } = useSelector((state) => state.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
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
        console.log(error.code, error.message);
      });
  };

  return (
    <div className={styles.sideMenuHeader}>
      <p className={styles.title}>ChatCom</p>
      <div className={styles.user}>
        <img className={styles.userAvatar} src={userAvatar} alt="userAvatar" />
        <p className={styles.userName}>{userName}</p>
        <button className={styles.logout} onClick={logoutHandler}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideMenuHeader;
