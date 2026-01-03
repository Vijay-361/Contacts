const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Explicitly allow your frontend deployed URL
app.use(cors({
  origin: "https://your-frontend-vercel-link.vercel.app", // <-- replace with your Vercel URL
  methods: ["GET", "POST", "DELETE", "PUT"],
}));

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Use the API route
app.use("/api/contacts", require("./routes/contactRoutes"));

// Basic root route to test
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
