const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Route 1: get all the notes using: GET "api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 2: add a new notes using: POST "api/notes/addnote". Login required.
router.post(
  "/addnote",
  fetchuser,
  [
    // body("title", "Enter a valid title").isLength({ min: 3 }),
    // body("description", "Description must be atleast 5 characters").isLength({
    //   min: 5,
    // }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, tag } = req.body;
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
// Route 3: update a existing note using: PUT "api/notes/updatenote". Login required.
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    // create a new note object.
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    // find the note to be updated and updated it.
    let note = await Notes.findById(req.params.id);
    if (!note) return res.status(404).send("Not Found");

    // if the note is belong to the user then update it.
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 4: update a existing note using: DELETE "api/notes/deletenote". Login required.
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // find the note to be delete and delete it.
    let note = await Notes.findById(req.params.id);
    if (!note) return res.status(404).send("Not Found");

    // if the note is belong to the user then delete it.
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route to update note background color
router.put("/updatebg/:id", fetchuser, async (req, res) => {
  const { bg_color } = req.body;

  try {
    // Find the note to be updated and check ownership
    let note = await Notes.findById(req.params.id);
    if (!note) return res.status(404).send("Note not found");

    // Check if the note belongs to the authenticated user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not authorized to update this note");
    }

    // Update the note's background color
    note.bg_color = bg_color; // Assuming 'bg_color' is the field to update
    await note.save();

    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});



module.exports = router;
