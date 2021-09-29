import React, { useContext } from "react";
import { Link } from "react-router-dom";
import userAuth from "../AuthContext/AuthContext";

const Navbar = () => {
  const userCtx = useContext(userAuth);
  return (
    <nav className="navbar navbar-expand-sm bg-teal navbar-dark">
      <div className="container-fluid">
        <div
          className="navbar-toggler"
          data-target="#my-menu"
          data-toggle="collapse"
        >
          <span className="navbar-toggler-icon"></span>
        </div>
        <Link to="#" className="navbar-brand">
          Logo
        </Link>

        <div className="navbar-collapse collapse" id="my-menu">
          <ul className="navbar-nav mr-auto ">
           {userCtx.isLogin&& <li className=" nav-item m-2">
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            </li>}
          </ul>
          <ul className="navbar-nav profile">
            {!userCtx.isLogin && (
              <li className=" nav-item m-2">
                <Link to="/" className="nav-link">
                  Login
                </Link>
              </li>
            )}

            {userCtx.isLogin && (
              <li className=" nav-item m-2">
                <Link to="/" className="nav-link">
                  LogOut
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
