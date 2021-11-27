import axios from 'axios';

const url = "http://localhost:8080";

export const registerUsers = async (user) => {
  return await axios.post(`${url}/user/sign-up`, user);
};

export const loginUsers = async (user) => {
  return await axios.post(`${url}/user/login`, user);
};


export const editUser = async (id,user) => {
  return await axios.patch(`${url}/user/editUser/${id}`, user);
};


export const showProfile = async (id) => {
  return await axios.get(`${url}/user/show-user/${id}`
  ,{
    headers:{
     "Authorization":localStorage.getItem("token")
    } 
  })
};

