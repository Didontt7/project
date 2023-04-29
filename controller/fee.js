const db = require("../models");
const Fee = db.fees;

exports.create = (req, res) => {
  // Validate request
  const isReceved= req.body.isReceved ? req.body.isReceved : false;
  const idcase= req.body.idcase;


  // Create a Fee object
  const fee = new Fee({
    isReceved,
    idcase,
  });

  // Save Fee in the database
  fee.save(fee)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Fee."
      });
    });
};



  
exports.FindALL = (req, res) => {

    Fee.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Fee."
        });
      });
    
  };

  
  exports.FindOne = (req, res) => {
    Fee.findById(req.params.id)
    .then(Case => res.json(Case))
    .catch(err => res.status(400).json('Error: ' + err));

    
  };


  exports.DeletOne = (req, res) => {

    Fee.findByIdAndDelete(req.params.id)
    .then(() => res.json('Fee deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
    
  };



  
  exports.DeletALL = (req, res) => {
    Fee.deleteMany({})
    .then(data => {
     res.send({
       message: `${data.deletedCount} Fee were deleted successfully!`
     });
     })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Some error occurred while removing all Fee."
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
  
    Fee.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Fee with id=${id}. Maybe Fee was not found!`
          });
        } else res.send({ message: "Fee was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Fee with id=" + id
        });
      });
  };
  
/*

   exports.Update = (req, res) => {
    Fee.findById(req.params.id)
  
    .then(fee => {
  
        Fee.isReceved= req.body.isReceved ;
        Fee.idcase= req.body.idcase;

  
        fee.save()
        .then(() => res.json('Fee updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
  
    .catch(err => res.status(400).json('Error: ' + err));
    };
    */
    exports.search = async (req, res) => {
      try {
        const query = req.query.q; // Get search query from request
        const results = await Fee.find({ $text: { $search: query } }); // Use MongoDB's text search to find matching 
        res.send(results);
      } catch (err) {
        res.status(500).send({ message: err.message });
      }
    };