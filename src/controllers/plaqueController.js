const Plaque = require("../models/Plaque");

const createPlaque = async (req, res) => {
  try {
    const { plaqueId, company } = req.body;

    const plaque = await Plaque.create({
      plaqueId,
      company,
    });

    res.status(201).json(plaque);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al crear la tablilla",
    });
  }
};

const getPlaques = async (req, res) => {
  try {
    const plaques = await Plaque.find().populate("company");

    res.status(200).json(plaques);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener las tablillas",
    });
  }
};

module.exports = {
  createPlaque,
  getPlaques,
};