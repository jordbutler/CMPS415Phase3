const Ticket = require("../Model/Ticket");

const getTicket = (req, res) => {
    res.send("I am the get tickets route");
  };

  const createTicket = (req, res) => {
    res.send("I am the create tickets route");
    const ticket = new Ticket({
      ticketID: req.body.ticketID,
      created_at: Date.now,
      updated_at: Date.now,
      type: req.body.type,
      subject: req.body.subject,
      description: req.body.description,
      priority: req.body.priority,
      status: req.body.status,
      recipient: req.body.recipient,
      submitter: req.body.submitter,
      assignee_id: req.body.assignee_id,
      followers_id: req.body.followers_id,
      tags: req.body.tags
    });
  
    ticket.save((err, ticket) => {
      if (err) {
        res.send(err);
      }
      res.json(ticket);
    });
  };
  
  
  module.exports = {
    getTicket,
    createTicket,
  };
  