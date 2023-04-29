const { Types } = require("mongoose");

module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title:{type:String,required:true},
        CratedDate :{type:Date,required:true},
        idcase:{type:Types.ObjectId , ref:"case"},
        pdf: { data: Buffer, contentType: String }
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Law = mongoose.model("law", schema);
    return Law;
  };
  

  