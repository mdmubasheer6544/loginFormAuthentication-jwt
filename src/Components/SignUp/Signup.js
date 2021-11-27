import React, { useState } from "react";
import { useHistory } from "react-router";
import { registerUsers } from "../Servicess/api";


const Signup = () => {
  const history=useHistory();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    userProf: "",
  });



  const onUploadHandler = (e) => {
    setUploadedFile(e.target.files[0]);
  };


  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();

      formData.append("firstName", userDetails.firstName);
      formData.append("lastName", userDetails.lastName);
      formData.append("email", userDetails.email);
      formData.append("phone", userDetails.phone);
      formData.append("password", userDetails.password);
      formData.append("address", userDetails.address);
      formData.append("userProf", uploadedFile);


   registerUsers(formData).then(res=>{
     console.log(res);
   })
   setUserDetails({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    userProf: "",
  })
   history.push('/');
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
                <form onSubmit={onSubmitHandler}  encType="multipart/form-data">
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
                      name="email"
                      type="email"
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
                  <div className="form-group">
                  <input className="form-control" name="userProf" onChange={onUploadHandler} type="file" id="formFile" />
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
