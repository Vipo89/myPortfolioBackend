const Interaction = require("../models/Interaction");
const Plaque = require("../models/Plaque");

const createInteraction = async (req, res) => {
  try {
    const { plaque, type } = req.body;

    const interaction = await Interaction.create({
      plaque,
      type,
    });

    res.status(201).json(interaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al registrar la interacción",
    });
  }
};

const getInteractions = async (req, res) => {
  try {
    const interactions = await Interaction.find().populate("plaque");

    res.status(200).json(interactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener las interacciones",
    });
  }
};

// Registrar interacción NFC y redirigir a Google
const nfcInteraction = async (req, res) => {
  try {
    const { plaqueId } = req.params;

    const plaque = await Plaque.findOne({ plaqueId }).populate("company");

    if (!plaque) {
      return res.status(404).json({
        message: "Tablilla no encontrada",
      });
    }

    await Interaction.create({
      plaque: plaque._id,
      type: "NFC",
    });

    res.redirect(plaque.company.googleReviewUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al procesar la interacción NFC",
    });
  }
};

// Registrar interacción QR y redirigir a Google
const qrInteraction = async (req, res) => {
  try {
    const { plaqueId } = req.params;

    const plaque = await Plaque.findOne({ plaqueId }).populate("company");

    if (!plaque) {
      return res.status(404).json({
        message: "Tablilla no encontrada",
      });
    }

    await Interaction.create({
      plaque: plaque._id,
      type: "QR",
    });

    res.redirect(plaque.company.googleReviewUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al procesar la interacción QR",
    });
  }
};

module.exports = {
  createInteraction,
  getInteractions,
  nfcInteraction,
  qrInteraction,
};