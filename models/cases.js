const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const casesSchema = new Schema({
  Name: String,
        Price:{type:String,required:true},
        opponent :{type:String,required:true},
        Location:{type:String,required:true},
        Gugement :{type:String,required:true},
        GDate : { "type": Date, "default": Date.now ,required:true},
        Description:{type:String,required:true},
        idClient:{type:mongoose.Types.ObjectId , ref:"client"},
        idLawyer:{type:mongoose.Types.ObjectId  , ref:"lawyer"},
        pdf: { data: Buffer, contentType: String }
}, {
  timestamps: true,
});

const Cases = mongoose.model('Cases', casesSchema);

module.exports = Cases;