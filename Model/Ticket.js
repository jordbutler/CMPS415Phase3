const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  ticketID: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
  },
  subject: {
    type: String,
  },
  description: {
    type: String,
  },
  priority: {
    type: String,
  },
  status: {
    type: String,
  },
  recipient: {
    type: String,
  },
  submitter: {
    type: String,
  },
  assignee_id: {
    type: String,
  },
  followers_id: {
    type: Array,
  },
  tags: {
    type: Array,
  },
});

module.exports = mongoose.model("Ticket", TicketSchema);
