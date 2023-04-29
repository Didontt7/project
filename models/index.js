const mongoose = require('mongoose');
mongoose.Promise= global.Promise

const db ={};

db.mongoose =mongoose;

db.User =require("./users");
db.role =require("./Role");
db.Cases = require("./cases");
db.Contact =require("./contact");
db.Document = require("./document")(mongoose);
db.fees = require("./fees");
db.law = require("./law");
db.task = require("./task");
db.timeline = require("./timeline");
db.notification = require("./notifications");
db.messages = require("./messages");
db.service = require("./service");

db.ROLES =["user" , "Lawyer","Employee"] ;
module.exports = db;