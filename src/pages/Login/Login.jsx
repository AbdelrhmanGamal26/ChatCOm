import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useForm } from "react-hook-form";

import styles from "./Login.module.css";
import withLoggedIn from "../../util/withLoggedIn";
import { useDispatch } from "react-redux";
import { userDataActions } from "../../store/store";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({
    email: "",
    password: "",
  });
  const submitHandler = (data) => {
    const { email, password } = data;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log(userCredentials.user);
        dispatch(
          userDataActions.updateUserData({
            userId: userCredentials.user.uid,
            userName: userCredentials.user.displayName,
            userAvatar: userCredentials.user.photoURL,
          })
        );
        console.log("Welcome! you are now signed in");
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className={`${styles.loginPage} authContainer`}>
      <div className={styles.loginFormWrapper}>
        <h2 className={styles.title}>ChatCom</h2>
        <p className={styles.register}>Login</p>
        <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
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
          <button type="submit" className={styles.submit}>
            Sign in
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
