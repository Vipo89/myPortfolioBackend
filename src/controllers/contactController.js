const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendContact = async (req, res) => {

  const { name, email, reason, message } = req.body;

  if (!name || !email || !reason || !message) {

    return res.status(400).json({

      message: "Todos los campos son obligatorios",

    });

  }

  const emailMessage =
    "Nombre: " + name + "\n" +
    "Email: " + email + "\n" +
    "Motivo: " + reason + "\n\n" +
    "Mensaje:\n" +
    message;

  try {

    const response = await resend.emails.send({

      from: "Portfolio <contact@victorparras.com>",

      to: "vipoo.info@gmail.com",

      replyTo: email,

      subject: "Nuevo contacto: " + reason,

      text: emailMessage,

    });

    res.status(200).json({

      message: "Mensaje enviado correctamente",

      response,

    });

  } catch (error) {

    console.log("Error al enviar el email:", error);

    res.status(500).json({

      message: "Error al enviar el mensaje",

    });

  }

};

module.exports = {

  sendContact,

};