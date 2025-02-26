import React from 'react'
import { doctors } from '../../assets/assets/assets_frontend/assets';
import { useNavigate } from 'react-router-dom';
import GetDoctorCard from '../../Pages/GetDoctorCard';
function RelatedDoctors(props) {
    const {doct}=props
    const navi=useNavigate();
    console.log("doct is",doct);
    const relatedDocs=doctors.filter((ele)=>(doct.speciality===ele.speciality && doct._idx!==ele._idx))
  return (
    <div className='relatedDocs mt-5'>
        <h2 className='text-center'>Related Doctors</h2>
        <p className='simple text-center'>Simply browse through our extensive list of trusted doctors.</p>
         <div className="doctors mt-4 d-flex w-100 justify-content-start flex-md-wrap gap-3">
            {
           relatedDocs.map((ele,idx)=>{
            return <GetDoctorCard state={ele}/>})
                     
            }
         </div>
    </div>
  )
}

export default RelatedDoctors