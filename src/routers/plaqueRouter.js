const express = require("express");

const {
  createPlaque,
  getPlaques,
} = require("../controllers/plaqueController");

const router = express.Router();

router.post("/", createPlaque);
router.get("/", getPlaques);


module.exports = router;