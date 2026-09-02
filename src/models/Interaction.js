const mongoose = require("mongoose");

const interactionSchema = new mongoose.Schema(
  {
    plaque: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plaque",
      required: true,
    },

    type: {
      type: String,
      enum: ["NFC", "QR"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Interaction", interactionSchema);