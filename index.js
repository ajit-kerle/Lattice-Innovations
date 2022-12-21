import  express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config()
const app=express()

app.use(express.json())


// database
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://ajitkerle:2R693j4kFokYqNZJ@cluster0.djs4ptj.mongodb.net/HMS-DB?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDB is connected successfully........"))
.catch((err) => console.log(err));



// server 
const PORT=process.env.PORT
app.listen(PORT||8000,()=>{
    console.log(`server running on port ${PORT}.......`)
})