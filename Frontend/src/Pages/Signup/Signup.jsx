import React, { useContext, useState } from 'react'
import './Signup.css'
import {toast} from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

function Signup() {
    const navi = useNavigate();
    const { register, handleSubmit, formState: { errors }} = useForm();
    function handlesign(user) {
        if (user !== null) {
            fetch("http://localhost:3000/signup", {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    if(data.success){
                toast.success("signup successful")
                    navi('/login');
                    }
                    else{
                        toast.error(data.message)
                        
                    }
                })
                .catch((err) => {toast.error(err.message)})
        }
    }
    return (
        <div className='login'>
            <div className="loginbox">
                <h2>Create Account</h2>

                <p>please signup to book an appointment</p>

                <form onSubmit={handleSubmit(handlesign)}>

                    <div className="forms">
                        <label>Full Name</label>
                        <input type="text" {...register('fullname', { required: true })} id="fullname" />
                        {
                            errors.fullname?.type == 'required' && <p className="log-error">*name is required</p>
                        }
                    </div>
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
                        
                    </div>
                    <div className='cbtn mt-3'>
                        <button className='btn' >
                            Create account
                        </button>

                    </div>
                </form>
                <p className='mt-2'>Already have an account?<span onClick={() => { navi('/login') }}>Login here</span></p>
            </div>

        </div>
    )
}

export default Signup