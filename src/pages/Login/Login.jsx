import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";

import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import { emailRegex } from "../../util/utils";
import { auth } from "../../firebase/firebase";
import withLoggedIn from "../../util/withLoggedIn";
import { userDataActions } from "../../store/store";
import styles from "./Login.module.css";

const Login = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({
    email: "",
    password: "",
  });
  const submitHandler = (data) => {
    setIsLoading(true);
    const { email, password } = data;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        dispatch(
          userDataActions.updateUserData({
            userId: userCredentials.user.uid,
            userName: userCredentials.user.displayName,
            userAvatar: userCredentials.user.photoURL,
          })
        );
        navigate("/");
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.code === "auth/invalid-login-credentials") {
          setError(true);
        }
        setIsLoading(false);
      });
  };

  return (
    <div className={`${styles.loginPage} authContainer`}>
      <div className={styles.loginFormWrapper}>
        <h2 className={styles.title}>ChatCom</h2>
        <p className={styles.login}>Login</p>
        {error && <p style={{ color: "red" }}>Invalid email or password</p>}
        <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
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
          <button type="submit" className={styles.submit}>
            {isLoading ? <LoadingSpinner /> : "Sign in"}
          </button>
        </form>
        <p className={styles.login}>
          New to our application?{" "}
          <Link to={"/auth/register"}>Register now</Link>
        </p>
      </div>
    </div>
  );
};

export default withLoggedIn(Login);
