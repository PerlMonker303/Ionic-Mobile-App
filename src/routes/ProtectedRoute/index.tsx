import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { getCurrentUser } from "../../account/selectors";
import Login from "../Login";

const ProtectedRoute = ({ component, ...rest }: any) => {
  const loggedUser = useSelector(getCurrentUser);

  return <Route {...rest}>{loggedUser ? component : <Login />}</Route>;
};

export default ProtectedRoute;
