import React, { useState } from "react";
import { useHistory } from "react-router";
import { registerUsers } from "../Servicess/api";
import useValidation from "../Hooks/use-validation";
const emailRegx =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const Signup = () => {
  const history = useHistory();
  const [uploadedFile, setUploadedFile] = useState(0);

  const {
    value: firstName,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: firstNameReset,
  } = useValidation((value) => value.trim() !== "");

  const {
    value: lastName,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: lastNameReset,
  } = useValidation((value) => value.trim() !== "");

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useValidation((value) => value.match(emailRegx));

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordeReset,
  } = useValidation((value) => value.trim() !== "");

  const onUploadHandler = (e) => {
    setUploadedFile(e.target.files[0]);
  };

  let isFormValid = false;
  if (firstNameIsValid && lastNameIsValid && emailIsValid && passwordIsValid) {
    isFormValid = true;
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("userProf", uploadedFile);

    if (isFormValid) {
      registerUsers(formData).then((res) => {
        console.log(res);
      });
      history.push("/");
    }
    firstNameReset("");
    lastNameReset("");
    emailReset("");
    passwordeReset("");
  
  };

  return (
    <section className="p-2">
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header bg-secondary text-center text-white">
                <h2 className="text-uppercase font-weight-bold">
                  Registration
                </h2>
              </div>
              <div className="card-body bg-light">
                <form onSubmit={onSubmitHandler} encType="multipart/form-data">
                  <div className="form-group">
                    <input
                      type="text"
                      name="firstName"
                      value={firstName}
                      onChange={firstNameChangeHandler}
                      onBlur={firstNameBlurHandler}
                      placeholder="First Name"
                      className="form-control"
                    />
                    {firstNameHasError && (
                      <small className="text-danger ml-1">
                        First Name is not be empty!
                      </small>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="lastName"
                      value={lastName}
                      onChange={lastNameChangeHandler}
                      onBlur={lastNameBlurHandler}
                      placeholder="Last Name"
                      className="form-control"
                    />
                    {lastNameHasError && (
                      <small className="text-danger ml-1">
                        Last Name is not be empty!
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <input
                      name="email"
                      type="email"
                      value={email}
                      onChange={emailChangeHandler}
                      onBlur={emailBlurHandler}
                      placeholder="Email"
                      className="form-control"
                    />
                    {emailHasError && (
                      <small className="text-danger ml-1">
                        Please enter valid email!
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={passwordChangeHandler}
                      onBlur={passwordBlurHandler}
                      placeholder="Password"
                      className="form-control"
                    />
                    {passwordHasError && (
                      <small className="text-danger ml-1">
                        Password is not be empty!
                      </small>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      name="userProf"
                      onChange={onUploadHandler}
                      type="file"
                      id="formFile"
                      required
                    />
                  </div>
                  <div>
                    <button
                      disabled={!isFormValid}
                      className="btn btn-outline-success register btn-sm"
                    >
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
