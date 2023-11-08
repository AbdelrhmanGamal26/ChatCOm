import attachment from "../../media/attachment-svgrepo-com.png";
import imageAttachment from "../../media/add-image-svgrepo-com.png";
import ellipses from "../../media/ellipsis-svgrepo-com.png";
import Messages from "../Messages/Messages";
import styles from "./MessagesSection.module.css";

const MessagesSection = () => {
  return (
    <section className={styles.messagesSection}>
      <div className={styles.messagesSectionHeader}>
        <p className={styles.friendName}>Mohamed Ali</p>
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
        <Messages />
        <Messages />
        <Messages />
        <Messages />
        <Messages />
      </div>
      <form
        className={styles.messagesSectionFooter}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className={styles.messageInput}
          type="text"
          placeholder="Type something!"
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
    </section>
  );
};

export default MessagesSection;
