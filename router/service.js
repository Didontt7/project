module.exports = app => {
    const Service = require("../controller/document");
    var router = require("express").Router();
      
    
      router.post("/add",Service.create);
      router.put("/Update/:id",Service.Update);
      router.delete("/Delet/:id",Service.DeletOne);
      router.delete("/Delet",Service.DeletALL);
      app.use("/Service", router);
      
  };