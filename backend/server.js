const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import Model
const Ticket = require("./models/Ticket");

// MongoDB Atlas Connection
const MONGO_URI =
  "mongodb+srv://karan:karan@cluster0.ij6h2vu.mongodb.net/helpdesk?retryWrites=true&w=majority&appName=Cluster0";

mongoose.set("strictQuery", true);

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("✅ MongoDB Atlas Connected");

    // Routes
    app.get("/", (req, res) => {
      res.send("QuickDesk Backend Running 🚀");
    });

    app.post("/tickets", async (req, res) => {
      try {
        const ticket = new Ticket(req.body);
        await ticket.save();
        res.status(201).json(ticket);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    });

    app.get("/tickets", async (req, res) => {
      const tickets = await Ticket.find().sort({ createdAt: -1 });
      res.json(tickets);
    });

    app.put("/tickets/:id", async (req, res) => {
      const ticket = await Ticket.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
      );
      res.json(ticket);
    });

    const PORT = 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1);
  }
}

startServer();
