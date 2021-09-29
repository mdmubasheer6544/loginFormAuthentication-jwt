import React, { useState } from "react";
import { registerUsers } from "../Servicess/api";

const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    address: "",
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
   registerUsers(userDetails).then(res=>{
     console.log(res);
   })
  };
  const onChangeHandler = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };
  return (
    <section className="p-2">
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header bg-secondary text-center text-white">
                <h2 className="text-uppercase font-weight-bold">Regitration</h2>
              </div>
              <div className="card-body bg-light">
                <form onSubmit={onSubmitHandler}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="firstName"
                      value={userDetails.firstName}
                      onChange={onChangeHandler}
                      placeholder="First Name"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="lastName"
                      value={userDetails.lastName}
                      onChange={onChangeHandler}
                      placeholder="Last Name"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      value={userDetails.email}
                      onChange={onChangeHandler}
                      placeholder="Email"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      name="phone"
                      value={userDetails.phone}
                      onChange={onChangeHandler}
                      placeholder="Phone"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      value={userDetails.password}
                      onChange={onChangeHandler}
                      placeholder="Password"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <textarea
                      name="address"
                      value={userDetails.address}
                      onChange={onChangeHandler}
                      placeholder="Address"
                      className="form-control"
                      rows="4"
                    ></textarea>
                  </div>
                  <div>
                    <button className="btn btn-outline-success register btn-sm">
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
