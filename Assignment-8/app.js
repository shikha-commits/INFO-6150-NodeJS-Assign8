const express= require('express');
const app=express();
const MongoClient = require('mongodb').MongoClient;
const mongoose= require('mongoose');
const bodyParser = require("body-parser")
const postRouter= require('./routes/route');
const expressValidator = require('express-validator');

require('dotenv/config');

mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser:true},
    ()=> console.log('connected to DBI')
);
   
// validation
app.use(expressValidator());
//import router

app.use(bodyParser.json()); 
app.use('/user/getAll',postRouter);
app.use('/user/create',postRouter);
app.use('/user/edit',postRouter);
app.use('/user/delete',postRouter);

app.listen(3000);


