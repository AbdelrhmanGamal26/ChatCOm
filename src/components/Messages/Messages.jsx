import user from "../../media/user.png";
import styles from "./Messages.module.css";

const Messages = () => {
  return (
    <div className={styles.messageContainer}>
      <div className={styles.messageSender}>
        <img src={user} alt="userAvatar" />
      </div>
      <div className={styles.messageContent}>
        <div className={styles.messageTextContainer}>
          <p className={styles.messageText}>hello</p>
        </div>
        <span className={styles.messageTime}>12:00PM</span>
      </div>
    </div>
  );
};

export default Messages;
