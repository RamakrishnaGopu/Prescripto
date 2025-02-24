import React, { createContext ,useState} from 'react'
import { doctors } from '../assets/assets/assets_frontend/assets';
export const loginContext=createContext();
function ProfileContext({children}) {
  // to handle the hr in navbar
      const [name,setName]=useState("home");
      // to handle the cart
      const [dCart,setDateCart]=useState([]);
      // to handle the appointed doctors
      const [appointedDoc,setAppointedDoc]=useState([]);
      // to handle the userlogin status
    const [userLogin,setUserLogin]=useState(false);
    const [userDetails,setUserDetails]=useState(null);
    // fun to handle cart
    function handleCart(payLoad){
      console.log("ia m in the van")
      let newAppointedDoc=[];
      let appointDate=[];
       for(let i=0;i<Object.keys(payLoad.appointCart).length;i++){
        if(payLoad.appointCart[i]>0){
          newAppointedDoc.push(doctors[i]);
          appointDate.push(payLoad.dateCart[i]);
        }
       }
      //  console.log(appointDate);
       setDateCart(appointDate);
      setAppointedDoc(newAppointedDoc);

    }
  
  return (
    <loginContext.Provider value={{userLogin,setUserLogin,name,setName,userDetails,setUserDetails,appointedDoc,setAppointedDoc,handleCart,dCart,setDateCart}} >
    {children}
    </loginContext.Provider>
  )
}

export default ProfileContext