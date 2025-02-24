import React, { useContext } from 'react'
import './Footer.css'
import {assets} from '../../assets/assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom';
import { loginContext } from '../../Context/ProfileContext';

function Footer() {
  const navi=useNavigate();
  const {setName}=useContext(loginContext)
  return (
    <div className='container footer mt-5 d-flex flex-column justify-content-between'>
      < hr className='home-hr' />
        <div className="three row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 mt-3 px-4 ">

        <div className="logo col px-3">

          <img src={assets.logo} alt="" />

          <div className='text-secondary'>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi!
          Quam tempora blanditiis vitae quis molestias unde voluptate voluptatibus.            
          repellendus nemo optio neque sint officia qui cum voluptates ducimus.
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi!</p>
          </div>
        </div>

        <div className="company col px-5">
            <h2>COMPANY</h2>
                <ul className='list-unstyled d-flex flex-column text-secondary gap-2 mt-3'>
                <li onClick={()=>{setName("home");navi('/');scrollTo(0,0)}}>Home</li>
                <li onClick={()=>{setName("about");navi('/about');scrollTo(0,0)}}>About Us</li>
                <li onClick={()=>{setName("contact");navi('/contact');scrollTo(0,0)}}>Contact us</li>
                <li>Privacy Policy</li>
                </ul>
        </div>

        <div className="getintouch col px-3 ml-4">
            <h2>GET IN TOUCH</h2>
            <ul className='d-flex flex-column list-unstyled text-secondary gap-2 mt-3'>
            <li>+1-212-456-7890</li>
            <li>SocietyOfDoctors@gmail.com</li>
            </ul>
        </div>

  </div>
        <div className="copy">
          <p className='text-center mt-1 mb-3'>Copyright 2024 @SocietyOfDoctors.dev - All Rights Reserved.</p>
        </div>

    </div>
  )
}

export default Footer