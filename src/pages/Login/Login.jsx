import { Link } from "react-router-dom";

import styles from "./Login.module.css";

const Login = () => {
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className={`${styles.loginPage} authContainer`}>
      <div className={styles.loginFormWrapper}>
        <h2 className={styles.title}>ChatCom</h2>
        <p className={styles.register}>Login</p>
        <form className={styles.form} onSubmit={submitHandler}>
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
          <button type="submit" className={styles.submit}>
            Sign in
          </button>
        </form>
        <p className={styles.login}>
          New to our application? <Link to={"/register"}>Register now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
