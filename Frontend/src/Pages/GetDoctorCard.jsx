import React from 'react'
import { useContext } from 'react';
import { loginContext } from '../Context/ProfileContext';
import { useNavigate } from 'react-router-dom';

function GetDoctorCard({state}) {
    const {setName}=useContext(loginContext);
    const navi=useNavigate();
  return (
    <div key={state?._idx} onClick={()=>{scrollTo(0,0);setName("null");navi(`/appointment/${state?._idx}`)}} className="doctor p-0">
        <img className='img-fluid' src={state?.image} alt="" />
       <div className="divpara m-2">
        <div className='greencolor d-flex align-items-center gap-2'>
         <p className="green-dot p-0 mb-1"></p>
         <span className='available'>Available</span>
         </div>
         <h3 className='text-dark mb-1'>{state?.name}</h3>
         <p className='mb-0 special'>{state?.speciality}</p>
        </div>
      </div>
  )
}

export default GetDoctorCard