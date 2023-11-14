import { useSelector } from "react-redux";

import styles from "./Message.module.css";

const Message = ({ text, userId, photoURL, time }) => {
  const currentUserId = useSelector((state) => state.userData.userId);

  return (
    <div
      className={`${styles.messageContainer} ${
        userId === currentUserId ? styles.sent : styles.received
      }`}
    >
      <div className={styles.messageSender}>
        <img src={photoURL} alt="userAvatar" />
      </div>
      <div className={styles.messageContent}>
        <div className={styles.messageTextContainer}>
          <p className={styles.messageText}>{text}</p>
          {/* <img src="" alt=""/> */}
        </div>
        <span className={styles.messageTime}>{time}</span>
      </div>
    </div>
  );
};

export default Message;
