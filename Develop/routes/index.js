const express = require("express");
const { readAndAppend, readFromFile, writeToFile } = require("../utils/util");
app = express();

app.get("/notes", (req, res) => {
  readFromFile("./db/notes.json").then((data) => {
    res.json(JSON.parse(data));
  });
});

app.post("/notes", (req, res) => {
  const { title, text } = req.body;
  const newNote = {
    title,
    text,
  };
  readAndAppend(newNote, "./db/db.json");

  const response = {
    status: "successful",
    body: newNote,
  };
  res.json(response);
});
module.exports = app;
