import { Link } from "react-router-dom";

import withLoggedIn from "../../util/withLoggedIn";
import SignUpForm from "./SignUpForm";
import styles from "./Register.module.css";

const Register = () => {
  return (
    <div className={`${styles.registerPage} authContainer`}>
      <div className={styles.registerFormWrapper}>
        <h2 className={styles.title}>ChatCom</h2>
        <p className={styles.register}>Register</p>
        <SignUpForm />
        <p className={styles.login}>
          Already have an account? <Link to={"/auth"}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default withLoggedIn(Register);
