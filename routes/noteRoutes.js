const express = require("express");
const router = express.Router();
const noteController = require("../controller/noteController");

router.get("/notes", noteController.getNotes);
router.get("/notes/:id", noteController.getNoteById);

router.post("/notes", noteController.createNote);

router.put("/notes/:id", noteController.updateNote);

router.delete("/notes/:id", noteController.deleteNote);

module.exports = router;
