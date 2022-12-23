import mongoose from "mongoose";

const patientSchema=new mongoose.Schema({
    name:{type:String, required:true},
    address:{type:String, required:true},
    email:{type:String, required:true},
    phone:{type:String, required:true},
    password:{type:String, required:true},
    patientImage:{
        data:Buffer,
        contentType:String,
    },
},{timestamps:true})

const patient=mongoose.model("patient",patientSchema)

export default patient