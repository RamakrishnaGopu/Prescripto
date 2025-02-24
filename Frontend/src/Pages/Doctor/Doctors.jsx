import React, { useContext } from 'react'
import {doctors} from '../../assets/assets/assets_frontend/assets'
import './Doctors.css'
import { useParams } from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'
import { loginContext } from '../../Context/ProfileContext'
function Doctors() {
  const navi=useNavigate();
  const {speciality}=useParams();
  const {setName}=useContext(loginContext);
  const special_doct=doctors.filter((ele)=>speciality===ele.speciality)
  console.log(special_doct);
   const specialists=["General physician","Gynecologist","Neurologist","Dermatologist","Pediatricians","Gastroenterologist"]
  return (
    <div className='alldoctors container'>
      <h4 className='mt-4'>Browse through the doctors specialist.</h4>
{/* doct-div */}
<div className='d-flex gap-4'>
      <div className="speciality-type mt-4 d-flex flex-column gap-3">
        {
        specialists.map((ele,idx)=>{
       return  <div key={idx} className="type d-flex flex-column justify-content-center" onClick={()=>{navi(`/doctors/${ele}`)}}>{ele}</div>})
        }
  </div>
  {
    // topDoctors docter
    special_doct.length!=0? <div className="doctors mt-4 d-flex w-100 justify-content-start flex-md-wrap gap-3">{ 
      
      special_doct.map((ele,idx)=>{
        //doctor
      return <div key={idx} onClick={()=>{setName("null");navi(`/appointment/${ele._id}`)}} className="doctor w-25">
        <img className='img-fluid' src={ele.image} alt="" />
       <div className="divpara m-2">
        <div className='greencolor d-flex align-item-center gap-2'>
         <p className="green-dot p-0 mb-1"></p>
         <span className='available'>Available</span>
         </div>
         <h3 className='text-dark mb-1'>{ele.name}</h3>
         <p className='mb-0 spec'>{ele.speciality}</p>
        </div>
      </div>})
      
    }</div>
 :
//  all-doct
 <div className="doctors mt-4 w-100 d-flex justify-content-start gap-4 flex-wrap"> 
{/* <div className="mt-4 row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gap-4"> */}
     {
        doctors.map((ele,idx)=>{
          return <div key={idx} onClick={()=>{navi(`/appointment/${ele._id}`)}} className="doctor p-0">
            <img className='img-fluid' src={ele.image} alt="" />
           <div className="divpara m-2">
            <div className='greencolor'>
             <p className="green-dot p-0 mb-1"></p>
             <span className='available'>Available</span>
             </div>
            <h3 className='text-dark mb-1'>{ele.name}</h3>
            <p className='mb-0 spec'>{ele.speciality}</p>
            </div>
          </div>
        })
      }
        </div>
    }
      
</div>


    </div>
  )
}

export default Doctors