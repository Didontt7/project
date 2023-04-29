const db = require("../models");
const Notification = db.notification;


exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Title can not be empty!" });
    return;
  }
  const idClient= req.body.idClient;
  const  idLawyer = req.body.idLawyar;
    const title= req.body.title;
   const  CratedDate= req.body.CratedDate ? new Date(req.body.CratedDate) : new Date();
    const Descrption= req.body.Descrption;

  // Create 
  const notification = new Notification({
    idClient,
    idLawyer,
    title,
    CratedDate,
    Descrption,
  });

  
  // Save in the database
  notification.save(db.notification)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Notification."
      });
    });
};
exports.DeletOne = (req, res) => {

    Law.findByIdAndDelete(req.params.id)
    .then(() => res.json('Notification deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
    
  };

  exports.FindALL = (req, res) => {

    Notification.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Notification."
        });
      });
    
  };

  
  exports.FindOne = (req, res) => {
    Law.findById(req.params.id)
    .then(Case => res.json(Case))
    .catch(err => res.status(400).json('Error: ' + err));

    
  };



  
  exports.DeletALL = (req, res) => {
    Law.deleteMany({})
    .then(data => {
     res.send({
       message: `${data.deletedCount} Notification were deleted successfully!`
     });
     })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Some error occurred while removing all Notification."
     });
     });
 
   };

   