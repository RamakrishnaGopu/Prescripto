import React, { useContext } from 'react'
import {assets} from '../../assets/assets/assets_frontend/assets.js'
import FindBySpeciality from '../../Components/FindBySpeciality/FindBySpeciality.jsx'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import './Home.css'
import TopDoctors from '../../Components/TopDoctors/TopDoctors.jsx'
import { loginContext } from '../../Context/ProfileContext.jsx'

function Home() {
  const {userLogin,setName,setSelectedSpecialist}=useContext(loginContext)
  const navi=useNavigate()
  return (
    <div className='home'>
        <div className="bookapp container mt-4 d-flex align-items-center justify-content-around">
          <div className="profiles w-50">
               <h1>Book Appointment With Trusted Doctors</h1>
               <div className='d-flex align-items-center gap-3'>
                <img src={assets.group_profiles} className='img-fluid mb-0' alt="" />
                <p>Simply browse through our extensive list of trusted doctors,
                schedule your appointment hassle-free.</p>
               </div>
               <button onClick={()=>{
                navi('/doctors/null');
                setName("alldoct");
                setSelectedSpecialist("all")
                scrollTo(0,0)}} className=" w-50 book-btn mt-3 mb-2">
                Book appointment
                <img className='arrow img-fluid px-2' src={assets.arrow_icon} alt="" />
               </button>
          </div>
          <img className='header_img w-50 img-fluid' src={assets.header_img} alt="" />
        </div>

{/* find by speciality */}
<FindBySpeciality/>
{/* top doctors */}
   <TopDoctors/>

{/* more button */}
<div className="more m-5">
  <button className='btn' onClick={()=>{setName('alldoct');setSelectedSpecialist("all");navi('/doctors/null');scrollTo(0,0)}}>more</button>
</div>

{/* last div create account */}
<div className="bookapp hund-plus container mt-4 d-flex justify-content-around">
          <div className="profiles mt-3 mb-3">
               <h1 className='mt-5'>Book Appointment With 100+ Trusted Doctors</h1>
               {
                userLogin===true?<></>:<Link to='/signup' className='linktologin text-decoration-none'><button onClick={()=>{setName('null');setSelectedSpecialist("all");scrollTo(0,0)}} className="create-acc-btn mt-3 w-25">
                Create account
               </button></Link>  
               }
          </div>
          <img className='w-25 img-fluid mt-5' src={assets.appointment_img} alt="" />
        </div>

    </div>
  )
}

export default Home