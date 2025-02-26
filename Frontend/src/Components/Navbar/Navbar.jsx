import React, { useContext } from 'react';
import './Navbar.css'; 
import { loginContext } from '../../Context/ProfileContext';
import {toast} from 'react-hot-toast';
import { assets } from '../../assets/assets/assets_frontend/assets';
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar() {

  const {name, setName, userLogin, setUserLogin,setSelectedSpecialist } = useContext(loginContext);
  const navi = useNavigate();
  // fun to handle logout
  function handleLogout(){
        setName('none'); 
        setUserLogin(false); 
        // remove thelocalstorage
        localStorage.removeItem('currUser');
        // remove the token
        localStorage.removeItem('jwtToken');
  }


  return (
    <div className="navbar-total container">
      {/* <div className="navbar abhi d-flex justify-content-between align-items-center mt-3"> */}
      <div className="navbar nav-bar">

        <img
          className="logo nav-item img-fluid"
          src={assets.logo}
          onClick={() =>{setName('home');setSelectedSpecialist("all"); navi('/')}}
          alt="Logo"
        />

        {/* <ul className='nav-item d-flex justify-context-evenly gap-4 pt-1'> */}
        <ul className='nav-item nav-ul pt-1'>

          <div>
            <NavLink className="link text-decoration-none list-unstyled" to="/">
              <li onClick={() => {setName('home');setSelectedSpecialist("all")}}>HOME</li>
            </NavLink>
            {name === 'home' && <hr className='below-hr' />}
          </div>
          <div>
            <NavLink className="link text-decoration-none list-unstyled" to="/doctors/null">
              <li onClick={() => {setName('alldoct');setSelectedSpecialist("all")}}>ALL DOCTORS</li>
            </NavLink>
            {name === 'alldoct' && <hr className='below-hr' />}
          </div>
          <div>
            <NavLink className="link text-decoration-none list-unstyled" to="/about">
              <li onClick={() => {setName('about');setSelectedSpecialist("all")}}>ABOUT</li>
            </NavLink>
            {name === 'about' && <hr className='below-hr' />}
          </div>
          <div>
            <NavLink className="link text-decoration-none list-unstyled" to="/contact">
              <li onClick={() => {setName('contact');setSelectedSpecialist("all")}}>CONTACT</li>
            </NavLink>
            {name === 'contact' && <hr className='below-hr' />}
          </div>
        </ul>

        <div className="btn create-btn border-0 nav-item">
          {userLogin === false ? (
            <button onClick={() => { setName('none'); navi('/signup'); }}>
              Create account
            </button>
          ) : (
            <div className='profile-photo'>
            <div className="dropdown">
              <img
                className="profile_img img-fluid w-100 dropdown-toggle border-0"
                id="dropdownMenuButton"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                src={assets.profile_pic}
                alt="User profile"
              />
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => { setName('none'); navi('/my-profile'); }}
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => { setName('none'); navi('/my-appointments'); }}
                  >
                    Appointments
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => {handleLogout()}}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
            </div>
          )}
        </div>
        {/* menu bar */}
        <div className="menu">
        <svg data-bs-toggle="offcanvas"  data-bs-target="#offcanvasExample"  role='button' xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
</svg>

<div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  <div className="offcanvas-header">
    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
    <div className='d-flex flex-column gap-3'>
      <a href='/' className='text-decoration-none text-secondary'>Home</a>
      <a href='/doctors/null' className='text-decoration-none text-secondary'>All-Doctors</a>
      <a href='/about' className='text-decoration-none text-secondary'>About-Us</a>
      <a href='/contact' className='text-decoration-none text-secondary' >Contact-Us</a>
      {
        userLogin===false?<a href='/signup' className='text-decoration-none text-secondary'>Create-Account</a>:<a href='/my-profile' className='text-decoration-none text-primary' onClick={()=>{setName('home');}}>Profile</a>
      }
      <a href='/my-appointments' className='text-decoration-none text-secondary' >My-Appointments</a>
      {
        userLogin===true?<a href='/' className='text-decoration-none text-secondary'>Log-Out</a>:<></>
      }
    </div> 
  </div>
</div>

</div>
      </div>
      <hr className="home-hr" />
    </div>
  );
}

export default Navbar;

