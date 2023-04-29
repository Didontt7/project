const db = require("../models");
const TimeLine = db.timeline;

exports.create = async (req, res) => {
  try {
    const timeline = new Timeline(req.body);
    await timeline.save();

    const today = new Date();
    const eventsToday = await Timeline.find({ date: { $eq: today } });

    if (eventsToday.length > 0) {
      console.log('You have event today!');
      // send notification code here
    }

    res.status(201).send({ timeline });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.search = async (req, res) => {
  try {
    const query = req.query.q; // Get search query from request
    const results = await TimeLine.find({ $text: { $search: query } });
    res.send(results);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.FindALL = (req, res) => {

  TimeLine.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving TimeLine."
      });
    });
  
};


exports.FindOne = (req, res) => {
  TimeLine.findById(req.params.id)
  .then(Case => res.json(Case))
  .catch(err => res.status(400).json('Error: ' + err));

  
};


exports.DeletOne = (req, res) => {

  TimeLine.findByIdAndDelete(req.params.id)
  .then(() => res.json('TimeLine deleted.'))
  .catch(err => res.status(400).json('Error: ' + err));
  
};




exports.DeletALL = (req, res) => {
  TimeLine.deleteMany({})
  .then(data => {
   res.send({
     message: `${data.deletedCount} TimeLine were deleted successfully!`
   });
   })
 .catch(err => {
   res.status(500).send({
     message:
       err.message || "Some error occurred while removing all TimeLine."
   });
   });

 };

/*
 exports.Update = (req, res) => {
  TimeLine.findById(req.params.id)

  .then(data => {

      
    TimeLine.title= req.body.title;
    TimeLine.time=req.body.time;
    TimeLine.Description= req.body.Description;
    TimeLine.idcase= req.body.idcase;
      data.save()
      .then(() => res.json('TimeLine updated!'))
      .catch(err => res.status(400).json('Error: ' + err));
  })

  .catch(err => res.status(400).json('Error: ' + err));
  };

*/
  exports.Update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    TimeLine.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update TimeLine with id=${id}. Maybe TimeLine was not found!`
          });
        } else res.send({ message: "TimeLine was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating TimeLine with id=" + id
        });
      });
  };
