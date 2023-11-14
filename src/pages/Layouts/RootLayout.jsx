import { Fragment } from "react";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};

export default RootLayout;
