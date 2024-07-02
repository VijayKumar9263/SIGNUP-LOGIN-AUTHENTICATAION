const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/signup")
.then(() =>{
  console.log("mongodb is connected");
})
.catch(() =>{
  console.log("mongodb is not connected");
})

const LoginSchema = new mongoose.Schema({
  name:{
    type: String,
    required:true
  },
  email:{
    type: String,
    required:true
  },
  password:{
    type: String,
    required:true
  }
})

const collection = new mongoose.model("userdetails", LoginSchema)
module.exports = collection