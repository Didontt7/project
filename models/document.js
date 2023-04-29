const { Types } = require("mongoose");

module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title:{type:String,required:true},
        Description:String,
        idClient:{type:Types.ObjectId , ref:"client"},
        idLawyer:{type:Types.ObjectId , ref:"lawyer"},
        pdf: { data: Buffer, contentType: String }
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Document = mongoose.model("document", schema);
    return Document;
  };
  