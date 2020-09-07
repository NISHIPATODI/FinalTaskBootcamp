require('dotenv').config();
const express = require ('express');
const app= express();

//var fileupload = require('express-fileupload');
//app.use(fileupload());

//const multer = require('multer');
//const upload= multer({des:'/uploads/'})
const userRouter = require("./api/users/users.router")


global.__basedir = __dirname;

var path = require('path');

app.use(express.json());
app.use("/api/user", userRouter);

app.listen(process.env.APP_PORT,()=>{
    console.log("server is runing ON PORT",process.env.APP_PORT);
})