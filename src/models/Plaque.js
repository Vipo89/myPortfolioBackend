const mongoose = require("mongoose");

const plaqueSchema = new mongoose.Schema(
  {
    plaqueId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Plaque", plaqueSchema);