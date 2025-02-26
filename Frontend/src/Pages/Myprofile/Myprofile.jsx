import React, { useContext, useState } from 'react'
import './Myprofile.css'
import { useForm } from 'react-hook-form';
import {toast} from 'react-hot-toast'
import { loginContext } from '../../Context/ProfileContext';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets/assets_frontend/assets';

function Myprofile() {
  // importing required state from context
  const {userLogin,setUserDetails,userDetails,setAppointedDoc}=useContext(loginContext);
  // to enable edit option
  const [edit,setEdit]=useState(false);
  // form to register the data
  const {register,handleSubmit,formState:{errors}}=useForm();
  // to navigate to other page
  const navi=useNavigate();

  // function to handle edited date
  function handleEditedDate(editedData){
    const newData={_id:userDetails._id,data:editedData};
  console.log(editedData);
  fetch("http://localhost:3000/updateDetails",{
    method:"POST",
    headers:{
      Accept:"application/json",
      'Content-Type':'application/json'
    },
    body:JSON.stringify(newData)
  })
  .then(res=>res.json())
  .then((data)=>{
    if(data.success){
      setUserDetails(data.payLoad);
      setEdit(false);
      toast.success("saved successfully");
    }else{
      toast.error(data.message);
    }
  }).catch(err=>{
    console.log("err occurred while updating the data")
    toast.error("error ",err?.message)
  })

  }
  return (
    <div className='container my-profile mt-4'>
            {
        userLogin&&userDetails!=null?
        <div className='mt-4'>
          {
            edit==false?
            <div className='mt-4'>
            <img className='upload_img img-fluid w-25' src={assets.profile_pic} alt="" />
            <h2 className='name pt-3'> {userDetails.fullname}</h2>
            <hr className='profile-hr' />
           <div className="contact-information d-flex flex-column gap-1 mt-4">
            <h3>Contact-Information</h3>
            <div className='info d-flex gap-5'>
            <p className='headers'>E-mail:</p>
            <p>{userDetails.email}</p>
            </div> 
            <div className='info d-flex gap-5'>
            <p className='headers'>Ph-Number:</p>
            <p>{userDetails.phonenum}</p>
            </div> 
            <div className='info d-flex gap-5'>
              <p className='headers'>Address:</p>
              <p>{userDetails.address}</p>
              </div> 
              </div>
              <div className="basic-information d-flex flex-column gap-1 mt-4">
              <h3>Basic-Information</h3>
            {
              userDetails.gender!=null?  
              <div className='info d-flex gap-5 p-0'>
              <p className='headers'>Gender:</p>
              <p>{userDetails.gender}</p>
              </div>:<></>
            }
            {
              userDetails.dob!=new Date()? 
              <div className='info d-flex gap-5'>
              <p className='headers'>DOB:</p>
              <p>{userDetails.dob}</p>
              </div>:<></>
            }
            </div>
            <button className='edit-btn btn btn-outline-primary mt-2' onClick={()=>{setEdit(true)}}>Edit</button></div>
            :
              <form className='edit-form w-50 mt-5 mb-5 d-flex justify-content-center p-5 flex-column gap-4' onSubmit={handleSubmit(handleEditedDate)}>
                {/* name */}
                <div className='input-form d-flex flex-column gap-1'>   
                  <label htmlFor="fullname">Fullname</label>
                  <input type="text" name="fullname" defaultValue={userDetails.fullname} {...register('fullname')} id="fullname" />
                  {
                    errors.fullname?.type==='required'&& <p className='log-error'>*name required</p>
                  }
                </div>
                {/* phone number */}
                <div className='input-form d-flex flex-column gap-1'>
                  <label htmlFor="phonenum">Phone Number</label>
                  <input type="number" name="phonenum" defaultValue={userDetails.phonenum} id="phonenum" {...register('phonenum')} />
                </div>
                {/* address */}
                <div className='input-form d-flex flex-column gap-1'>
                  <label htmlFor="address">Address</label>
                  <input type="text" name="address" id="address" defaultValue={"choppadhandhi"} {...register('address')} />
                </div>
                {/* gender */}
                 <div className='input-form d-flex flex-column gap-1' >
                  <label htmlFor="gender">Gender</label>
                  <div className='form-gender d-flex align-items-center gap-3 mt-2'>
                  <input type="radio" name="gender" value={"male"} {...register('gender')} id="male" />
                  <label htmlFor="male">male</label>
                  </div>
                  <div className='form-gender d-flex align-items-center gap-3 mt-2'>
                  <input type="radio" name="gender" value={"female"} {...register('gender')} id="female" />
                  <label htmlFor="female">female</label>
                  </div>
                 </div>
                 {/* dob */}
                <div className='input-form d-flex flex-column gap-1'>
                   <label htmlFor="dob">
                    Date Of Birth
                   </label>
                   <input type="date" {...register('dob')} name="dob" id="dob" />
                </div>
                <button className="save-btn w-25">save-Info</button>
              </form>
           
          }
          

        </div>
        :
        <div className='text-center'>
        <p>no user found</p>
        <button className='btn btn-outline-primary' onClick={()=>{navi('/login')}}>Login</button>
        </div>
      }
    </div>
  )
}

export default Myprofile