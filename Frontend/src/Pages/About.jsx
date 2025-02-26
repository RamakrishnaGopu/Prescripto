import React from 'react'
import { assets } from '../assets/assets/assets_frontend/assets'
import './About.css'
function About() {
  return (
<div className='about container mt-5'>
     <h2 className='fh2 text-center'>ABOUT  <span>US</span></h2>
      <div className="about-vision d-flex justify-content-center align-items-center mt-5 gap-4 w-100">
  <div className="col-lg-4 col-sm-12 px-0">
    <img className="img-fluid w-sm-25 mx-auto" src={assets.about_image} alt="About Prescripto" />
  </div>
  <div className="explore col-lg-8 col-sm-12 mt-3 d-flex flex-column gap-4 px-0">
    <p className="para">
      Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
    </p>
    <p className="para">
      Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
    </p>
    <h2 className="m-0">Our Vision</h2>
    <p className="para">
      Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
    </p>
  </div>
</div>

<div className="whychooseus mt-5">

  <h2 className='chooseh2'>Why Choose  <span>US</span></h2>
      {/* inner boxes */}
<div className="boxes w-100 mt-5 row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 mb-5">
   <div className="box col">
  <h4>EFFICIENCY:</h4>
  <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
    </div>
   <div className="box col">
  <h4>CONVINIENCE:</h4>
  <p>Access to a network of trusted healthcare professionals in your area.</p>
   </div>
  <div className="box col">
  <h4>PERSONALIZATION:</h4>
  <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
  </div>
</div>
 </div>
</div>
  )
}

export default About