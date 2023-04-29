const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, pdf, cb) => {
    cb(null, 'uploads'); // Set the destination directory for uploaded files
  },
  filename: (req, pdf, cb) => {
    cb(null, pdf.originalname); // Use the original filename for the uploaded file
  }
});

const upload = multer({ storage });

const law = require("../controller/law.js");

// Create a new Law
router.post("/", upload.single('pdf'), law.create);

// Retrieve all Law
router.get("/", law.FindALL);

// Retrieve a single Law with id
router.get("/:id", law.FindOne);

// Delete a single Law with id
router.delete("/:id", law.DeletOne);

// Delete all Law
router.delete("/", law.DeletALL);

// Update a Law with id
router.put("/:id", law.Update);

// Search for Law
router.get("/search", law.search);

module.exports = router;
