
module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title:{type:String,required:true},
        CratedDate :{ "type": Date, "default": Date.now ,required:true},
        Description:{type:String,required:true},
        idClient:{type:mongoose.Types.ObjectId , ref:"client"},
        idLawyer:{type:mongoose.Types.ObjectId  , ref:"lawyer"}  ,
        image: { data: Buffer, contentType: String }  
          },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Notification = mongoose.model("notification", schema);
    return Notification;
  };