import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

import { auth, storage, db } from "../../firebase/firebase";
import userAvatarFallback from "../../media/user.png";
import { userDataActions } from "../../store/store";
import { emailRegex } from "../../util/utils";
import styles from "./Register.module.css";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const SignUpForm = ({ onSetError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const [image, setImage] = useState(null);
  const imagePreview = image && URL.createObjectURL(image);
  const imageRef = useRef();

  const handleChange = (e) => {
    if (!e.target.files[0]) return;
    setImage(e.target.files[0]);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setImage(null);
    imageRef.current.value = null;
  };

  const submitHandler = async (data) => {
    setIsLoading(true);
    const { name, email, password } = data;
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = response.user;

      const handleUserRegistration = async (photoURL) => {
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photoURL,
        });

        setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          userName: user.displayName,
          email: user.email,
          photoURL: photoURL,
        });

        setDoc(doc(db, "userChats", user.uid), {});

        dispatch(
          userDataActions.updateUserData({
            userId: user.uid,
            userName: user.displayName,
            userAvatar: photoURL,
          })
        );
        navigate("/");
        setIsLoading(false);
      };

      if (!image) {
        handleUserRegistration(userAvatarFallback);
      } else {
        const storageRef = ref(storage, user.uid);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log("error");
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                handleUserRegistration(downloadURL);
              }
            );
          }
        );
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        onSetError(true);
      }
      setIsLoading(false);
    }
  };

  return (
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
          pattern: emailRegex,
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
      <button type="submit" className={styles.submit}>
        {isLoading ? <LoadingSpinner /> : "Sign up"}
      </button>
    </form>
  );
};

export default SignUpForm;
