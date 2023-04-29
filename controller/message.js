const db = require("../models");
const Message = db.messages;

exports.create = (req, res) => {
    const idClient= req.body.idClient;
      const  idLawyer = req.body.idLawyar;
      const content=req.body.content;
      const timestamp= req.body.CratedDate ? new Date(req.body.CratedDate) : new Date();
      const message = new Message ({
        idClient,
        idLawyer,
        content,
        timestamp,

});
message.save((err, contact) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ message: "Contact created successfully", contact});
  });
};
exports.FindALL = (req, res) => {

    Contact.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Message."
        });
      });
    
  };
  
  
  exports.FindOne = (req, res) => {
    Contact.findById(req.params.id)
    .then(User => res.json(User))
    .catch(err => res.status(400).json('Error: ' + err));
  
    
  };
  
  
  exports.DeletOne = (req, res) => {
  
    Contact.findByIdAndDelete(req.params.id)
    .then(() => res.json('Message deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
    
  };
  
  
  
  
  exports.DeletALL = (req, res) => {
    Contact.deleteMany({})
    .then(data => {
     res.send({
       message: `${data.deletedCount} Message were deleted successfully!`
     });
     })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Some error occurred while removing all Message."
     });
     });
  
   };

   
  exports.search = async (req, res) => {
    try {
      const query = req.query.q; // Get search query from request
      const results = await Contact.find({ $text: { $search: query } }); // Use MongoDB's text search to find matching messages
      res.send(results);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };