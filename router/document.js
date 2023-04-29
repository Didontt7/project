
module.exports = app => {
  const document = require("../controller/document");
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
  
  router.post("/", upload.single('pdf'),document.create);
      router.put("/Update/:id",document.Update);
    router.get("/",document.FindALL);
    router.get("/find/:id",document.FindOne);
    router.delete("/Delet/:id",document.DeletOne);
    router.delete("/Delet",document.DeletALL);
    router.get("/search", document.search);

    app.use("/Document", router);
    
};