const express = require("express");
const path = require("path");
const PORT = 3001;
const app = express();
const routes = require("./routes/index.js");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
