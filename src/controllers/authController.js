const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { password } = req.body;

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({
      message: "Contraseña incorrecta",
    });
  }

  const token = jwt.sign(
    { role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.status(200).json({
    message: "Login correcto",
    token,
  });
};

module.exports = {
  login,
};