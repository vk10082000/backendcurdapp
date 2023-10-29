const mongoose = require("mongoose");

const notesSchema = mongoose.Schema({
    title: String,
    body:String,
    date:String,
    userID : String
},{
    versionKey:false,
});

const NotesModel =mongoose.model("notes",notesSchema);

module.exports = {NotesModel};