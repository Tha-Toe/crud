const express = require("express");
const router = require("./routes/routes");
const connectDB = require("./db/connect");
const { connect } = require("http2");
require('dotenv').config();
const app = express();
//app.use(express.json());
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(router);
const cors = require("cors");
app.use(cors);

app.set("view engine","ejs");
app.set("views","views");

const start = async() => {
    try{
        await connectDB(process.env.MONGO_URI);
        console.log("success connectd to database")
        app.listen(process.env.PORT || 3000)
    }catch (err) {
        if(err) throw err
    }
}
start();



