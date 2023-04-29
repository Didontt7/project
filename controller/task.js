const db = require("../models");
const Task = db.task;

// Create and save a new task
exports.create = (req, res) => {
  // Validate request


 const title= req.body.title;
const  isDone= req.body.isDone ? req.body.isDone : false;
  const Description= req.body.Description ? req.body.Description : "";
  const idLawyer= req.body.idLawyer;

  // Create a task
  const task = new Task({
    title,
    isDone,
    Description: Description,
    idLawyer,
  });

  // Save task in the database
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



exports.FindALL = (req, res) => {

    Task.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Task."
        });
      });
    
  };

  
  exports.FindOne = (req, res) => {
    Task.findById(req.params.id)
    .then(Case => res.json(Case))
    .catch(err => res.status(400).json('Error: ' + err));

    
  };


  exports.DeletOne = (req, res) => {

    Task.findByIdAndDelete(req.params.id)
    .then(() => res.json('Task deleted.'))
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
         err.message || "Some error occurred while removing all Task."
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
            message: `Cannot update Task with id=${id}. Maybe Task was not found!`
          });
        } else res.send({ message: "Task was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Task with id=" + id
        });
      });
  };

/* 
   exports.Update = (req, res) => {
    Task.findById(req.params.id)
  
    .then(data => {
  
        Task.title= req.body.title;
        Task.isDone= req.body.isDone ? req.body.isDone : false;
        Task.Description= req.body.Description ? req.body.Description : "";
        Task.idLawyer= req.body.idLawyer;
        
        data.save()
        .then(() => res.json('Task updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
  
    .catch(err => res.status(400).json('Error: ' + err));
    };*/