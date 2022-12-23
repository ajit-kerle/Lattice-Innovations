import mongoose from "mongoose";


const hospitalSchema=new mongoose.Schema({
    hospital_name:{type:String, required:true},
    
},{timestamps:true})

const hospital=mongoose.model("hospital",hospitalSchema)

export default hospital


