const db = require("../models");
const Cases = db.Cases;
const fs = require('fs');

// Create and Save a new Case
exports.create = (req, res) => {
    // Validate request
    if (!req.body.Name) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    const Name= req.body.Name;
    const Number = req.body.Number;
    const Price= req.body.Price;
    const opponent =req.body.opponent;
    const Location=req.body.Location;
   const Gugement =req.body.Gugement;
   const GDate = req.body.GDate ? new Date(req.body.GDate) : new Date();
   const Description=req.body.Description;
  const idClient = req.body.idClient;
  const idLawyer =req.body.idLawyer;
    

  const newCase = new Cases({
    Name,
    Number ,
    Price,
    opponent, 
    Location,
    Gugement ,
    GDate ,
    Description,
    idClient,
    idLawyer,
    pdf: req.file.path

  });

  exports.search = async (req, res) => {
    try {
      const query = req.query.q; // Get search query from request
      const results = await Cases.find({ $text: { $search: query } }); // Use MongoDB's text search to find matching 
      res.send(results);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

// Save Tutorial in the database
  newCase.save()
  .then(() => res.json('Case  added!'))
  .catch(err => res.status(400).json('Error: Some error occurred while creating the case....' + err)); 
  };

  exports.FindALL = (req, res) => {

    Cases.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Case."
        });
      });
    
  };

  exports.FindOne = (req, res) => {
    Cases.findById(req.params.id)
    .then(Case => res.json(Case))
    .catch(err => res.status(400).json('Error: ' + err));
  };

  exports.DeletOne = (req, res) => {

    Cases.findByIdAndDelete(req.params.id)
    .then(() => res.json('Case deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
    
  };

  exports.DeletALL = (req, res) => {
   Cases.deleteMany({})
   .then(data => {
   res.send({
      message: `${data.deletedCount} Cases were deleted successfully!`
    });
    })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all Case."
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
  
    Cases.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Cases with id=${id}. Maybe Cases was not found!`
          });
        } else res.send({ message: "Cases was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Cases with id=" + id
        });
      });
  };
  
  exports.GetCasesCount = (req, res) => {
    Cases.countDocuments()
      .then(count => res.send({ count: count }))
      .catch(err => res.status(500).send({ message: err.message }));
  };


/*
exports.Update = (req, res) => {
  Cases.findById(req.params.id)

  .then(Case => {

    Case.Name= req.body.Name;
    Case.Number = req.body.Number;
    Case.Price= req.body.Price;
    Case.opponent =req.body.opponent;
    Case.Location=req.body.Location;
   Case.Gugement =req.body.Gugement;
    Case.GDate =Date.parse(req.body.date);
   Case.Description=req.body.Description;

    Case.save()
      .then(() => res.json('Case updated!'))
      .catch(err => res.status(400).json('Error: ' + err));
  })

  .catch(err => res.status(400).json('Error: ' + err));
  };*/
