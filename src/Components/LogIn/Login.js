import React, { useState, useContext, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { loginUsers } from "../Servicess/api";
import userAuth from "../AuthContext/AuthContext";

const Login = () => {
  const userCtx = useContext(userAuth);
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  useEffect(() => {
    userCtx.logOut();
  }, []);

  const onChangeHandler = (e) => {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    loginUsers(userLogin)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.isLogin) {
            localStorage.setItem("token", res.data.token);
            userCtx.changeLogin(res.data.isLogin, res.data.data[0]._id);
            history.push("/profile");
          } else {
            userCtx.changeLogin(res.data.isLogin, res.data.data[0]._id);
          }
        }
      })
      .catch((err) => {
        alert("please enter valid credentials");
      });
  };

  return (
    <section className="p-2">
      <div className="container">
        <div className="row">
          <div className="col-md-3"> </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header bg-secondary text-white text-center">
                <h2 className="text-uppercase font-weight-bold"> Log In </h2>
              </div>
              <div className="card-body bg-light">
                <form action="" onSubmit={onSubmitHandler}>
                  <div className="form-group ">
                    <input
                      type="email"
                      placeholder="Email"
                      className="form-control"
                      name="email"
                      value={userLogin.email}
                      onChange={onChangeHandler}
                    />
                  </div>
                  <div className="form-group ">
                    <input
                      type="password"
                      placeholder="Password"
                      className="form-control"
                      name="password"
                      value={userLogin.password}
                      onChange={onChangeHandler}
                    />
                  </div>
                  <div className="form-group ">
                    <input
                      type="submit"
                      className="btn btn-outline-primary btn-sm"
                      value="Login"
                    />
                  </div>
                </form>
                <div className="text-center">
                  <span className="text-muted">
                    Not a member ?<NavLink to="/sign-up"> Sign up now </NavLink>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3"> </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
