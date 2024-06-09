const router = require("express").Router();
const fs = require("fs");
const { readFromFile, readAndAppend } = require("../utils/util.js");

router.get("/notes", (req, res) => {
  readFromFile("./db/db.json").then((data) => {
    res.json(JSON.parse(data));
  });
});
router.post("/notes", (req, res) => {
  try {
    const newNote = {
      title: req.body.title,
      text: req.body.text,
    };
    console.log(newNote);
    readAndAppend(newNote, "./db/db.json");
    const response = {
      status: 200,
      message: "Note added",
    };
    res.json(response);
  } catch {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
});

router.delete("/notes/:id", (req, res) => {
  let db = JSON.parse(fs.readFileSync("db/db.json"));
  let deleteNotes = db.filter((item) => item.id !== req.params.id);
  fs.writeFileSync("db/db.json", JSON.stringify(deleteNotes));
  res.json(deleteNotes);
});

module.exports = router;
