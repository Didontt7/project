exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.lawyerBoard = (req, res) => {
    res.status(200).send("Lawyer Content.");
  };
  
  exports.EmployeBoard = (req, res) => {
    res.status(200).send("Employee Content.");
  };