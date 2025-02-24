import React from 'react'
import { doctors } from '../../assets/assets/assets_frontend/assets';
import './RelatedDoctors.css'
import { useNavigate } from 'react-router-dom';
function RelatedDoctors(props) {
    const {doct}=props
    const navi=useNavigate();
    console.log("doct is",doct);
    const relatedDocs=doctors.filter((ele)=>(doct.speciality===ele.speciality && doct._id!==ele._id))
  return (
    <div className='relatedDocs mt-5'>
        <h2 className='text-center'>Related Doctors</h2>
        <p className='simple'>Simply browse through our extensive list of trusted doctors.</p>
         <div className="related-doctors">
            {
           relatedDocs.map((ele,idx)=>{
                     return <div onClick={()=>{scrollTo(0,0);navi(`/appointment/${ele._id}`)}} key={idx} className="related-doct">
                     <img className='img-fluid' src={ele.image} alt="" />
              <div className="divpara m-3">
                <div className='greencolor d-flex align-items-center gap-1 p-0 m-0'>
                  <p className="green-dot p-0 mb-1"></p>
                  <span className='available'>Available</span>
                </div>
                <h3 className="text-dark fs-6 mb-1">{ele.name}</h3>
                <p className='text-secondary mb-1'>{ele.speciality}</p>
              </div>
            </div>
                     }
                    )
            }
         </div>
    </div>
  )
}

export default RelatedDoctors