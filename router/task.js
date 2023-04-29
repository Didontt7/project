
module.exports = app => {
  const Task = require("../controller/task");
  var router = require("express").Router();
    
  
    router.post("/add",Task.create);
    router.put("/Update/:id",Task.Update);
    router.get("/",Task.FindALL);
    router.get("/find/:id",Task.FindOne);
    router.delete("/Delet/:id",Task.DeletOne);
    router.delete("/Delet",Task.DeletALL);

    
    app.use("/Task", router);
};