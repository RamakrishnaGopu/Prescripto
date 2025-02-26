import React, { useContext } from 'react'
import './FindBySpeciality.css'
import {specialityData} from '../../assets/assets/assets_frontend/assets.js'
import { Link } from 'react-router-dom'
import {loginContext} from '../../Context/ProfileContext'

function FindBySpeciality() {
  const {setName,setSelectedSpecialist}=useContext(loginContext);
  return (
    <div className="container d-flex flex-column align-items-center mt-5 gap-3 findbyspeciality">
  <h2>Find By Speciality</h2>
  <div className="text-center m-0 p-0 find-para">
 <p>Simply browse through our extensive list of trusted doctors,<br />
 schedule your appointment hassle-free.</p>
  </div>
  <div className="speciality_images mt-3 d-flex justify-content-center gap-4 align-items-center flex-wrap">
    {
            specialityData.map((ele,idx)=>{
              return <Link onClick={()=>{
                setSelectedSpecialist(ele.speciality)
                setName("alldoct");
                scrollTo(0,0)
              }
              } to={`doctors/${ele.speciality}`} 
                className="speciality_type d-flex flex-column align-items-center text-decoration-none gap-2 text-dark" key={idx}> 
                <img src={ele.image} className='img-fluid spec-image' alt="" />
                <p className='sepcial-para'>{ele.speciality}</p>
              </Link>
            })
          }
  </div>
</div>
  )
}

export default FindBySpeciality