const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({ app: "test" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);