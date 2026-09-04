const express = require("express");

const {
  createCompany,
  getCompanies,
  updateCompany,
} = require("../controllers/companyController");

const router = express.Router();

router.post("/", createCompany);
router.get("/", getCompanies);
router.put("/:companyId", updateCompany);

module.exports = router;