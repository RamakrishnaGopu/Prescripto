import React, { useContext, useState } from 'react'
// import swal from 'sweetalert';
import { useNavigate, useParams } from 'react-router-dom';
import { assets } from '../../assets/assets/assets_frontend/assets';
import { doctors } from '../../assets/assets/assets_frontend/assets'
import './Appointment.css'
import RelatedDoctors from '../../Components/RelatedDoctors/RelatedDoctors';
import { loginContext } from '../../Context/ProfileContext';

function Appointment() {
  //to get date
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
  const time = ["09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","01:00"]
  const currentDate = new Date();
  // to get time of appointment
  const [appDay, setAppDay] = useState({ date: null, day: null, time: null });
  console.log("i am appday", appDay)
  const [showTime, setShowTime] = useState(false);
  // const d
  const navi = useNavigate();
  const { userDetails, userLogin, handleCart } = useContext(loginContext)

  const { docId } = useParams();
  const doct = doctors.find((item) => docId === item._id);
  console.log(doct);
  function handleAppointments(doct) {
    if (userDetails != null) {
      if (appDay.date != null && appDay.time != null) {
        const obj = {
          email: userDetails.email,
          _id: doct._id,
          appointDate: appDay
        }
        fetch('http://localhost:3000/addtoappointments', {
          method: "POST",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
          , body: JSON.stringify(obj)
        }).then((res) => res.json())
          .then((data) => {
            if (data.success) {
              // console.log(data.payLoad);
              console.log("message is", data.message);
              handleCart(data.payLoad);
              // setAppointedDoc([...appointedDoc,doct]);
              navi('/my-appointments');
            } else {
              alert("please login to book an appoinment");
            }

          })
          .catch(err => console.log(err))
      }
      else {
        window.alert("please book a slot of time or date");
      }
    } else {
      window.alert("please login to book an appointment")
    }
  }
  return (
    <div className='about-doct container mt-5 p-0'>
      {/* first one  about the doctor*/}
      <div className="doct-appointment d-flex gap-4">
        {/* <div className="doct-appointment row row-cols-1 row-cols-sm-1 row-cols-lg-2 gap-3"> */}
        <div className="doct-img w-100 h-75 mb-0">
          {/* <div className="doct-img col-4 w-25 h-75 mb-0"> */}

          <img className='w-100 mb-0' src={doct.image} alt="" />
          {/* <img className='w-75 h-75 mb-0' src={doct.image} alt="" /> */}

        </div>
        <div className="doctinfo h-75">
          {/* <div className="doctinfo col-8 h-75"> */}

          <div className="one d-flex gap-2 align-items-center">
            <h1>{doct.name}</h1>
            <img src={assets.verified_icon} alt="" />
          </div>
          <div className="two d-flex gap-2 align-items-center">
            <p className='m-1'>{doct.degree}-{doct.speciality}</p>
            <button>{doct.experience}</button>
          </div>
          <div className="tree d-flex flex-column">
            <h4 className='mt-3 mb-1'>About</h4>
            <p>{doct.about}</p>
          </div>
          <p className='app-fee' >Appointment Fee: <span>$60</span></p>
        </div>

      </div>

      {/* booking slots */}
      <div className="booking-slots d-flex flex-column gap-3 mt-5">
        <p className='slot'>Bookings Slots</p>
        <div className="inside-slots d-flex gap-4">
          {
            days.map((ele, idx) => {
              if ((currentDate.getDay() + idx) % 7 == 0) {
                return <div className='Noone' key={idx}></div>
              }
              return <div className="other d-flex flex-column gap-0 justify-content-center align-items-center" onClick={() => {
                if (userLogin == false) {
                  alert("please login to book an appointment")
                } else {
                  setAppDay(appDay => ({ ...appDay, day: days[(currentDate.getDay() + idx + 6) % 7], date: currentDate.getDate() + idx })); setShowTime(true)
                }
              }} key={idx}>
                <p className='m-0'>{days[(currentDate.getDay() + idx + 6) % 7]} </p>
                <p className='m-0'>{currentDate.getDate() + idx}</p>
              </div>
            })
          }
        </div>
        {
          showTime === true ?
            <div className="inside-slots d-flex gap-3 align-items-center">
              {
                time.map((ele,idx)=>{
                  return <div className='time' key={idx} onClick={() => {
                    if (userLogin == false) {
                      alert("please login to book an appointment")
                    } else {
                      setAppDay(appDay => ({ ...appDay, time: ele })
                      )
                    }
                  }}>
                  <p className='d-flex justify-content-center align-content-center mt-1'>{ele}</p>
                </div>
                })
              }
            </div> 
        : <></>
        }
        <button className='book-appoint-btn w-25' onClick={() => {
          if (userLogin) {
            handleAppointments(doct)
          } else {
            alert("please,login to book an appoinment")
          }
        }}>Book an appointment</button>

        {/* <button className='book-appoint-btn' onClick={()=>{setAppointedDoc(appointedDoc=>[...appointedDoc,doct]);navi('/my-appointments')}}>Book an appointment</button> */}
      </div>

      {/* related doctors */}
      <RelatedDoctors doct={doct} />
    </div>
  )
}

export default Appointment