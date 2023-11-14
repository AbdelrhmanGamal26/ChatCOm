import { Outlet } from "react-router";
import { Fragment } from "react";

const AuthLayout = () => {
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};

export default AuthLayout;
