import dotenv from 'dotenv'
dotenv.config()

import {getDetails,login,signup,addtoappointments,removeappointment,updateDetails,removeById} from './Controllers/controllers.js'

import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser'
import protectRoute from './Middleware/protectRoute.js';

dotenv.config()
const url=process.env.MONGO_URL;
const port=process.env.PORT;

const app=express()

// cors
app.use(cors({
    origin:"http://localhost:5178",
    methods:["GET","POST"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials:true
}))
app.use(cookieParser());

app.use(express.json())
// app.use()

mongoose.connect(url)
.then((res)=>{
   app.listen(port,()=>{console.log("server started at port 3000")})
   console.log("db connection is succeded");
})
.catch((err)=>console.log(err))


// endpoint to getDetails for trial
app.get('/getdetails',getDetails)
// endpoitn for signup
app.post('/signup',signup)

// end point for userlogin
app.post('/login',login)

//endpoint to add to the cart
app.post('/addtoappointments',protectRoute,addtoappointments)
// app.post('/addtoappointments',addtoappointments)


//end point to remove from the cart
// app.post('/removeappointment',removeappointment)
app.post('/removeappointment',protectRoute,removeappointment)



// endpoint for updateDetails
app.post('/updateDetails',protectRoute,updateDetails)
// app.post('/updateDetails',updateDetails)


// end point to remove user for trial
app.delete('/remove/:id',protectRoute,removeById)
