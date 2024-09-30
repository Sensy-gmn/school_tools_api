const Note = require("../models/note");

exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        res.json(note);
    } catch (err) {
        res.status(404).json({ message: "Note non trouvée" });
    }
};

exports.createNote = async (req, res) => {
    const note = new Note({
        title: req.body.title,
        content: req.body.content,
        userId: req.body.userId,
    });

    try {
        const newNote = await note.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: "Note non trouvée" });
        } else {
            note.title = req.body.title;
            note.content = req.body.content;
            note.userId = req.body.userId;
            const updatedNote = await note.save();
            res.json(updatedNote);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: "Note non trouvée" });
        }
        await note.deleteOne();
        res.json({ message: "Note supprimée" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
