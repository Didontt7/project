const jwt = require("jsonwebtoken");
const config = require("../config/auth");
const db = require("../models")
const User = db.User;
const Role = db.role;


verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
  
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    });
  };

  isLawyer = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      Role.find(
        {
          _id: { $in: user.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "Lawyer") {
              next();
              return;
            }
          }
  
          res.status(403).send({ message: "Require Lawyer Role!" });
          return;
        }
      );
    });
  };


  isEmploye = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      Role.find(
        {
          _id: { $in: user.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "Employe") {
              next();
              return;
            }
          }
  
          res.status(403).send({ message: "Require Employe Role!" });
          return;
        }
      );
    });
  };

  const authJwt = {
    verifyToken,
    isLawyer,
    isEmploye
  };

  
module.exports = authJwt;