import React, { useContext } from "react";
import { assets } from "../../assets/assets/assets_frontend/assets";
import { useNavigate } from "react-router-dom";
import { loginContext } from "../../Context/ProfileContext";
import "./Footer.css"; 
function Footer() {
  const navigate = useNavigate();
  const { setName } = useContext(loginContext);

  return (
    <div className="container mt-5 footer">
      <hr className="home-hr" />

      {/* Grid Layout */}
      <div className="row mt-4">
        {/* Logo & Description */}
        <div className="col-lg-4 col-md-6 col-12 mb-4">
          <img src={assets.logo} className="img-fluid footer-logo" alt="Logo" />
          <p className="text-secondary mt-3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit
            consequatur ratione ducimus ipsa quas officia!
          </p>
        </div>

        {/* Company Links */}
        <div className="col-lg-4 col-md-6 col-12 mb-4">
          <h5>COMPANY</h5>
          <ul className="list-unstyled text-secondary">
            <li onClick={() => { setName("home"); navigate("/"); scrollTo(0, 0); }}>Home</li>
            <li onClick={() => { setName("about"); navigate("/about"); scrollTo(0, 0); }}>About Us</li>
            <li onClick={() => { setName("contact"); navigate("/contact"); scrollTo(0, 0); }}>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Get in Touch */}
        <div className="col-lg-4 col-md-12 col-12 mb-4">
          <h5>GET IN TOUCH</h5>
          <ul className="list-unstyled text-secondary">
            <li> +1-212-456-7890</li>
            <li>SocietyOfDoctors@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center mt-3">
        <p className="text-secondary">&copy; 2024 SocietyOfDoctors.dev - All Rights Reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
