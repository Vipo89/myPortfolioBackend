const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    const URL_MONGO = process.env.URL_MONGO;

    await mongoose.connect(URL_MONGO);

    console.log("Conexión a la BBDD realizada con éxito");
  } catch (error) {
    console.log("Error al conectar a la BBDD de MongoDB", error);
  }
};

module.exports = connectToDatabase;