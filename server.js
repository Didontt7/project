const express = require("express");
const cors = require("cors");
const dbConfig = require("./config/dbconfig");
const morgan = require("morgan") ;
const {log} = require("mercedlogger"); 
const mongoose = require('mongoose');


require('dotenv').config();
const PORT = process.env.PORT || 8000;


const db =require("./models");//mongodb://127.0.0.1:27017/mongo?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0
const role = db.role;
const uri =`mongodb://127.0.0.1:27017/mongo?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0`;

mongoose
.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


const app = express();
app.use(cors());
app.use(morgan("tiny"))
app.use(express.json());


//routers
require("./router/case")(app);
require("./router/auth.routes")(app);
require("./router/user.routes")(app);
require("./router/document")(app);
require("./router/fee")(app);
require("./router/.")(app);
require("./router/task")(app);
require("./router/timeline")(app);
require("./router/contact")(app);
require("./router/message")(app);
require("./router/notification")(app);
require("./router/service")(app);




// simple route
app.get("/", (req, res) => { 
  res.json({ message: "Welcome to your application." });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new role({
        name: "Lawyer"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Lawyer' to roles collection");
      });

      new role({
        name: "Employee"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Employee' to roles collection");
      });
    }
  });
}