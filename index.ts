import express from "express";
import cors from "cors";
import morgan from "morgan";
import { createServer } from "http";

// Create Express application and HTTP server
const app = express();
const server = createServer(app);

// Use CORS and logging middleware
app.use(cors());
app.use(morgan(":method :url :status"));

// Use JSON middleware
app.use(express.json());

// Start server
const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Listening on http://localhost:8080`);
});
