import patientModel from "../models/patientModel";

const createPatient=async(req,res)=>{
    try{
        const patientData=req.body
        

        const patientCreated=await patientModel(patientData)
        res.status(201).json({status:true,data:patientCreated})
    }catch(error){
        res.status(500).json({type:"Patient registration error",message:error.message})
    }
}

export {createPatient}