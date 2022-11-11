const mongoose= require('mongoose');
//const {body, checkSchema, validationResult} = require('express-validator');

const postSchema= mongoose.Schema({

    fullname:{
        type: String,
        maxLength: 100,
        minLength: 1,
        unique: true,
        required:true
    },
    email:{
        type: String,
        required: true
    
    },
    password:{
        
            type:String,
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            required: true,
        }
    
    });

module.exports= mongoose.model('Posts',postSchema);