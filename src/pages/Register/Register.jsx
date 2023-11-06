import { Link } from "react-router-dom";
import { useRef, useState } from "react";

import user from "../../media/user.png";
import styles from "./Register.module.css";

const Register = () => {
  const [image, setImage] = useState(null);
  const imageRef = useRef();

  const handleChange = (e) => {
    if (!e.target.files[0]) return;
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setImage(null);
    imageRef.current.value = null;
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className={`${styles.registerPage} authContainer`}>
      <div className={styles.registerFormWrapper}>
        <h2 className={styles.title}>ChatCom</h2>
        <p className={styles.register}>Register</p>
        <form className={styles.form} onSubmit={submitHandler}>
          <input
            className={styles.credentials}
            type="text"
            placeholder="Display name"
          />
          <input
            className={styles.credentials}
            type="email"
            placeholder="Email"
          />
          <input
            className={styles.credentials}
            type="password"
            placeholder="Password"
          />
          <input
            type="file"
            id="avatar"
            ref={imageRef}
            onChange={handleChange}
            className={styles.chooseAvatar}
          />
          <div className={styles.avatar}>
            <label htmlFor="avatar">
              {!image ? (
                <img src={user} alt="user" className={styles.fallback} />
              ) : (
                <div className={styles.avatarContainer}>
                  <img
                    src={image}
                    alt="avatar"
                    className={styles.avatarImage}
                  />
                </div>
              )}
              {image ? "" : <span>Add an avatar</span>}
            </label>
            {image && (
              <button
                type="button"
                className={styles.removeAvatar}
                onClick={handleRemove}
              >
                Remove
              </button>
            )}
          </div>
          <button type="submit" className={styles.submit}>
            Sign up
          </button>
        </form>
        <p className={styles.login}>
          Already have an account? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
