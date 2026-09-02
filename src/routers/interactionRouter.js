const express = require("express");
const authMiddleware = require("../middleware/authmiddleware");

const {
  createInteraction,
  getInteractions,
  nfcInteraction,
  qrInteraction,
  getPlaqueStats,
  getCompanyStats,
} = require("../controllers/interactionController");

const router = express.Router();

router.post("/", createInteraction);

router.get("/", getInteractions);

router.get("/nfc/:plaqueId", nfcInteraction);

router.get("/qr/:plaqueId", qrInteraction);

router.get("/stats/:plaqueId", authMiddleware, getPlaqueStats);

router.get(
  "/company/:companyId/stats",
  authMiddleware,
  getCompanyStats
);

module.exports = router;