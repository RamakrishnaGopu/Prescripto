import React from 'react'
import {Routes,Route} from 'react-router-dom'
// import Home from '../src/Pages/Home/Home.jsx'
import Doctors from './Pages/Doctor/Doctors.jsx'
import Home from './Pages/Home/Home.jsx'
import Login from './Pages/Login/Login.jsx'
import About from './Pages/About.jsx'
import Contact from './Pages/Contact.jsx'
import Myprofile from './Pages/Myprofile/Myprofile.jsx'
import Appointment from './Pages/Appointment/Appointment.jsx'
import MyAppointments from './Pages/MyAppointment/MyAppointments.jsx'
import Navbar from './Components/Navbar/Navbar.jsx'
import Footer from './Components/Footer/Footer.jsx'
import Signup from './Pages/Signup/Signup.jsx'

function App() {
  return (
    <div>
      <Navbar/>

     <Routes>
     <Route path='/' element={<Home/>}  />
     {/* <Route path='/doctors/:speciality' element={<Doctors/>}/> */}
     <Route path='/doctors/:speciality' element={<Doctors/>}/>
     <Route path='/login' element={<Login/>} />
     <Route path='/signup' element={<Signup/>}/>
     <Route path='/about' element={<About/>} />
     <Route path='/contact' element={<Contact/>} />
     <Route path='/my-profile' element={<Myprofile/>} />
     <Route path='/my-appointments' element={<MyAppointments/>} />
     <Route path='/appointment/:docId' element={<Appointment/>} />
     </Routes>

     <Footer/>
    </div>
  )
}

export default App