const { Types } = require("mongoose");

module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        idContact: int,
        idClient:{type:Types.ObjectId , ref:"client"},
        idLawyer:{type:Types.ObjectId , ref:"lawyer"},
        image: { data: Buffer, contentType: String }      },
      { timestamps: true }
    );
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
    const Contact = mongoose.model("contact", schema);
    return Contact;
  };