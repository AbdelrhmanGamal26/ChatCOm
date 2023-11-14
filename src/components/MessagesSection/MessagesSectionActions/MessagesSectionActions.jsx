import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import imageAttachment from "../../../media/add-image-svgrepo-com.png";
import { db, storage } from "../../../firebase/firebase";
import { changeTimeFormat } from "../../../util/utils";
import ImageModal from "../../ImageModal/ImageModal";
import styles from "../MessagesSection.module.css";

const MessagesSectionActions = () => {
  const currentUserId = useSelector((state) => state.userData.userId);
  const userInfo = useSelector((state) => state.chatData);
  const avatar = useSelector((state) => state.userData.userAvatar);
  const [image, setImage] = useState(null);
  const imagePreview = image && URL.createObjectURL(image);
  const [caption, setCaption] = useState("");
  const imageRef = useRef();
  const [inputText, setInputText] = useState("");

  const handleChange = (e) => {
    if (!e.target.files[0]) return;
    setImage(e.target.files[0]);
  };

  const handleRemove = () => {
    setImage(null);
    imageRef.current.value = null;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const docRef = doc(db, "userChats", currentUserId);
    const docSnap = await getDoc(docRef);

    if (!imagePreview) {
      if (docSnap.exists()) {
        await updateDoc(doc(db, "chats", userInfo.chatId), {
          messages: arrayUnion({
            userId: currentUserId,
            msgId: Math.random(),
            text: inputText,
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

    setInputText("");
  };

  return (
    <form className={styles.messagesSectionFooter} onSubmit={submitHandler}>
      {imagePreview && (
        <ImageModal
          imagePreview={imagePreview}
          onRemove={handleRemove}
          onClick={handleRemove}
          onEnteringCaption={setCaption}
        />
      )}
      <input
        className={`${styles.messageInput} ${imagePreview && styles.hide}`}
        type="text"
        placeholder="Type something!"
        onChange={(e) => setInputText(e.target.value)}
        value={inputText}
      />
      <div className={styles.actions}>
        <input type="file" id="image" ref={imageRef} onChange={handleChange} />
        <label
          htmlFor="image"
          className={`${styles.imageAttachment} ${imagePreview && styles.hide}`}
        >
          <img src={imageAttachment} alt="addImage" />
        </label>
        <button
          className={`${styles.sendBtn} ${imagePreview && styles.hide}`}
          type="submit"
          disabled={inputText.trim().length === 0}
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default MessagesSectionActions;
