const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    Fullname:{type:String,required:true},
    username: {type:String,required:true},
    email: {type:String},
    password:{type:String,required:true},
    address:{type:String,required:true},
    phone:{type:String,required:true},
    Description:{type:String,required:true},
    job:{type:String,required:true},
    Fathername:{type:String},
    MotherFullname:{type:String},
    Birthday:{type:String},
    image: { data: Buffer, contentType: String},
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;