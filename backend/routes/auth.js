const express=require("express");
const User=require('../models/User')
const router= express.Router();
const { body, validationResult } = require('express-validator');//npm i express-validator
const bcrypt = require('bcryptjs'); //npm i bcryptjs
const jwt = require('jsonwebtoken'); //npm i jsonwebtoken
const fetchuser = require("../middleware/fetchuser");  //middleware to varify user
const JWT_SECRET="mujammil&khan"


//ROUTER:1 post-localhost:5000/api/auth/createuser
router.post('/createuser', [
    body('name','Enter your Name').isLength({ min: 3 }),
    body('email','Enter a valid Email').isEmail(),
    body('password').isLength({ min: 5 })
],async (req,res)=>{
    let success=false;
    //if there are error return the bad request error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{
        //check weather the request user already exists
    let user=await User.findOne({email:req.body.email});
    if (user){
        return res.status(400).json({success:false,error:"Sorry! your Email is already exists"})
    }
    //create a new user
    const password=req.body.password;
    const salt =await bcrypt.genSaltSync(10);
    secPass=await bcrypt.hash(password,salt)
    user =await User.create({
        name: req.body.name,
        password: secPass,
        email:req.body.email
      })
    //   .then(user => res.json(user)).catch(err=>{console.log(err)
    //    res.json({error:"Enter a unique value for Email",message:err.message})});
    //    const user=req.body
    //    user.save()


    const data={
        user:{
            id:user.id
        }
    }
    const authToken=jwt.sign(data,JWT_SECRET);
    res.json({success:true,authToken:authToken}); // return key to client

    }catch(error){ //if any error Occur
        console.error(error.message);
        res.status(500).send("Some error occured");

    }
})

//ROUTER:2 post-localhost:5000/api/auth/login  |for user login
router.post('/login', [
    body('email','Enter a valid Email').isEmail(),
    body('password','Password can not be blank').exists()
],async (req,res)=>{
    let success=true
    //if there are error return the bad request error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body;
    try{
        let user=await User.findOne({email});
        if(!user){
            return res.status(500).send({error:'Please try to correct email to login'})
        }
        const passwordcompare=await bcrypt.compare(password,user.password);
        if(!passwordcompare){
            return res.status(500).send({success:false, error:'Please try to correct email to login'})
        }
        const data={
            user:{
                id:user.id
            }
        }
        const authToken=jwt.sign(data,JWT_SECRET);
        res.json({ success:true, authToken:authToken});
    }catch(error){ //if any error Occur
        console.error(error.message);
        res.status(500).send("internal server error occured");

    }
});
 
//ROUTER:3 post-localhost:5000/api/auth/getuser   | login required
router.post('/getuser',fetchuser,async (req,res)=>{
    try {
        const userId=req.user.id;
        const user=await User.findById(userId).select("-password");
        res.send(user)   ;     
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error occured");
    }
});
module.exports=router;