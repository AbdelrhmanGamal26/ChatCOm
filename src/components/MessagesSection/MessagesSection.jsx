import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doc, onSnapshot } from "firebase/firestore";

import Message from "./Message/Message";
import { chatHandlerActions } from "../../store/store";
import { db } from "../../firebase/firebase";
import MessagesSectionActions from "./MessagesSectionActions/MessagesSectionActions";
import MessagesSectionHeader from "./MessagesSectionHeader/MessagesSectionHeader";
import styles from "./MessagesSection.module.css";

const MessagesSection = ({ toggleSection }) => {
  const userInfo = useSelector((state) => state.chatData);
  const startingChat = useSelector((state) => state.chatHandler);
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);

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

  return (
    <section className={styles.messagesSection}>
      {!startingChat && <p className={styles.startChat}>Start a new chat</p>}
      {startingChat && (
        <Fragment>
          <MessagesSectionHeader toggleSection={toggleSection} />
          <div className={styles.messagesSectionBody}>
            {messages.messages?.map((message) => {
              return <Message key={message.msgId} {...message} />;
            })}
          </div>
          <MessagesSectionActions />
        </Fragment>
      )}
    </section>
  );
};

export default MessagesSection;
