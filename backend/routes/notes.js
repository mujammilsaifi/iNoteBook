const express=require("express");
const router= express.Router();
const fetchuser = require("../middleware/fetchuser");  
const { body, validationResult } = require('express-validator');//npm i express-validator
const Notes=require('../models/Notes')


// ROUTER 1: Fetch all  the Notes using GET-http://localhost:5000/api/notes/fetchallnotes  | login required
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    try {
        const  notes= await Notes.find({user:req.user.id})
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error occured");
    }
   
});

// ROUTER 2: Add a new nots using POST-http://localhost:5000/api/notes/addnotes   | login required
router.post('/addnotes',[
    body('title','Enter a valid Title').isLength({ min: 5 }),
    body('description','Description must be 5 character').isLength({ min: 5 })
],fetchuser,async(req,res)=>{
    try {
        const {title,description,tag}=req.body;
        //if there are error return the bad request error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        const note=new Notes({
            title,description,tag,user:req.user.id
        })
        const savedNote=await note.save()
        res.json(savedNote)
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error occured");
    }
    
 });

 // ROUTER 3: Update an existing note using PUT-http://localhost:5000/api/notes/updatenote   | login required
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    const {title,description,tag}=req.body;
    try {
        
    const newNote={};
    if(title){newNote.title=title};
    if(description){newNote.description=description}
    if(tag){newNote.tag=tag}
    //find note to be updated and update it
    let note=await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")};
    if (note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed")
    }
    note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
    res.json(note);
    }catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error occured");
    }
});

// ROUTER 4: delete note an existing note using DELETE-http://localhost:5000/api/deletenote/updatenote   | login required
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
      try {
    //find note to be delete and delete it
    let note=await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")};

    //Allow user to be delete the own note
    if (note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed")
    }
    note=await Notes.findByIdAndDelete(req.params.id);
    res.json({"success":"Note has been deleted successfully"});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error occured");    
    } 
});
module.exports=router