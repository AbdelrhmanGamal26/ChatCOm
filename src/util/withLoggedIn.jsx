import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const withLoggedIn = (Component) => {
  return (props) => {
    const userId = useSelector((state) => state.userData.userId);

    if (userId) {
      return <Navigate to="/" />;
    }

    return <Component {...props} />;
  };
};

export default withLoggedIn;
