import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import imageAttachment from "../../media/add-image-svgrepo-com.png";
import ellipses from "../../media/ellipsis-svgrepo-com.png";
import Message from "../Messages/Message";
import { chatHandlerActions } from "../../store/store";
import { db, storage } from "../../firebase/firebase";
import { changeTimeFormat } from "../../util/utils";
import ImageModal from "../ImageModal/ImageModal";
import styles from "./MessagesSection.module.css";

const MessagesSection = () => {
  const userInfo = useSelector((state) => state.chatData);
  const startingChat = useSelector((state) => state.chatHandler);
  const currentUserId = useSelector((state) => state.userData.userId);
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const inputRef = useRef();
  const [caption, setCaption] = useState("");

  const [image, setImage] = useState(null);
  const imagePreview = image && URL.createObjectURL(image);
  const imageRef = useRef();

  const handleChange = (e) => {
    if (!e.target.files[0]) return;
    setImage(e.target.files[0]);
  };

  const handleRemove = () => {
    setImage(null);
    imageRef.current.value = null;
  };

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

    if (!imagePreview) {
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
    } else {
      const storageRef = ref(storage, Date());
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log("Error uploading image");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            if (docSnap.exists()) {
              const avatar = docSnap.data()[userInfo.chatId].userInfo?.photoURL;

              await updateDoc(doc(db, "chats", userInfo.chatId), {
                messages: arrayUnion({
                  userId: currentUserId,
                  msgId: Math.random(),
                  text: caption,
                  photoURL: avatar,
                  time: changeTimeFormat(),
                  sentImage: downloadURL,
                }),
              });
            } else {
              console.log("No such document!");
            }
          });
        }
      );
      setImage(null);
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
            {imagePreview && (
              <ImageModal
                imagePreview={imagePreview}
                onRemove={handleRemove}
                onClick={handleRemove}
                onEnteringCaption={setCaption}
              />
            )}
            <input
              className={`${styles.messageInput} ${
                imagePreview && styles.hide
              }`}
              type="text"
              placeholder="Type something!"
              ref={inputRef}
            />
            <div className={styles.actions}>
              <input
                type="file"
                id="image"
                ref={imageRef}
                onChange={handleChange}
              />
              <label
                htmlFor="image"
                className={`${styles.imageAttachment} ${
                  imagePreview && styles.hide
                }`}
              >
                <img src={imageAttachment} alt="addImage" />
              </label>
              <button
                className={`${styles.sendBtn} ${imagePreview && styles.hide}`}
                type="submit"
              >
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
