import HospitalModel from "../models/hospitalModel.js"
import PsychiatristModel from "../models/psychiatristModel.js"

// this is smaple api to creating documents in hospital collection
// do not consider for evalution 
const createHospital=async(req,res)=>{
    try{

        // four hospital created
        const hospitalData=req.body
        const hospitalCreated=await HospitalModel.create(hospitalData)
        res.status(201).json({status:true,data:hospitalCreated})

    }catch(error){
        res.status(500).json({type:"Hospital registration error",message:error.message})
    }
}

// // this is smaple api to creating documents in Psychiatrist collection
const createPsychiatrist=async(req,res)=>{
    try{
        const PsychiatristData=req.body
        
        let pId=req.body.patient_details

        
        // newObj ceated to create key value and store it into arr   
        const newObj={}
        PsychiatristData.patient_details=[]

        // Psychiatrist can have multiple patient 
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
    const hospitalId=req.params.hospitalId

    // fetching hospital from hospitalId
    const getHospital=await HospitalModel.findOne({_id:hospitalId},{hospital_name:1,_id:1})


    // fetching all Psychiatrist from that hospital
    const getPsychiatrist=await PsychiatristModel.find({hospital_id:getHospital._id},{name:1,_id:1, patient_details:1})
    
    // this is new hospitalDetails object to get formatted response
    const hospitalDetails={
        hospital_name:getHospital.hospital_name,
    }
    

    // adding key value in hospitalDetails object to get formatted response
    // total_psychiatrist is equal to length of getPsychiatrist.length
    hospitalDetails.total_psychiatrist_count=getPsychiatrist.length
    
    // psychiatrist details in array of object
    hospitalDetails.psychiatrist_details=getPsychiatrist             
   

   // this for of loop is to calculate 
   // total patient count in hospital
    var sum=0
    for(let psychiatrist of hospitalDetails.psychiatrist_details){
        for(let patient of psychiatrist.patient_details){
        sum++
        }
    }
    
    // assigning sum to total_patients_count for formatted result 
    hospitalDetails.total_patients_count=sum

    // returning response 
    res.status(200).json({status:true,data:hospitalDetails})
   }catch(error){
       res.status(500).json({type:"get all  registration error",message:error.message})
   }
}

export {createHospital,createPsychiatrist,fetchAllPsychiatrist}


