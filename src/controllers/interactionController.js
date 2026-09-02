const Interaction = require("../models/Interaction");
const Plaque = require("../models/Plaque");
const Company = require("../models/Company");

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

const getPlaqueStats = async (req, res) => {
  try {
    const { plaqueId } = req.params;

    const plaque = await Plaque.findOne({ plaqueId }).populate("company");

    if (!plaque) {
      return res.status(404).json({
        message: "Tablilla no encontrada",
      });
    }

    const interactions = await Interaction.find({
      plaque: plaque._id,
    })
      .sort({ createdAt: -1 })
      .select("type createdAt");

    const nfcCount = interactions.filter(
      (interaction) => interaction.type === "NFC"
    ).length;

    const qrCount = interactions.filter(
      (interaction) => interaction.type === "QR"
    ).length;

    res.status(200).json({
      plaqueId: plaque.plaqueId,
      company: plaque.company.name,
      nfc: nfcCount,
      qr: qrCount,
      total: interactions.length,
      interactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener las estadísticas",
    });
  }
};

const getCompanyStats = async (req, res) => {
  try {
    const { companyId } = req.params;

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Empresa no encontrada",
      });
    }

    const plaques = await Plaque.find({
      company: companyId,
    });

    const plaqueStats = await Promise.all(
      plaques.map(async (plaque) => {
        const interactions = await Interaction.find({
          plaque: plaque._id,
        })
          .sort({ createdAt: -1 })
          .select("type createdAt");

        const nfc = interactions.filter(
          (interaction) => interaction.type === "NFC"
        ).length;

        const qr = interactions.filter(
          (interaction) => interaction.type === "QR"
        ).length;

        return {
          plaqueId: plaque.plaqueId,
          nfc,
          qr,
          total: interactions.length,
          interactions,
        };
      })
    );

    const nfc = plaqueStats.reduce(
      (total, plaque) => total + plaque.nfc,
      0
    );

    const qr = plaqueStats.reduce(
      (total, plaque) => total + plaque.qr,
      0
    );

    res.status(200).json({
      company: company.name,
      nfc,
      qr,
      total: nfc + qr,
      plaques: plaqueStats,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al obtener las estadísticas de la empresa",
    });
  }
};
module.exports = {
  createInteraction,
  getInteractions,
  nfcInteraction,
  qrInteraction,
  getPlaqueStats,
  getCompanyStats,
};