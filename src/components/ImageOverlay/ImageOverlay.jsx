import styles from "./ImageOverlay.module.css";

const ImageOverlay = ({ image, onRemove, onEnteringCaption }) => {
  return (
    <div className={styles.imageModalContainer}>
      <img src={image} alt="selectedImage" className={styles.imageModal} />
      <input
        type="text"
        placeholder="Caption (optional)"
        onChange={(e) => onEnteringCaption(e.target.value)}
        className={styles.msgText}
      />
      <div className={styles.actions}>
        <button className={styles.removeBtn} onClick={onRemove}>
          Cancel
        </button>
        <button className={styles.sendImage}>Send</button>
      </div>
    </div>
  );
};

export default ImageOverlay;
