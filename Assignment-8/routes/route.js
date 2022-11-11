const express= require('express');
const router= express.Router();
const User= require('../models/User');
const bodyParser= require('body-parser');
var jsonParser = bodyParser.json();
const { register,update } = require("./auth")

//get users

router.get('/',async(req,res)=>{
   try{
     const users= await User.find();
     res.json(users);
   }
   catch(err)
   {
       res.json(err);
   }
})

//Create the users

router.route("/").post(register);


//Update a user

router.route("/:fullname").put(update);


//Delete a user
router.delete('/:email/',async(req,res)=>{
   const removedPost= await User.deleteOne({email:req.params.email});
   res.json(removedPost);
})

module.exports= router;