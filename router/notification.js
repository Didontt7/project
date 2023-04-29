module.exports = app => {
    const notification = require("../controller/notification");
    var router = require("express").Router();

    router.get("/",notification.FindALL);
    router.get("/find/:id",notification.FindOne);   
    router.delete("/Delet/:id",notification.DeletOne);
    router.delete("/Delet",notification.DeletALL);
app.use("/Notification", router);
  };