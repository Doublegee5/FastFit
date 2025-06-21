import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRoutes from "./routes/ai.js";

dotenv.config(); // Load .env variables at startup

console.log("OPENAI_API_KEY loaded:", !!process.env.OPENAI_API_KEY); // Debug: should print true if key is loaded

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mount AI routes under /api/ai
app.use("/api/ai", aiRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("FastFit AI Backend is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
