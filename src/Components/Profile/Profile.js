import React, { useEffect, useContext, useState } from "react";
import { showProfile } from "../Servicess/api";
import userAuth from "../AuthContext/AuthContext";
import { useHistory } from "react-router";

const Profile = () => {
  const userCtx = useContext(userAuth);
  const [userDetails, setUserDetails] = useState({});
  const history = useHistory();
  useEffect(() => {
    showProfile(userCtx.userId).then((res) => {
      setUserDetails(res.data.data);
    });
  }, [userCtx.userId]);

  
  const edit = (id) => {
    history.push(`edit/${id}`);
  };

  return (
    <section className="p-2">
      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <table className="table table-hover table-striped text-center rounded">
              <thead className="bg-success text-white">
                <tr>
                  <th className="text-uppercase font-weight-bold">Profile</th>
                  <th className="text-uppercase font-weight-bold">
                    First Name
                  </th>
                  <th className="text-uppercase font-weight-bold">last Name</th>
                  <th className="text-uppercase font-weight-bold">Email</th>
                  <th className="text-uppercase font-weight-bold">Password</th>
                  <th className="text-uppercase font-weight-bold">Edit</th>
                </tr>
              </thead>
              <tbody>
                <tr className="align-items-center">
                  <td>
                    <img src={`http://localhost:8080/${userDetails.userProf}`} alt="userimg" className="img-fluid rounded-pill"  />
                  </td>
                  <td>{userDetails.firstName}</td>
                  <td>{userDetails.lastName}</td>
                  <td>{userDetails.email}</td>
                  <td>{userDetails.password}</td>
        
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => edit(userDetails._id)}
                    >
                      Edit
                    </button>
                   
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
