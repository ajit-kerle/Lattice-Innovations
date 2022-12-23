import mongoose from "mongoose";
const ObjectId=mongoose.Schema.Types.ObjectId;

const psychiatristSchema=new mongoose.Schema({
    name:{type:String, required:true},
    patient_details:[
        {patientId: {type:ObjectId, ref:'patient'}}
    ],
    hospital_id:{type:ObjectId, ref:'hospital',required:true}
},{timestamps:true})

const psychiatrist=mongoose.model("psychiatrist",psychiatristSchema)

export default psychiatrist

