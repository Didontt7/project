
// Implement a route to send a message
app.post('/send', (req, res) => {
    const { idClient, idLawyer, content } = req.body;
  
    const newMessage = new Message({ idClient, idLawyer, content });
    newMessage.save()
      .then(() => {
        // Send a notification here
        res.send('Message sent!');
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
  