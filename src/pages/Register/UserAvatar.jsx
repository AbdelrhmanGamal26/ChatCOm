import { Fragment, useRef } from "react";
import styles from "./Register.module.css";

const UserAvatar = ({ imagePreview, userAvatarFallback, onSetImage }) => {
  const imageRef = useRef();

  const handleChange = (e) => {
    if (!e.target.files[0]) return;
    onSetImage(e.target.files[0]);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onSetImage(null);
    imageRef.current.value = null;
  };

  return (
    <Fragment>
      <input
        type="file"
        id="avatar"
        ref={imageRef}
        onChange={handleChange}
        className={styles.chooseAvatar}
      />
      <div className={styles.avatar}>
        <label htmlFor="avatar">
          <img
            src={imagePreview ? imagePreview : userAvatarFallback}
            alt="user"
            className={styles.userAvatar}
          />
          {imagePreview ? "" : <span>Add an avatar</span>}
        </label>
        {imagePreview && (
          <button
            type="button"
            className={styles.removeAvatar}
            onClick={handleRemove}
          >
            Remove
          </button>
        )}
      </div>
    </Fragment>
  );
};

export default UserAvatar;
