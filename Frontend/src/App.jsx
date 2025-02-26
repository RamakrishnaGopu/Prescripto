import React,{ useContext} from 'react'
import {Routes,Route, Navigate} from 'react-router-dom'
import {Toaster} from 'react-hot-toast';
import Doctors from './Pages/Doctor/Doctors.jsx'
import Home from './Pages/Home/Home.jsx'
import Login from './Pages/Login/Login.jsx'
import About from './Pages/About/About.jsx'
import Contact from './Pages/Contact/Contact.jsx'
import Myprofile from './Pages/Myprofile/Myprofile.jsx'
import Appointment from './Pages/Appointment/Appointment.jsx'
import MyAppointments from './Pages/MyAppointment/MyAppointments.jsx'
import Navbar from './Components/Navbar/Navbar.jsx'
import Footer from './Components/Footer/Footer.jsx'
import Signup from './Pages/Signup/Signup.jsx'
import { loginContext } from './Context/ProfileContext.jsx';

function App() {
  const {userLogin} = useContext(loginContext)
  return (
    <div>
      <Navbar/>

     <Routes>
     <Route path='/' element={<Home/>}  />
     <Route path='/doctors/:speciality' element={<Doctors/>}/>
     <Route path='/login' element={<Login/>} />
     <Route path='/signup' element={<Signup/>}/>
     <Route path='/about' element={<About/>} />
     <Route path='/contact' element={<Contact/>} />
     <Route path='/my-profile' element={userLogin?<Myprofile/>:<Navigate to='/login' />}  />
     <Route path='/my-appointments' element={userLogin?<MyAppointments/>:<Navigate to='/login' />} />
     <Route path='/appointment/:docId' element={userLogin?<Appointment/>:<Navigate to='/login' />} />
     </Routes>

     <Footer/>
     <Toaster  position="top-right" reverseOrder={false} />
    </div>
  )
}

export default App