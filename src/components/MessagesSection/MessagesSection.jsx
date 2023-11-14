import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";

import attachment from "../../media/attachment-svgrepo-com.png";
import imageAttachment from "../../media/add-image-svgrepo-com.png";
import ellipses from "../../media/ellipsis-svgrepo-com.png";
import Message from "../Messages/Message";
import { chatHandlerActions } from "../../store/store";
import { db } from "../../firebase/firebase";
import { changeTimeFormat } from "../../util/utils";
import styles from "./MessagesSection.module.css";

const MessagesSection = () => {
  const userInfo = useSelector((state) => state.chatData);
  const startingChat = useSelector((state) => state.chatHandler);
  const currentUserId = useSelector((state) => state.userData.userId);
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    const getChatMessages = () => {
      const unsub = onSnapshot(doc(db, "chats", userInfo.chatId), (doc) => {
        doc.exists() && setMessages(doc.data());
      });

      return () => {
        unsub();
      };
    };

    userInfo.chatId && getChatMessages();
  }, [userInfo.chatId]);

  useEffect(() => {
    const handleKey = (e) =>
      e.code === "Escape" && dispatch(chatHandlerActions.endChatHandler());
    window.addEventListener("keydown", handleKey);
  }, [dispatch]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const docRef = doc(db, "userChats", currentUserId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const avatar = docSnap.data()[userInfo.chatId].userInfo?.photoURL;

      await updateDoc(doc(db, "chats", userInfo.chatId), {
        messages: arrayUnion({
          userId: currentUserId,
          msgId: Math.random(),
          text: inputRef.current.value,
          photoURL: avatar,
          time: changeTimeFormat(),
        }),
      });
    } else {
      console.log("No such document!");
    }

    inputRef.current.value = "";
  };

  return (
    <section className={styles.messagesSection}>
      {!startingChat && <p className={styles.startChat}>Start a new chat</p>}
      {startingChat && (
        <>
          <div className={styles.messagesSectionHeader}>
            <p className={styles.friendName}>{userInfo.user?.userName}</p>
            <div className={styles.icons}>
              <button className={styles.moreInfoBtn}>
                <img
                  className={styles.moreInfoIcon}
                  src={ellipses}
                  alt="moreInfo"
                />
              </button>
            </div>
          </div>
          <div className={styles.messagesSectionBody}>
            {messages.messages?.map((message) => {
              return <Message key={message.msgId} {...message} />;
            })}
          </div>
          <form
            className={styles.messagesSectionFooter}
            onSubmit={submitHandler}
          >
            <input
              className={styles.messageInput}
              type="text"
              placeholder="Type something!"
              ref={inputRef}
            />
            <div className={styles.actions}>
              <input type="file" id="file" />
              <label htmlFor="file" className={styles.fileAttachment}>
                <img src={attachment} alt="attachment" />
              </label>
              <input type="file" id="image" />
              <label htmlFor="image" className={styles.imageAttachment}>
                <img src={imageAttachment} alt="addImage" />
              </label>
              <button className={styles.sendBtn} type="submit">
                Send
              </button>
            </div>
          </form>
        </>
      )}
    </section>
  );
};

export default MessagesSection;
