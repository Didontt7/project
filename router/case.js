
module.exports = app => {
const Case = require("../controller/case");
var router = require("express").Router();  
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
  // Create a new Tutorial
  router.post("/", upload.single('pdf'),Case.create);
  router.put("/Update/:id",Case.Update);
  router.get("/",Case.FindALL);
  router.get("/find/:id",Case.FindOne);
  router.delete("/Delete/:id",Case.DeletOne);
  router.delete("/Delete",Case.DeletALL);
  router.get("/search",Case.search);

  app.use("/case", router);
};

