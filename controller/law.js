const db = require("../models");
const Law = db.law;
const fs = require('fs');

// Create and Save a new Law
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Title can not be empty!" });
    return;
  }
  const title = req.body.title;
  const createdDate = req.body.createdDate ? new Date(req.body.createdDate) : new Date();
  const idCase = req.body.idCase;

  // Create a Law
  const law = new Law({
    title,
    createdDate,
    idCase,
    pdf: req.file.path
  });

  // Save Law in the database
  law.save(law)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Law."
      });
    });
};


exports.findAll = (req, res) => {
  Law.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Law."
      });
    });
};


exports.findOne = (req, res) => {
  Law.findById(req.params.id)
    .then(law => {
      const pdf = fs.readFileSync(law.pdf);
      res.header('Content-type', 'application/pdf');
      res.send(pdf);
    })
    .catch(err => res.status(400).json('Error: ' + err));
};


exports.deleteOne = (req, res) => {
  Law.findById(req.params.id)
    .then(law => {
      fs.unlinkSync(law.pdf);
      law.delete()
        .then(() => res.json('Law deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
};


exports.deleteAll = async (req, res) => {
  try {
    const laws = await Law.find({});
    laws.forEach(law => {
      fs.unlinkSync(law.pdf);
      law.delete();
    });
    res.send({ message: `All Laws were deleted successfully!` });
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred while removing all Law." });
  }
};


exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Law.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Law with id=${id}. Maybe Law was not found!`
        });
      } else res.send({ message: "Law was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Law with id=" + id
      });
    });
};


// Search for a PDF document of law by keyword
exports.search = async (req, res) => {
  try {
  const query = req.query.q; // Get search query from request
  const results = await Law.find({ $text: { $search: query } }); // Use MongoDB's text search to find matching laws
  if (results.length === 0) { // Return an error if no matching laws were found
    return res.status(404).send({ message: "No matching laws were found." });
  }
  
  // Generate an array of law objects with only title, created date, and PDF document URL
  const response = results.map(law => {
    return {
      title: law.title,
      createdDate: law.createdDate,
      pdfUrl: law.pdfUrl
    };
  });
  
  res.send(response);
} catch (err) {
  res.status(500).send({ message: err.message });
  }
  };
