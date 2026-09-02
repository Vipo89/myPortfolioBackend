const Company = require("../models/Company");

const createCompany = async (req, res) => {
  try {
    const { name, googleReviewUrl } = req.body;

    const company = await Company.create({
      name,
      googleReviewUrl,
    });

    res.status(201).json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al crear la empresa",
    });
  }
};

const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();

    res.status(200).json(companies);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener las empresas",
    });
  }
};

module.exports = {
  createCompany,
  getCompanies,
};