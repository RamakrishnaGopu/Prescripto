import { User } from '../Model/UserModel.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

export const getDetails = async (req, res) => {
    const user = await User.find();
    res.send({ message: "successfully established", payLoad: user });
}

// user signup
export const signup = async (req, res) => {
    try {
        const getuser = req.body;
        const check = await User.findOne({ email: getuser.email })
        if (!check) {
            const salt = await bcrypt.genSalt(10);
            const pass = await bcrypt.hash(getuser.password, salt);
            const user = new User({
                fullname: getuser.fullname,
                email: getuser.email,
                password: pass,
                appointCart: []
            })
            await user.save();
            // generateTokenAndSetCookie(user._id,res)
            res.send({ success: true, message: "singed up successfully" });
        }
        else {
            res.send({ message: "email already exists,try new one" })
        }

    } catch (err) {
        return res.send({ sucess: "error occured", payLoad: null })
    }
}

//user login

export const login = async (req, res) => {

    try {
        const existedUser = await User.findOne({ email: req.body.email })
        if (existedUser) {
            const pass = await bcrypt.compare(req.body.password, existedUser.password);
            if (pass) {
                // create token
                const token=jwt.sign({userId:existedUser._id},process.env.JWT_SECRET,{expiresIn:'3h'});
                res.send({ success: true, payLoad: existedUser,token:token})
            } else {
                res.send({ sucess: false, message: "incorrect password" })
            }
        } else {
            res.send({ sucess: false, message: "email doesn't exist,please login" })
        }
    } catch (err) {
        return res.send({ sucess: "error occured", payLoad: null })
    }

}

// addto appointments
export const addtoappointments = async (req, res) => {
    try {
        // let userData = await User.findOne({ email: req.user.email })
        const {email,doc,date,day,time}=req.body;
        let userData = await User.findOne({ email:email })
        const newDoc={
            _idx:doc._idx,
            name:doc.name,
            image:doc.image,
            speciality:doc.speciality,
            fees:doc.fees,
            address:{
                line1:doc.address.line1,
                line2:doc.address.line2
            },
            date:String(date),
            day:day,
            time:time
        }
        console.log("new doctor",newDoc);
        userData.appointCart.push(newDoc);

        await userData.save();
        return res.send({ success: true, message: "added to the appointments", payLoad:userData })
    } catch (err) {
        console.log(err.message)
        return res.send({ sucess:false,message:err.message, payLoad: null })
    }

}

export const removeappointment = async (req, res) => {
    try {

        let userData = await User.findOne({ email: req.body.email });
        // let userData = await User.findOne({ email: req.user.email });
        const newCart=userData.appointCart?.filter((obj)=>obj._idx!=req.body._idx)
         userData.appointCart=newCart;
         await userData.save();

        console.log(userData.appointCart);
        return res.send({ success: true, message: "removed from appointments", payLoad: userData });

    } catch (err) {
        return res.send({ success: false, message: "unexpected error", payLoad: null });

    }
}

export const updateDetails = async (req, res) => {
    try {
        // const userData=req.body;
        await User.updateOne({ _id: req.body._id }, { $set: { fullname: req.body.data.fullname, phonenum: req.body.data.phonenum, address: req.body.data.address, gender: req.body.data.gender, dob: req.body.data.dob } })
        const editedData = await User.findOne({ _id: req.body._id });
        console.log(editedData);

        return res.send({ success: true, message: "details successfully updated", payLoad: editedData });

    } catch (err) {
        return res.send({ sucess: false, message: "error occured", payLoad: null })

    }
}

export const removeById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);
        if (user) {
            res.send({ message: "deleted user" })
        }
    } catch (err) {
        res.send({ message: "error", error: err })
    }
}