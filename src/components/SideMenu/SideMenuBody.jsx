import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doc, onSnapshot } from "firebase/firestore";

import { db } from "../../firebase/firebase";
import { chatDataActions, chatHandlerActions } from "../../store/store";
import styles from "./SideMenu.module.css";

const SideMenuBody = ({ toggleSection }) => {
  const userInfo = useSelector((state) => state.chatData);
  const currentUserId = useSelector((state) => state.userData.userId);
  const [friends, setFriends] = useState({});
  const [finalMessage, setFinalMessage] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const getFriends = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUserId), (doc) => {
        doc.exists() && setFriends(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUserId && getFriends();
  }, [currentUserId]);

  useEffect(() => {
    const getLastMessage = async () => {
      const unsub = await onSnapshot(
        doc(db, "chats", userInfo.chatId),
        (doc) => {
          doc.exists() &&
            setFinalMessage(Object.entries(doc.data())[0][1]?.pop()?.text);
        }
      );

      return () => {
        unsub();
      };
    };

    userInfo.chatId && getLastMessage();
  }, [userInfo.chatId]);

  const startChatHandler = (userInfo) => {
    const combinedId =
      currentUserId > userInfo.uid
        ? currentUserId + userInfo.uid
        : userInfo.uid + currentUserId;

    dispatch(
      chatDataActions.getFriendChatData({ chatId: combinedId, user: userInfo })
    );

    dispatch(chatHandlerActions.startChatHandler());
    toggleSection?.();
  };

  return (
    <div className={styles.sideMenuBody}>
      <ul className={styles.friendsList}>
        {Object.entries(friends)?.map((friend) => (
          <li
            key={friend[0]}
            className={styles.userFriend}
            onClick={() => startChatHandler(friend[1].userInfo)}
          >
            <img
              className={styles.userAvatar}
              src={friend[1].userInfo.photoURL}
              alt="userAvatar"
            />
            <div className={styles.friendNameAndFinalMessage}>
              <p className={styles.userName}>{friend[1].userInfo.userName}</p>
              <p className={styles.finalMessage}>{finalMessage || "image"}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideMenuBody;
