import styles from "./SideMenu.module.css";

const SideMenuBody = ({ friends }) => {
  return (
    <div className={styles.sideMenuBody}>
      <ul className={styles.friendsList}>
        {friends.map((user) => (
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
  );
};

export default SideMenuBody;
