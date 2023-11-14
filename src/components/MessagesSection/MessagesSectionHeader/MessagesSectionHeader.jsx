import { useDispatch, useSelector } from "react-redux";

import closeIcon from "../../../media/X-icon.png";
import { chatHandlerActions } from "../../../store/store";
import styles from "../MessagesSection.module.css";

const MessagesSectionHeader = ({ toggleSection }) => {
  const userInfo = useSelector((state) => state.chatData);
  const dispatch = useDispatch();

  const clickHandler = () => {
    if (window.innerWidth <= 750) {
      toggleSection();
    } else {
      dispatch(chatHandlerActions.endChatHandler());
    }
  };

  return (
    <div className={styles.messagesSectionHeader}>
      <p className={styles.friendName}>{userInfo.user?.userName}</p>
      <div className={styles.icons}>
        <button className={styles.moreInfoBtn} onClick={clickHandler}>
          Close Chat
          <img className={styles.moreInfoIcon} src={closeIcon} alt="moreInfo" />
        </button>
      </div>
    </div>
  );
};

export default MessagesSectionHeader;
