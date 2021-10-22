const { Router } = require("express")
const express = require("express")
const { body, validationResult } = require('express-validator');
const router = express.Router()
const fetchuser = require("../middleware/fetchuser");
const Note = require('../models/Note');
//ROUTE 1: Get all the notes: GET "/api/notes/fetchallnotes" . login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured");
    }
})

//ROUTE 2: Add a new notes using: POST "/api/notes/addnote" . login required
router.post("/addnote", fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 character').isLength({ min: 5 }),
], async (req, res) => {
    try {

        const { title, description, tag } = req.body;

        //if there are error return bad request and error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save()

        res.json(saveNote)
        // console.log(user)

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured");
    }
})

//ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote" . login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //create new note object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //find the note to be updated to update it
        let note = await Note.findById(req.params.id);  // this id is "/updatenote/:id" and 
        // console.log("find the note ",note)
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured");
    }
})
//ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote" . login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
   
    try {
        //find the note to be delete to delete it
        let note = await Note.findById(req.params.id);  // this id is "/updatenote/:id" and 
        if (!note) { return res.status(404).send("Not Found") }

        //allow deletion only if user own this note
        if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted successfully", note: note })
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured");
    }
})
module.exports = router