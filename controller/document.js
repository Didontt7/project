const db = require("../models");
const Document = db.Document;
const fs = require('fs');

exports.create = (req, res) => {
   

      const  title= req.body.title;
      const Description= req.body.Description;
      const idClient= req.body.idClient;
      const  idLawyer = req.body.idLawyer;
  
    const document = new Document({
      title,
      Description: Description,
      idClient,
      idLawyer,
      pdf: req.file.path
    });
  
    document.save((err, document) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      res.send({ message: "Document created successfully", document });
    });
  };

  
  exports.FindALL = (req, res) => {

    Document.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Document."
        });
      });
    
  };

  
  exports.FindOne = (req, res) => {
    Document.findById(req.params.id)
    .then(Case => res.json(Case))
    .catch(err => res.status(400).json('Error: ' + err));

    
  };


  exports.DeletOne = (req, res) => {

    Document.findByIdAndDelete(req.params.id)
    .then(() => res.json('Document deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
    
  };



  
  exports.DeletALL = (req, res) => {
    Document.deleteMany({})
    .then(data => {
     res.send({
       message: `${data.deletedCount} Document were deleted successfully!`
     });
     })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Some error occurred while removing all Docments."
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
  
    Document.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Document with id=${id}. Maybe Document was not found!`
          });
        } else res.send({ message: "Document was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Document with id=" + id
        });
      });
  };
  

/*
   exports.Update = (req, res) => {
    Document.findById(req.params.id)
  
    .then(doc => {
  
        Document.title= req.body.title;
        Document.Description= req.body.Description;
        Document.idClient= req.body.idClient;
        Document.idLawyer = req.body.idLawyer;
  
        doc.save()
        .then(() => res.json('Document updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
  
    .catch(err => res.status(400).json('Error: ' + err));
    };*/
    exports.search = async (req, res) => {
      try {
        const query = req.query.q; // Get search query from request
        const results = await Document.find({ $text: { $search: query } }); // Use MongoDB's text search to find matching 
        res.send(results);
      } catch (err) {
        res.status(500).send({ message: err.message });
      }
    };