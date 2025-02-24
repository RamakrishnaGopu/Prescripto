import React from 'react'
import { doctors } from '../../assets/assets/assets_frontend/assets'
import './TopDoctors.css'
import { useNavigate } from 'react-router-dom'
function TopDoctors() {
  const navi = useNavigate();
  return (

    <div className='topdoctors container mt-5 d-flex flex-column align-items-center gap-2'>
      <h2>Top Doctors to Book</h2>
      <div className='topdoct-para text-center'>
        <p>Simply browse through our extensive list of trusted<br></br>doctors.</p>
      </div>

      {/* all doctors */}
      <div className="doctors container mt-4 d-flex justify-content-evenly flex-wrap gap-4">
        {
          doctors.slice(0, 8).map((ele, idx) => {
            return <div onClick={() => { scrollTo(0, 0); navi(`/appointment/${ele._id}`) }} key={idx} 
            className="doctor d-flex flex-column" >
              <img className='img-fluid' src={ele.image} alt="" />
              <div className="divpara m-3">
                <div className='greencolor d-flex align-items-center gap-1 p-0 m-0'>
                  <p className="green-dot p-0 mb-1"></p>
                  <span className='available'>Available</span>
                </div>
                <h3 className="text-dark mb-1">{ele.name}</h3>
                <p className='spec text-secondary mb-1'>{ele.speciality}</p>
              </div>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default TopDoctors