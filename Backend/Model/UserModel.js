import mongoose from "mongoose";
const AppointmentSchema = new mongoose.Schema({
        _idx: {
            type: Number
        },
        name: {
            type: String
        },
        image: {
            type: String, 
            default: null
        },
        speciality: {
            type: String
        },
        fees: {
            type: Number
        },
        address: {
            line1: {
                type: String,
            },
            line2: {
                type: String,
            }
        },
        date: { 
            type: String, 
            default: null
        },
        day: { 
            type: String, 
            default: null 
        },
        time: { 
            type: String, 
            default: null 
        }
    
});

// Define User Schema with `appointCart`
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        default: null
    },
    dob: {
        type: String,
        default: null
    },
    phonenum: {
        type: String,
        default: "0000000000"
    },
    address: {
        type: String,
        default: null
    },
    appointCart: {
        type: [AppointmentSchema],
        default: []
    }
});

export const User=mongoose.model('presUser',userSchema);
