const db = require("../models");
const Contact = db.Contact;

exports.create = (req, res) => {
    const idClient= req.body.idClient;
      const  idLawyer = req.body.idLawyer;
      const idContact=req.body.idContact;
      const contact = new Contact({
        idClient,
        idContact,
        idLawyer,

});
contact.save((err, contact) => {
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
            err.message || "Some error occurred while retrieving Contact."
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
    .then(() => res.json('Contact deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
    
  };
  
  
  
  
  exports.DeletALL = (req, res) => {
    Contact.deleteMany({})
    .then(data => {
     res.send({
       message: `${data.deletedCount} Contact were deleted successfully!`
     });
     })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Some error occurred while removing all Conatct."
     });
     });
  
   };

   exports.Update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Contact.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Contact with id=${id}. Maybe Contact was not found!`
          });
        } else res.send({ message: "Contact was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Contact with id=" + id
        });
      });
  };
  exports.search = async (req, res) => {
    try {
      const query = req.query.q; // Get search query from request
      const results = await Contact.find({ $text: { $search: query } }); // Use MongoDB's text search to find matching contacts
      res.send(results);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };