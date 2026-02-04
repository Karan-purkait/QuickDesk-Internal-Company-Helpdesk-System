const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection
mongoose
  .connect(
    "mongodb+srv://karan:karan@cluster0.ij6h2vu.mongodb.net/helpdesk?retryWrites=true&w=majority"
  )
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Import Model
const Ticket = require("./models/Ticket");

// Routes
app.get("/", (req, res) => {
  res.send("QuickDesk Backend Running 🚀");
});

// Create Ticket
app.post("/tickets", async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Tickets
app.get("/tickets", async (req, res) => {
  const tickets = await Ticket.find().sort({ createdAt: -1 });
  res.json(tickets);
});

// Update Ticket Status
app.put("/tickets/:id", async (req, res) => {
  const ticket = await Ticket.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(ticket);
});

// Start Server
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
