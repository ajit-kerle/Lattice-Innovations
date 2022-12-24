import express from "express";
import {createPatient} from "../controller/patientController.js"
import {createHospital,createPsychiatrist,fetchAllPsychiatrist} from "../controller/hospitalController.js"
import {upload} from "../utils/imageUpload.js"

const router=express.Router()


router.post("/registration",upload.single("patientImage"),createPatient)
router.get("/getAllPsychuatrist/:hospitalId",fetchAllPsychiatrist)

// creating  hospital name
router.post("/createHospital",createHospital)
router.post("/createPsychiatrist",createPsychiatrist)



export default router