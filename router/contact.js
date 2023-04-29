
module.exports = app => {
    const contact = require("../controller/contact");
    var router = require("express").Router();
      
    
      router.post("/add",contact.create);
      router.put("/Update/:id",contact.Update);
      router.get("/",contact.FindALL);
      router.get("/find/:id",contact.FindOne);
      router.delete("/Delet/:id",contact.DeletOne);
      router.delete("/Delet",contact.DeletALL);
      router.get("/search", contact.search);

      app.use("/Contact", router);
  };