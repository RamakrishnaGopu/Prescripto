require('dotenv').config()
const url=process.env.MONGO_URL;
const port=3000;
const exp=require('express');
const cors=require('cors')
const jwt=require("jsonwebtoken")
const bcrypt=require('bcrypt')
const app=exp(cors());
// cors
app.use(cors({
    origin:"http://localhost:5173",
    methos:["GET","POST"],
    allowedHeaders:['Content-Type','Authorization'],
}))
app.use(exp.json())
// app.use()
const mongoose=require('mongoose')
mongoose.connect(url)
.then((res)=>{
   app.listen(port,()=>{console.log("server started at port 3000")})
   console.log("db connection is succeded");
})
.catch((err)=>console.log(err))

//importing the model 
const User=require('./UserModel');

// endpoint to getDetails for trial
app.get('/getdetails',async(req,res)=>{
    const user=await User.find();
    res.send({message:"successfully established",payLoad:user});
})
// endpoitn for signup
app.post('/signup',async(req,res)=>{
    const len=15;
    const getuser=req.body;
    const check=await User.findOne({email:getuser.email})
    if(!check){
        const cart={};
        const date=[];
        for(let i=0;i<len;i++){
            cart[i]=0;
            // added date
            date[i]={};
        }
     const salt=await bcrypt.genSalt(10); 
    const pass=await bcrypt.hash(getuser.password,salt);
    const user=new User({
        fullname:getuser.fullname,
        email:getuser.email,
        password:pass,
        appointCart:cart,
        // inserted date
        dateCart:date
    })
    await user.save();
    const payload={
        user:{
            id:user.id
        }
    }
    res.send({success:true,message:"singed up successfully"});
}
else{
    res.send({message:"email already exists,try new one"})
}
})

// end point for userlogin
app.post('/login',async(req,res)=>{
        const existedUser=await User.findOne({email:req.body.email})
        if(existedUser){
            const pass=await bcrypt.compare(req.body.password,existedUser.password);
            if(pass){
              const data={
                user:{
                    id:existedUser.id
                }
              }
            //   const token=jwt.sign(data,'secret_key')
              res.send({success:true,payLoad:existedUser})
            }else{
                res.send({message:"incorrect password"})
            }
        }else{
            res.send({message:"email doesn't exist,please login"})

        }
})

//endpoint to add to the cart
app.post('/addtoappointments',async(req,res)=>{
    let userData=await User.findOne({email:req.body.email})
    // console.log("id is",typeof(Number(req.body._id[3])));
    let num=req.body._id.substring(3);
    let idx=Number(num);
    userData.appointCart[idx-1]+=1;
    userData.dateCart[idx-1]=req.body.appointDate;
    console.log("datecart is:",userData.dateCart);
    await User.updateOne({ email: req.body.email }, { $set: { appointCart: userData.appointCart,dateCart:userData.dateCart } });
    res.send({success:true,message:"added to the appointments cart",payLoad:{appointCart:userData.appointCart,dateCart:userData.dateCart}})   
})

//end point to remove from the cart
app.post('/removefromappointments',async(req,res)=>{
    let userData=await User.findOne({email:req.body.email});
    let idx=Number(req.body._id.substring(3));
    userData.appointCart[idx-1]-=1;
    userData.dateCart[idx-1]={};
    await User.updateOne({email:req.body.email},{$set:{appointCart:userData.appointCart,dateCart:userData.dateCart}});
    console.log(userData.appointCart);
    res.send({success:true,message:"removed from cart",payLoad:{appointCart:userData.appointCart,dateCart:userData.dateCart}});
})


// endpoint for updateDetails
app.post('/updateDetails',async(req,res)=>{
    // const userData=req.body;
    await User.updateOne({_id:req.body._id},{$set:{fullname:req.body.data.fullname,phonenum:req.body.data.phonenum,address:req.body.data.address,gender:req.body.data.gender,dob:req.body.data.dob}})
    const editedData=await User.findOne({_id:req.body._id})
    res.send({success:true,message:"details successfully updated",payLoad:editedData});
})

// end point to remove user for trial
app.delete('/remove/:id',async(req,res)=>{
    try{
    const id=req.params.id;
    const user=await User.findByIdAndDelete(id);
    if(user){
    res.send({message:"deleted user"})
    }
}catch(err){
    res.send({message:"error",error:err})
}
})