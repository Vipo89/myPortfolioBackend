const express = require("express");

const {
  createInteraction,
  getInteractions,
  nfcInteraction,
  qrInteraction,
} = require("../controllers/interactionController");

const router = express.Router();

router.post("/", createInteraction);
router.get("/", getInteractions);


router.get("/nfc/:plaqueId", nfcInteraction);
router.get("/qr/:plaqueId", qrInteraction);

module.exports = router;