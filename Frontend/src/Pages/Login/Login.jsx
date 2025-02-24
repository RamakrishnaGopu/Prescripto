import React, { useContext, useState } from 'react'
import './Login.css'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { loginContext } from '../../Context/ProfileContext';

function Login() {
  const navi = useNavigate();
  const [errs, setErrors] = useState(null)
  const {setUserLogin,setUserDetails,handleCart} = useContext(loginContext)
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  function handleLogin(user) {
    if (user !== null) {
      fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then((res) => res.json())
        .then((data) =>{
          if(data.success){
            console.log("message",data);
            setUserDetails(data.payLoad);
            // console.log()
            setUserLogin(true);
            handleCart(data.payLoad);
            navi('/');
          }
          else{
            setErrors({error:data.message})
          }
        })
        .catch((err) =>{setErrors({error:err.message})})
    }
  }
  return (
    <div className=' login'>
      <div className="loginbox">
        <h2>Login</h2>
        <p>please login to book an appointment</p>
        <form className='' onSubmit={handleSubmit(handleLogin)}>
          <div className="forms">
            <label>Email</label>
            <input type="email" {...register('email', { required: true })} id="email" />
            {
              errors.email?.type == 'required' && <p className="log-error">*email is required</p>
            }
          </div>
          <div className="forms">
            <label>Password</label>
            <input type="password" {...register('password', { required: true })} id="password" />
            {
              errors.password?.type == 'required' && <p className="log-error">*Password is required</p>
            }
            {
                  errs!==null? <p className='log-error'>*{errs.error}</p> :<></>
            }
          </div>
          <div className='cbtn mt-3'>
            <button className='btn btn-outline-primary'>
              Login
            </button>
          </div>
        </form>
        <p className='mt-2'>Create new account?<span onClick={() => { navi('/signup') }}>Click here</span></p>
      </div>

    </div>
  )
}

export default Login