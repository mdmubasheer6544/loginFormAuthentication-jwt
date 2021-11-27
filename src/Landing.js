import React from 'react';
import {Route } from "react-router-dom";
import Login from './Components/LogIn/Login';
import Navbar from './Components/NavBar/Navbar';
import EditUser from './Components/Profile/EditUser';
import Profile from './Components/Profile/Profile';
import Signup from './Components/SignUp/Signup';

const Landing = () => {
    return (
        <>
        <Navbar/>
        <div className="container mt-5">
          <Route path="/" component={Login} exact></Route>
          <Route path="/sign-up" component={Signup}></Route>
          <Route path="/profile" component={Profile}></Route>
          <Route path="/edit/:id" component={EditUser}></Route>
      </div>
        </>
    );
};

export default Landing;