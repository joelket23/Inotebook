const mongoose = require('mongoose');

const NotesSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
        unique : true
    },
    tag:{
        type: String,
        default: "General"
    }
  });

module.exports = mongoose.model('notes', NotesSchema );

