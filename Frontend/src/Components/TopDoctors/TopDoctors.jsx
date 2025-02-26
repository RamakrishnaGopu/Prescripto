import React from 'react'
import { doctors } from '../../assets/assets/assets_frontend/assets'
import GetDoctorCard from '../../Pages/GetDoctorCard';
function TopDoctors() {
  return (

    <div className='topdoctors container mt-5 d-flex flex-column align-items-center gap-2'>
      <h2>Top Doctors to Book</h2>
      <div className='topdoct-para text-center'>
        <p>Simply browse through our extensive list of trusted<br></br>doctors.</p>
      </div>

      {/* all doctors */}
      <div className="doctors mt-4 d-flex justify-content-center flex-md-wrap gap-5">
        {
          doctors.slice(0, 8).map((ele, idx) => {
            return <GetDoctorCard state={ele}/>
          })
        }
      </div>
    </div>
  )
}

export default TopDoctors