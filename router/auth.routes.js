const { verifySignUp } =require("../middlewares");
const authController =require("../controller/auth.controller");


module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.post(
      "/signup",
      [
        verifySignUp.checkDuplicateUsernameOrEmailOrPhone,
        verifySignUp.checkRolesExisted
      ],
      authController.signup
    );
  
    app.post("/login", authController.login);
  };