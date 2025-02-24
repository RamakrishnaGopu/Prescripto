import React from 'react'
import { assets } from '../assets/assets/assets_frontend/assets'
import './Contact.css'
function Contact() {
  return (
    <div className='contact container mt-5 d-flex flex-column'>
      <h2 className='fh2 text-center'>CONTACT <span>US</span></h2>
      <div className="inner container d-flex gap-4 justify-content-center flex-wrap mt-4 mb-5">
        <img className='img-fluid' src={assets.contact_image} alt="" />
        <div className="explore  d-flex flex-column justify-content-center gap-2 mt-2 mb-4">
          <h2>OUR OFFICE</h2>
          <div>
          <p>54709 Willms Station</p>
          <p>Suite 350,Whashington,USA</p>
          </div>
          <div>
            <p>Tel:(415)555-0132</p>
            <p>Email:SocietyOfDoctors@gmail.com</p>
          </div>
          <h2>CAREERS AT PRESCRIPTO</h2>
          <p>Learn more about our teams and job openings</p>
          <button className='exp-jobs w-50 h-75'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact