const {Router}= require("express");
const jwt = require("jsonwebtoken");
const { NotesModel } = require("../model/notes.model");



const notesRouter = Router();

notesRouter.get("/",async (req,res)=>{
    
    try {
        const decoded = req.payload;
        const userID = decoded.userid;
        const notes = await NotesModel.find({userID})
       res.status(200).json({ notes })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

notesRouter.post("/create",async (req,res)=>{
    const {title,body} = req.body;
    const payload = {title,body};
    payload.date =new Date();
    
    try {
        const decoded = req.payload;
        const userid = decoded.userid;
        payload.userID= userid;
        const notes = new NotesModel(payload);
        await notes.save();
       res.status(200).json({ msg:"note was added",note:notes })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

notesRouter.patch("/update/:notesID",async (req,res)=>{
    const {notesID}= req.params;
    try {
        const decoded = req.payload;
        const userID = decoded.userid;
        const updatednote = await NotesModel.findOneAndUpdate({userID,_id:notesID},req.body);
        if(updatednote){
            res.status(200).json({ msg:"note was updated",updatednote})
        }else{

            res.status(200).json({ msg: "your not authorised" })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

notesRouter.delete("/delete/:notesId",async (req,res)=>{
    const { notesId } = req.params;
    try {
        const decoded = req.payload;
        const userID = decoded.userid;
        const deletedednote = await NotesModel.findOneAndDelete({userID,_id:notesId});
        if(deletedednote){
            res.status(200).json({ msg:"note was deleted",deletedednote})
        }else{
            res.status(200).json({ msg: "your not authorised" })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})



module.exports = {notesRouter};