import React, { useContext, useState } from 'react'
import { loginContext } from '../../Context/ProfileContext'
import { useNavigate } from 'react-router-dom'
import './MyAppointments.css'
import { assets } from '../../assets/assets/assets_frontend/assets';
// import { doctors } from '../assets/assets/assets_frontend/assets';

function MyAppointments() {
  const navi = useNavigate();
  // to show paying methods
  const [pay,setPay]=useState(false);
  const [removedDoct, setRemovedDoct] = useState([]);
  const { userLogin, appointedDoc, handleCart, userDetails, dCart } = useContext(loginContext)
  console.log(appointedDoc)
  console.log("deleted doct-", removedDoct);
  //function to remove appointed doctor from database
  function handleReamovedAppointments(docObj) {
    if (userDetails != null) {
      const obj = {
        email: userDetails.email,
        _id: docObj._id
      }
      fetch('http://localhost:3000/removefromappointments', {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
        , body: JSON.stringify(obj)
      }).then((res) => res.json())
        .then((data) => {
          if (data.success) {
            console.log("message is", data.message);
            handleCart(data.payLoad);
            window.alert("removed from db")
            scrollTo(0, 0)
          } else {
            alert("uanble to save the data");
          }

        })
        .catch(err => console.log(err))
    }
    else {
      window.alert({ message: "please login" })
    }
  }


  return (
    <div className='my-appointments container mt-4'>
      {
       userLogin && appointedDoc.length != 0 &&<h1 className='text-center'>My-Appointments</h1>
      }
      {
        userLogin && appointedDoc.length != 0 ?
          <div className='div container d-flex justify-content-between flex-column mt-5 gap-5'>
            {
              appointedDoc.map((ele, idx) => {
                return <div className='appointed-doctor d-flex flex-wrap' key={idx}>
                  <div className='doct-info d-flex align-items-center gap-5 flex-wrap'>
                    <img className='doctor-img w-50' src={ele.image} alt="" />
                    <div className="inside-appointments m-0">
                      <h2 className='m-0 mt-2'>{ele.name}</h2>
                      <p><span className='address mt-3'>{ele.speciality}</span></p>
                      <h6 className='m-0'><span>Address: </span></h6>
                      <p className='m-0'>{ele.address?.line1 || "address not provided"}</p>
                      <p className='m-0'>{ele.address?.line2 || "address not provided"}</p>
                      {
                        dCart[idx]?.date != null && <div> <p> <span>Date & Time: </span>{dCart[idx].date} - {dCart[idx].day} - {dCart[idx].time}</p>
                        </div>
                      }
                    </div>
                  </div>
                  <div className='appointment-btns d-flex justify-content-center gap-3 mt-5 flex-column px-5'>
                    {pay===false?<button className='btn1 mt-5' onClick={()=>{setPay(true)}}>
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
                    <button className='btn2' onClick={() => { setRemovedDoct(removedDoct => ([...removedDoct, { ...ele, date: dCart[idx].date, day: dCart[idx].day, time: dCart[idx].time }])); handleReamovedAppointments(ele) }}>
                      Cancel Appointment
                    </button>
                  </div>
                </div>
              })
            }
            {/* {
              removedDoct.map((ele, idx) => {
                return <div className='appointed-doctor' key={idx}>
                  <div className='doct-info'>
                    <img src={ele.image} alt="" />
                    <div className="inside-appointments">
                      <h2>{ele.name}</h2>
                      <p><span className='address'>{ele.speciality}</span></p>
                      <p><span>Address: </span></p>
                      <p>{ele.address?.line1 || "address not provided"}</p>
                      <p>{ele.address?.line2 || "address not provided"}</p>
                      <div> <p> <span>Date & Time: </span>{ele.date} - {ele.day} - {ele.time}</p></div>
                      </div>
                    </div>
                    <div className='appointment-btns'>
                      <button className='btn3'>
                        Cancelled Appointment
                      </button>
                    </div>
                  </div>
              })

            } */}
                </div> : <div className='no-appoint'>
              <p>No appointments</p>
              <button onClick={() => (navi('/doctors/null'))}>Book an appointment</button>
            </div>
      }
          </div>
  )
}

      export default MyAppointments