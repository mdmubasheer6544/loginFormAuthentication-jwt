import React,{useState,useEffect} from 'react';
import { showProfile,editUser } from '../Servicess/api';
import { useParams,useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const EditUser = (props) => {
 

    const[userDetails,setUserDetails]=useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        userProf:"",
    });
    const history=useHistory()
    const params=useParams();
   
    
    

    useEffect(() => {
        
        showProfile(params.id).then(res=>{
            setUserDetails(res.data.data)
           
        })


    }, [params.id]);


    const onSubmitHandler=(e)=>{
       e.preventDefault();

      

 


       editUser(params.id,userDetails).then(res=>{
           console.log(res);
           
       })
       history.push("/profile");

    }

   const onChangeHandler=(e)=>{
       setUserDetails({
           ...userDetails,
           [e.target.name]:e.target.value
       })

   }
    return (
        <section className="p-2">
        <div className="container">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-header bg-secondary text-center text-white">
                  <h2 className="text-uppercase font-weight-bold">Update Profile</h2>
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
                        type="password"
                        name="password"
                        value={userDetails.password}
                        onChange={onChangeHandler}
                        placeholder="Password"
                        className="form-control"
                      />
                    </div>
  
                   
                
                    <div>
                      <button className="btn btn-outline-success register btn-sm">
                        Update
                      </button>
                      <Link to="/profile" className="btn  btn-outline-danger btn-sm">Cancel</Link>
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

export default EditUser;