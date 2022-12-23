import  express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import route from "./router/route.js";



dotenv.config()
const app=express()



app.use(express.json())


// database
const URL=process.env.URL
mongoose.set('strictQuery', true);
mongoose.connect(URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology:true
    }
  )
  .then(() => console.log("MongoDB is connected successfully........"))
.catch((err) => console.log(err));


app.use("/",route)

// image storing 


// server 
const PORT=process.env.PORT
app.listen(PORT||8000,()=>{
    console.log(`server running on port ${PORT}.......`)
})