import { useState } from "react";
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
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import UserAvatar from "./UserAvatar";
import styles from "./Register.module.css";

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
        placeholder="Password (enter at least 6 characters)"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Min length is 6",
          },
        })}
      />
      <UserAvatar
        imagePreview={imagePreview}
        userAvatarFallback={userAvatarFallback}
        onSetImage={setImage}
      />
      <button type="submit" className={styles.submit}>
        {isLoading ? <LoadingSpinner /> : "Sign up"}
      </button>
    </form>
  );
};

export default SignUpForm;
