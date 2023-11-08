import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const withLoggedOut = (Component) => {
  return (props) => {
    const userId = useSelector((state) => state.userData.userId);

    if (!userId) {
      return <Navigate to="/auth" />;
    }

    return <Component {...props} />;
  };
};

export default withLoggedOut;
