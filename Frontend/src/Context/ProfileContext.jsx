import React, { createContext ,useState} from 'react'
export const loginContext=createContext();
function ProfileContext({children}) {
  // take the backend link
  const API_URL = import.meta.env.VITE_API_URL;
  console.log("API URL:", API_URL);
  // to set bg color to the selected specialist
  const [selcectedSpecialist,setSelectedSpecialist]=useState("all");
  // to handle the hr in navbar
    const [name,setName]=useState("home");
    // get the user from localstorage if loged in
    const loginUser = JSON.parse(localStorage.getItem("currUser"));
    // to handle user details
    const [userDetails,setUserDetails]=useState(loginUser||null);
    // to handle the userlogin status
    const status=loginUser?true:false;
    const [userLogin,setUserLogin]=useState(status);
     // to handle the appointed doctors
    const [appointedDoc,setAppointedDoc]=useState(status?userDetails?.appointCart:[]);
  return (
    <loginContext.Provider value={{API_URL,userLogin,setUserLogin,name,setName,selcectedSpecialist,setSelectedSpecialist,userDetails,setUserDetails,appointedDoc,setAppointedDoc}} >
    {children}
    </loginContext.Provider>
  )
}

export default ProfileContext