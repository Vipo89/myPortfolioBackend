const Plaque = require("../models/Plaque");

const createPlaque = async (req, res) => {
  try {
    const { company } = req.body;

    const lastPlaque = await Plaque.findOne().sort({ plaqueId: -1 });

    let newPlaqueId = "001";

    if (lastPlaque) {
      const lastId = parseInt(lastPlaque.plaqueId);
      newPlaqueId = String(lastId + 1).padStart(3, "0");
    }

    const plaque = await Plaque.create({
      plaqueId: newPlaqueId,
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