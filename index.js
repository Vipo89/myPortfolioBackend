require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./src/db/connectDb");

const companyRouter = require("./src/routers/companyRouter");
const plaqueRouter = require("./src/routers/plaqueRouter");
const interactionRouter = require("./src/routers/interactionRouter");

const server = express();

server.use(express.json());

server.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

server.use("/companies", companyRouter);
server.use("/plaques", plaqueRouter);
server.use("/interactions", interactionRouter);

const PORT = process.env.PORT;

connectToDatabase();

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});