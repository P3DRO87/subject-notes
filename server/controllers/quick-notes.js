const { response } = require("express");
const QuickNote = require("../models/QuickNote");

const getNotes = async (req, res = response) => {
   const DEFAULT_NOTES_LIMIT = 10;

   const { limit = DEFAULT_NOTES_LIMIT, offset = 0 } = req.query;

   try {
      const quickNotes = await QuickNote.find({ user: req._id })
         .skip(+offset)
         .limit(+limit);

      res.json({ quickNotes });
   } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
   }
};

const getNote = async (req, res = response) => {
   const { id } = req.params;

   try {
      const note = await QuickNote.findById(id);

      res.json({ note });
   } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
   }
};

const addNewNote = async (req, res = response) => {
   const { title = "", description = "", content = "" } = req.body;

   try {
      const newNote = new QuickNote({ title, description, content, user: req._id });

      await newNote.save();

      res.status(201).json({ newNote });
   } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
   }
};

const updateNote = async (req, res = response) => {
   const { id } = req.params;

   try {
      const noteDB = await QuickNote.findById(id);

      if (!noteDB) return res.status(400).json({ msg: "Invalid note" });

      const updatedNote = await QuickNote.findByIdAndUpdate(id, req.body, {
         new: true,
      });

      res.json({ updatedNote });
   } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Internal server error" });
   }
};

const deleteNote = async (req, res = response) => {
   const { id } = req.params;

   try {
      const noteDB = await QuickNote.findById(id);

      if (!noteDB) return res.status(400).json({ msg: "Invalid note" });

      const deletedNote = await QuickNote.findByIdAndDelete(id);

      res.json({ deletedNote });
   } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
   }
};

module.exports = {
   getNotes,
   getNote,
   addNewNote,
   updateNote,
   deleteNote,
};
