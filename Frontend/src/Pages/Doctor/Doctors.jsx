import React, { useContext, useState } from 'react'
import {doctors} from '../../assets/assets/assets_frontend/assets'
import './Doctors.css'
import GetDoctorCard from '../GetDoctorCard'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { loginContext } from '../../Context/ProfileContext'

function Doctors() {
  const {selcectedSpecialist,setSelectedSpecialist,setName}=useContext(loginContext);
  const navi=useNavigate();
  // gte the spciality doctor
  const {speciality}=useParams();
  //  filter the specified doctors
  const special_doct=doctors.filter((ele)=>speciality===ele.speciality)

  console.log(special_doct);
   const specialists=["General physician","Gynecologist","Neurologist","Dermatologist","Pediatricians","Gastroenterologist"]
  return (
    <div className='alldoctors container'>
      <h4 className='mt-4'>Browse through the doctors specialist.</h4>

{/* doct-div */}
    <div className='d-flex gap-4'>
      <div className="speciality-type mt-4 d-flex flex-column gap-3">
        {
        specialists.map((ele,idx)=>{
       return  <div key={idx} className={`type d-flex flex-column justify-content-center ${selcectedSpecialist===ele?"bg-primary text-white border-0":""} `}
        onClick={()=>{
          setSelectedSpecialist(ele);
        navi(`/doctors/${ele}`)}}
        >{ele}</div>})
        }
  </div>
  {
    // topDoctors doctors
    special_doct.length!=0? <div className="doctors mt-4 d-flex w-100 justify-content-start flex-md-wrap gap-3">{ 
      
      special_doct.map((ele,idx)=>{
      return <GetDoctorCard state={ele}/>})
      
    }</div>
 :
//  all-doct
 <div className="doctors mt-4 w-100 d-flex justify-content-start gap-4 flex-wrap"> 
     {
        doctors.map((ele,idx)=>{
          return <GetDoctorCard state={ele}/>
        })
      }
        </div>
    }
      
</div>


    </div>
  )
}

export default Doctors