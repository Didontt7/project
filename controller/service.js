const db = require("../models");
const Service = db.service;

// Create and save a new 
exports.create = (req, res) => {
  // Validate request


 const title= req.body.title;
  const Description= req.body.Description ? req.body.Description : "";

  // Create 
  const service = new Task({
    title,
    Description: Description,
  });

  // Save  in the database
  task
    .save(task)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the task.'
      });
    });
};
exports.DeletOne = (req, res) => {

    Task.findByIdAndDelete(req.params.id)
    .then(() => res.json('Service deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
    
  };



  
  exports.DeletALL = (req, res) => {
    Task.deleteMany({})
    .then(data => {
     res.send({
       message: `${data.deletedCount} Task were deleted successfully!`
     });
     })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Some error occurred while removing all Service."
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
  
    Task.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Task with id=${id}. Maybe Service was not found!`
          });
        } else res.send({ message: "Service was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Service with id=" + id
        });
      });
  };
