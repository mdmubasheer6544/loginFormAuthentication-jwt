import React, { createContext, useState } from "react";

const userAuth = createContext({
  isLogin: false,
});

export const AuthContextProvider = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState("");

  const changeLogin = (loginValue, id) => {
    setIsLogin(loginValue);
    setUserId(id);
  };
  const logOut = () => {
    setIsLogin(false);
    setUserId("");
    localStorage.removeItem("token");
  };
  const initialState = {
    userId,
    isLogin,
    changeLogin,
    logOut,
  };

  return (
    <userAuth.Provider value={initialState}>{props.children}</userAuth.Provider>
  );
};

export default userAuth;
