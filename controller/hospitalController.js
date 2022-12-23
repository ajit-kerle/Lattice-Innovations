import HospitalModel from "../models/hospitalModel.js"
import PsychiatristModel from "../models/psychiatristModel.js"

// this is smaple api to creating hospital name
// do not consider for evalution 
const createHospital=async(req,res)=>{
    try{
        const hospitalData=req.body
        const hospitalCreated=await HospitalModel.create(hospitalData)
        res.status(201).json({status:true,data:hospitalCreated})

    }catch(error){
        res.status(500).json({type:"Hospital registration error",message:error.message})
    }
}

const createPsychiatrist=async(req,res)=>{
    try{
        const PsychiatristData=req.body
        // console.log(PsychiatristData.patient_details)
        // const allPatient=PsychiatristData.patient_details
        let pId=req.body.patient_details
        

        const newObj={}
        PsychiatristData.patient_details=[]

        for(let id of pId ){
            newObj.patientId=id
            PsychiatristData.patient_details.push(newObj)
        }
        
        const PsychiatristCreated=await PsychiatristModel.create(PsychiatristData)
        res.status(201).json({status:true,data:PsychiatristCreated})

    }catch(error){
        res.status(500).json({type:"Psychiatrist registration error",message:error.message})
    }
}


// fetch all Psychiatrist of hospital
const fetchAllPsychiatrist=async(req,res)=>{
   try{
    
    const getHostp=await HospitalModel.findOne({hospital_name:"Apollo Hospitals"},{hospital_name:1,_id:1})

    const getPsy=await PsychiatristModel.find({hospital_id:getHostp._id},{name:1,_id:1, patient_details:1})

    const obj={
        hospital_name:getHostp.hospital_name,
    }

    obj.total_psychiatrist_count=getPsy.length
    obj.psychiatrist_details=getPsy             
   
    var sum=0
    for(let psychiatrist of obj.psychiatrist_details){
        for(let patient of psychiatrist.patient_details){
        sum++
        }
    }
    
    obj.total_patients_count=sum
    res.status(200).json({status:true,data:getAllPsychiatrist})
   }catch(error){
       res.status(500).json({type:"get all  registration error",message:error.message})
   }
}

export {createHospital,createPsychiatrist,fetchAllPsychiatrist}


