const express = require("express");
const crypto = require("crypto");
const app = express();

app.use(express.json());

app.post("/generate-hash", (req, res) => {
  const secret = process.env.SECRET_KEY;
  const keys = Object.keys(req.body).sort();
  const data = keys.map(k => req.body[k]).join("|");
  // Utilisation de "base64" au lieu de "hex"
  const hash = crypto.createHmac("sha512", secret).update(data).digest("base64");

  res.json({ hash });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
