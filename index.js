require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./src/db/connectDb");

const companyRouter = require("./src/routers/companyRouter");
const plaqueRouter = require("./src/routers/plaqueRouter");
const interactionRouter = require("./src/routers/interactionRouter");
const authRouter = require("./src/routers/authRouter");

const {
  nfcInteraction,
  qrInteraction,
} = require("./src/controllers/interactionController");

const server = express();

server.use(express.json());

server.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://victorparras.com",
    ],
    methods: ["GET", "POST", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

server.use("/companies", companyRouter);
server.use("/plaques", plaqueRouter);
server.use("/interactions", interactionRouter); 
server.use("/auth", authRouter);

server.get("/nfc/:plaqueId", nfcInteraction);
server.get("/qr/:plaqueId", qrInteraction);
server.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

const PORT = process.env.PORT;

connectToDatabase();

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});