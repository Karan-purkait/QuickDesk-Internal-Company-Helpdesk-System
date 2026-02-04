const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  department: {
    type: String,
    enum: ["IT", "HR", "Admin"],
    required: true
  },
  issue: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "Pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Ticket", ticketSchema);
