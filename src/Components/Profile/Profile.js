import React, { useEffect,useContext,useState } from "react";
import { showProfile } from "../Servicess/api";
import userAuth from "../AuthContext/AuthContext";

const Profile = () => {
    const userCtx=useContext(userAuth);
    const[userDetails,setUserDetails]=useState({})
  useEffect(() => {
    showProfile(userCtx.userId).then(res=>{
        console.log(res.data);
        setUserDetails(res.data.data)
    })
  }, [userCtx.userId]);

  return (
    <section className="p-2">
      <div className="container">
        <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
                <table className="table table-hover table-striped text-center">
                    <thead className="bg-success text-white">
                        <tr>
                            <th className="text-uppercase font-weight-bold">First Name</th>
                            <th className="text-uppercase font-weight-bold">last Name</th>
                            <th className="text-uppercase font-weight-bold">Email</th>
                            <th className="text-uppercase font-weight-bold">Phone</th>
                            <th className="text-uppercase font-weight-bold">Address</th>
                        </tr>
                    </thead>
                        <tbody>
                            <tr>
                                <td>{userDetails.firstName}</td>
                                <td>{userDetails.lastName}</td>
                                <td>{userDetails.email}</td>
                                <td>{userDetails.phone}</td>
                                <td>{userDetails.address}</td>
                                
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
