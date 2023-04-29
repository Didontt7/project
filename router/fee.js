
module.exports = app => {
  const Fee = require("../controller/fee");
  var router = require("express").Router();
    
  
    router.post("/add",Fee.create);
    router.put("/Update/:id",Fee.Update);
    router.get("/",Fee.FindALL);
    router.get("/find/:id",Fee.FindOne);
    router.delete("/Delet/:id",Fee.DeletOne);
    router.delete("/Delet",Fee.DeletALL);
    router.get("/search", Fee.search);

    app.use("/Fee", router);
};