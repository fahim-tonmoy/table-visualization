import React from "react";
import { Navigate } from "react-router";

const PrivateRoute = ({children}) => {
  const loggedInUser = localStorage.getItem("user_token");

  if(loggedInUser) {
    return children;
  }
  return <Navigate to='/' />
}
export default PrivateRoute;