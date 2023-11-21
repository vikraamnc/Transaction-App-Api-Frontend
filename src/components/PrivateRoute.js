import React from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  // get user info form sessionstorage

  const userJson = sessionStorage.getItem("user");
  const userObj = JSON.parse(userJson);

  //checking auth
  const auth = userObj?._id;
  return auth ? children : <Navigate to="/" />;
};
