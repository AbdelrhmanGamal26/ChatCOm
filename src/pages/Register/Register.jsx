import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase";

import userAvatarFallback from "../../media/user.png";
import styles from "./Register.module.css";
import { useDispatch } from "react-redux";
import { userDataActions } from "../../store/store";
import withLoggedIn from "../../util/withLoggedIn";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      image: null,
    },
  });
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

  const submitHandler = (data) => {
    const { name, email, password } = data;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        dispatch(
          userDataActions.updateUserData({
            userId: user.uid,
            userName: name,
            userAvatar: image ? image : userAvatarFallback,
          })
        );
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: image ? image : userAvatarFallback,
        })
          .then(() => {
            console.log("profile updated successfully!");
          })
          .catch((error) => {
            console.log("updating profile failed!");
          });
        navigate("/");
      })
      .catch((error) => {
        console.log("sign up failed! please try again later");
      });
  };

  return (
    <div className={`${styles.registerPage} authContainer`}>
      <div className={styles.registerFormWrapper}>
        <h2 className={styles.title}>ChatCom</h2>
        <p className={styles.register}>Register</p>
        <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
          <input
            className={styles.credentials}
            type="text"
            placeholder="Display name"
            {...register("name", {
              required: "Name is required",
              maxLength: {
                value: 20,
                message: "Max length is 20",
              },
            })}
          />
          <input
            className={styles.credentials}
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            })}
          />
          <input
            className={styles.credentials}
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Min length is 6",
              },
            })}
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
                <img
                  src={userAvatarFallback}
                  alt="user"
                  className={styles.fallback}
                />
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
          Already have an account? <Link to={"/auth"}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default withLoggedIn(Register);
