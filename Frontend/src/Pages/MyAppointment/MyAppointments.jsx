import React, { useContext, useState } from 'react'
import { loginContext } from '../../Context/ProfileContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import './MyAppointments.css'
import { assets } from '../../assets/assets/assets_frontend/assets';

function MyAppointments() {
  const navi = useNavigate();
  // to show paying methods
  const [pay, setPay] = useState(false);
  // const [removedDoct, setRemovedDoct] = useState([]);
  const { userLogin, setAppointedDoc, appointedDoc, userDetails,API_URL } = useContext(loginContext)

  //function to remove appointed doctor from database
  function handleRemovedAppointments(docObj) {
    const obj = {
      email: userDetails.email,
      _idx: docObj._idx
    }
    fetch(`${API_URL}/removeappointment`, {
      method: "POST",
      credentials:"include",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${localStorage.getItem('jwtToken')}`
      }
      , body: JSON.stringify(obj)
    }).then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("currUser",JSON.stringify(data.payLoad));
          setAppointedDoc([...data.payLoad.appointCart]);
          toast.success(data.message);
          scrollTo(0, 0)
        } else {
          toast.error(data.message);
        }

      })
      .catch(err => {
        toast.error("error occuuredd");
        console.log(err)
      })
  }



  return (
    <div className='my-appointments container mt-4'>
      {
        userLogin && appointedDoc.length != 0 && <h1 className='text-center mt-3'>My-Appointments</h1>
      }
      {
        userLogin && appointedDoc?.length != 0 ?
          <div className='appoint-div mt-5 container'>
            {
              appointedDoc?.map((ele, idx) => {
                return <div className='appointed-doctor' key={ele._idx}>
                  <div className='doct-info'>
                    <img className='doctor-img' src={ele.image} alt="" />
                    <div className="inside-appointments m-0">
                      <h2 className='m-0 mt-2'>{ele.name}</h2>
                      <p><span className='address mt-3'>{ele.speciality}</span></p>
                      <h6 className='m-0'><span>Address: </span></h6>
                      <p className='m-0'>{ele.address?.line1 || "address not provided"}</p>
                      <p className='m-0'>{ele.address?.line2 || "address not provided"}</p>
                        <div> 
                          <p> <span>Date & Time: </span>{ele.date} - {ele.day} - {ele.time}</p>
                        </div>
                    </div>
                  </div>
                  <div className='appointment-btns d-flex justify-content-center gap-3 flex-column px-5'>
                    {pay === false ? <button className='btn1' onClick={() => { setPay(true) }}>
                      pay Here
                    </button>
                      :
                      <div className='pay-btns'>
                        <button className='btn4'>
                          <img className='stripe' src={assets.stripe_logo} alt="" />
                        </button>
                        <button className='btn4'>
                          <img src={assets.razorpay_logo} alt="" />
                        </button>

                      </div>
                    }
                    <button className='btn2' onClick={() => {handleRemovedAppointments(ele) }}>
                      Cancel Appointment
                    </button>
                  </div>
                </div>
              })
            }
          </div> : <div className='no-appoint'>
            <p>No appointments</p>
            <button onClick={() => (navi('/doctors/null'))}>Book an appointment</button>
          </div>
      }
    </div>
  )
}

export default MyAppointments