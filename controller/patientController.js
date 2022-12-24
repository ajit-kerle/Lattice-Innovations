import patientModel from "../models/patientModel.js";
import {isValid, isValidBody,isValidEmail,isValidPassword} from "../utils/validation.js"
import fs from "fs";

// phone regex
const phoneRex = /^[1-9][0-9]{9}$/




const createPatient=async(req,res)=>{
    try{
        let patientData=req.body
        // req.body validation
        if(!isValidBody(patientData)) return res.status(400).send({ message:`Please provide patient detail`})

        // destructring all fields
        let {name,email,address,phone,password}=patientData



       // name validation
       if(!isValid(name)) return res.status(400).send({message: `name is required` });
    

       //address validation
       if(!isValid(address)) return res.status(400).send({message: `address is required` });
   

       // phone validation
       if(!isValid(phone)) return res.status(400).send({message: 'phone no is required' });
        phone=phone.trim()
        if(phone.length<10)return res.status(400).send({ message: `${phone.length} is not valid phone number length` })
        if (!phone.match(phoneRex)) return res.status(400).send({ message: `Please fill country code and number length should  up to 14` })
       


       // email validation
       if (!isValid(email)) return res.status(400).send({message: `Email is required` })
        email = email.trim().toLowerCase()
        if (!isValidEmail(email)) return res.status(400).send({ message: `Email should be a valid email address ` })


        // password validation
        if (!isValid(password)) return res.status(400).send({ message: `Password is required` })
        if (!isValidPassword(password)) return res.status(400).send({message: `Password must between 8-5 and contain a Capital,Symbol,Numeric` })


        // image upload
        let patientImage={data:fs.readFileSync('images/'+req.file.filename),contentType:"image/png"}
        patientData.patientImage=patientImage


        const patientCreated=await (await patientModel.create(patientData))
        res.status(201).json({status:true,data:patientCreated})
    }catch(error){
        res.status(500).json({type:"Patient registration error",message:error.message})
    }
}

export { createPatient}

